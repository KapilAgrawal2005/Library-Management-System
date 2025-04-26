const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const Borrow = require("../models/borrowModel");
const {ErrorHandler} = require("../middleware/errorMiddlewares");
const Book = require("../models/bookModel");
const User = require("../models/userModel");
const { fineCalculater } = require("../utils/fineCalculater");

const borrowedBooks = catchAsyncErrors(async(req,res,next)=>{
    try{
        const {borrowedBooks} = req.user;
        res.status(200).json({
            success:true,
            borrowedBooks,
        });
    }
    catch(error){
        return next(new ErrorHandler(error.message,500));
    }
});

const recordBorrowedBooks = catchAsyncErrors(async(req,res,next) => {
    const {id} = req.params;
    const {email} = req.body;
    const book = await Book.findById(id);
    try{
        if(!book){
            return next(new ErrorHandler("Book not found.",404));
        }
        const user = await User.findOne({email, accountVerified: true});
        if(!user){
            return next(new ErrorHandler("User not found.",404));
        }
        if(book.quantity === 0){
            return next(new ErrorHandler("Book not available.",400));
        }

        const isAlreadyBorrowed = user.borrowedBooks.find((b) => b.bookId.toString() === id && b.returned === false);
        if(isAlreadyBorrowed){
            return next(new ErrorHandler("Book already borrowed.",400));
        }
        book.quantity-=1;
        book.availability = book.quantity > 0;

        await book.save();

        user.borrowedBooks.push({
            bookId: book._id,
            bookTitle: book.title,
            borrowedDate: new Date(),
            dueDate: new Date(Date.now() + 7*24*60*60*1000),
            returned: false,
        });

        await user.save();
        
        await Borrow.create({
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            },
            price: book.price,
            book: {
                id: book.id,
            },
            dueDate: new Date(Date.now() + 7*24*60*60*1000),
        });
        res.status(200).json({
            success: true,
            message: "Borrowed book recorded successfully.",
        });
    }
    catch(error){
        return next(new ErrorHandler(error.message,500));
    }
});

const getBorrowedBooksForAdmin = catchAsyncErrors(async(req,res,next)=>{
    try{
        const borrowedBooks = await Borrow.find();
        res.status(200).json({
            success:true,
            borrowedBooks,
        });
    }
    catch(error){
        return next(new ErrorHandler(error.message,500));
    }
});

const returnBorrowBook = catchAsyncErrors(async(req,res,next)=>{
    const {bookId} = req.params;
    const {email} = req.body;
    const book = await Book.findById(bookId);   
    const user = await User.findOne({email, accountVerified: true});
    try{
        if(!book){
            return next(new ErrorHandler("Book not found.",404));
        }
        if(!user){
            return next(new ErrorHandler("User not found.",404));
        }
        const borrowedBook = user.borrowedBooks.find((b)=> b.bookId.toString() === bookId && b.returned === false);
        if(!borrowedBook){
            return next(new ErrorHandler("You have not borrowed this Book.",400));
        }

        borrowedBook.returned = true;
        await user.save();

        book.quantity +=1;
        book.availability = book.quantity > 0;
        await book.save();

        const borrow = await Borrow.findOne({
            "book.id": bookId,
            "user.email" : email,
            returnDate: null,
        });      


        if(!borrow){
            return next(new ErrorHandler("You have not Borrowed this book.",400));
        }  

        borrow.returnDate = new Date();

        const calculatedFine = fineCalculater(borrow.dueDate);
        borrow.fine = calculatedFine;

        await borrow.save();

        res.status(200).json({
            success: true,
            message: calculatedFine !== 0 || calculatedFine !== undefined ? `The Book has been returned successfuly. The total charges including fine are ₹ ${book.price + calculatedFine}` : `The Book has been returned successfuly. The total charges are ₹ ${book.price}`,
        })
    }
    catch(error){
        return next(new ErrorHandler(error.message,500));
    }
});


module.exports = {borrowedBooks, recordBorrowedBooks, getBorrowedBooksForAdmin, returnBorrowBook};