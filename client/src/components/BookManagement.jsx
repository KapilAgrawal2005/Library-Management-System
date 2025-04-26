import React, { useEffect, useState } from "react";
import { BookA, NotebookPen } from "lucide-react";
import trachIcon from "../assets/trash.png";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAddBookPopup,
  toggleReadBookPopup,
  toggleRecoredBookPopup,
} from "../store/slices/popupSlice";
import { toast } from "react-toastify";
import {
  fetchAllBooks,
  deleteBook,
  resetBookSlice,
} from "../store/slices/bookSlice";
import {
  fetchAllBorrowedBooks,
  resetBorrowSlice,
} from "../store/slices/borrowSlice";
import Header from "..//layout/Header";
import AddBookPopup from "../popups/AddBookPopup";
import RecordBookPopup from "../popups/RecordBookPopup";
import ReadBookPopup from "../popups/ReadBookPopup";

const BookManagement = () => {
  const dispatch = useDispatch();
  const { loading, error, message, books } = useSelector((state) => state.book);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { addBookPopup, readBookPopup, recordBookPopup } = useSelector(
    (state) => state.popup
  );
  const {
    loading: borrowSliceLoading,
    error: borrowSliceError,
    message: borrowSliceMessage,
  } = useSelector((state) => state.borrow);

  const [readBook, setReadBook] = useState({});

  const openReadPopup = (id) => {
    const book = books.find((book) => book._id === id);
    setReadBook(book);
    dispatch(toggleReadBookPopup());
  };

  const [borrowBookId, setBorrowBookId] = useState("");
  const openRecordBookPopup = (bookId) => {
    setBorrowBookId(bookId);
    dispatch(toggleRecoredBookPopup());
  };

  useEffect(() => {
    if (message || borrowSliceMessage) {
      toast.success(message || borrowSliceMessage);
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBooks());
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
    if (error || borrowSliceError) {
      toast.error(error || borrowSliceError);
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
  }, [
    dispatch,
    message,
    error,
    loading,
    borrowSliceError,
    borrowSliceLoading,
    borrowSliceMessage,
  ]);

  const [searchKeyWord, setSearchKeyWord] = useState("");
  const handleSearch = (e) => {
    setSearchKeyWord(e.target.value.toLowerCase());
  };

  const searchedBook = books?.filter((book) =>
    book.title.toLowerCase().includes(searchKeyWord)
  );

  return (
    <>
      <main className="relative flex-1 p-6 pt-28">
        <Header />
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
            {user && user.role === "Admin" ? "Book Management" : "Books"}
          </h2>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            {isAuthenticated && user?.role === "Admin" && (
              <button
                className="relative pl-14 w-full sm:w-52 flex gap-4 justify-center items-center bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 hover:cursor-pointer"
                onClick={() => dispatch(toggleAddBookPopup())}
              >
                <span className="bg-white flex justify-center items-center overflow-hidden rounded-full text-black w-[25px] h-[25px] text-[27px] absolute left-5">
                  +
                </span>
                ADD BOOK
              </button>
            )}
            <input
              type="text"
              placeholder="Search Books..."
              className="w-full sm:w-52 border p-2 border-gray-300 rounded-md"
              value={searchKeyWord}
              onChange={handleSearch}
            />
          </div>
        </header>

        {books && books.length > 0 ? (
          <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="text-center px-4 py-2">ID</th>
                  <th className="text-center px-4 py-2">Name</th>
                  <th className="text-center px-4 py-2">Author</th>
                  {isAuthenticated && user?.role === "Admin" && (
                    <th className="text-center px-4 py-2">Quantity</th>
                  )}
                  <th className="text-center px-4 py-2">Price</th>
                  <th className="text-center px-4 py-2">Availability</th>
                  {isAuthenticated && user?.role === "Admin" && (
                    <th className="text-center px-4 py-2">Record Book</th>
                  )}
                  {isAuthenticated && user?.role === "Admin" && (
                    <th className="text-center px-4 py-2">Delete Book</th>
                  )}
                </tr>
              </thead>
              <tbody className="">
                {searchedBook.map((book, index) => (
                  <tr
                    className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}
                    key={book._id}
                  >
                    <td className="px-4 py-2 text-center">{index + 1}</td>
                    <td className="px-4 py-2 text-center">{book.title}</td>
                    <td className="px-4 py-2 text-center">{book.author}</td>
                    {isAuthenticated && user?.role === "Admin" && (
                      <td className="px-4 py-2 text-center">{book.quantity}</td>
                    )}
                    <td className="px-4 py-2 text-center">{book.price}</td>
                    <td className="px-4 py-2 text-center">
                      {book.availability ? "Available" : "Unavailable"}
                    </td>
                    {isAuthenticated && user?.role === "Admin" && (
                      <td className="px-4 py-2 flex space-x-6 my-3 justify-center">
                        <BookA
                          onClick={() => openReadPopup(book._id)}
                          className="hover:cursor-pointer"
                        />
                        <NotebookPen
                          onClick={() => openRecordBookPopup(book._id)}
                          className="hover:cursor-pointer"
                        />
                      </td>
                    )}
                    {isAuthenticated && user?.role === "Admin" && (
                      <td className="text-center px-4 py-2">
                        <div className="flex justify-center items-center">
                          <img
                            src={trachIcon}
                            alt="trachIcon"
                            className="hover:cursor-pointer"
                            onClick={() => dispatch(deleteBook(book._id))}
                          />
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="text-3xl mt-5 font-medium">
            No Book Found in Library.
          </h3>
        )}
      </main>
      {addBookPopup && <AddBookPopup />}
      {readBookPopup && <ReadBookPopup book={readBook} />}
      {recordBookPopup && <RecordBookPopup bookId={borrowBookId} />}
    </>
  );
};

export default BookManagement;
