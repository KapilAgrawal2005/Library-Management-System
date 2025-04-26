import React from "react";
import { useDispatch } from "react-redux";
import { returnBook } from "../store/slices/borrowSlice";
import { toggleReturnBookPopup } from "../store/slices/popupSlice";

const ReturnBookPopup = ({ bookId, email }) => {
  const dispatch = useDispatch();

  const handleReturnBook = (e) => {
    e.preventDefault();
    dispatch(returnBook(email, bookId));
    console.log(email);
    dispatch(toggleReturnBookPopup());
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg md:w-1/3">
        <div className="p-6">
          <h3 className="texl-xl font-bold mb-4">Return Book</h3>
          <form onSubmit={handleReturnBook}>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium">
                User Email
              </label>
              <input
                required
                type="email"
                defaultValue={email}
                disabled
                placeholder="Borrower's Email"
                className="w-full px-4 py-2 border-2 border-black rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer font-bold"
                onClick={() => dispatch(toggleReturnBookPopup())}
              >
                Close
              </button>
              <button
                type="submit"
                className="hover:cursor-pointer px-4 py-3 border-2 border-black bg-black text-white rounded-md font-bold hover:bg-white hover:text-black"
              >
                Return
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReturnBookPopup;
