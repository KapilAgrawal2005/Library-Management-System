const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const Book = require("../models/bookModel");
const User = require("../models/userModel");
const {ErrorHandler} = require("../middleware/errorMiddlewares");

const addBook = catchAsyncErrors(async(req,res,next)=>{
    const {title, author, description, price, quantity} = req.body;
    try{
        if(!title || !author || !description || !price || !quantity){
            return next(new ErrorHandler("All fields are required",400));
        }

        const book = await Book.create({title, author, description, price, quantity});
        res.status(200).json({
            success: true,
            book,
            message:"Book created successfully.",
        });

    }catch(error){
        return next(new ErrorHandler("Error while createing the book.",500));
    }
    
});


const deleteBook = catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    const book = await Book.findById(id);

    try{
        if(!book){
            return next(new ErrorHandler("Book not found.",400));
        }

        await book.deleteOne();
        res.status(200).json({
            success: true,
            message: "Book deleted successfully.",
        });
    }catch(error){

    }
});


const getAllBooks = catchAsyncErrors(async(req,res,next)=>{
    try{
        const books = await Book.find();
    res.status(200).json({
        success:true,
        books,
        message:"All books are fetched.",
    });
    }catch(error){
        return next(new ErrorHandler("Error while fetching all the books.",500));
    }
});


module.exports = {addBook, deleteBook, getAllBooks};