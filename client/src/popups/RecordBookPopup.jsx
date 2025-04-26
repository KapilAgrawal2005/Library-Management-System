import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { recordBorrowBook } from "../store/slices/borrowSlice";
import { toggleRecoredBookPopup } from "../store/slices/popupSlice";
const RecordBookPopup = ({ bookId }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleRecordBook = (e) => {
    e.preventDefault();
    dispatch(recordBorrowBook(email, bookId));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg md:w-1/3">
        <div className="p-6">
          <h3 className="texl-xl font-bold mb-4">Record Book</h3>
          <form onSubmit={handleRecordBook}>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium">
                User Email
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Borrower's Email"
                className="w-full px-4 py-2 border-2 border-black rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer font-bold"
                onClick={() => dispatch(toggleRecoredBookPopup())}
              >
                Close
              </button>
              <button
                type="submit"
                className="hover:cursor-pointer px-4 py-3 border-2 border-black bg-black text-white rounded-md font-bold hover:bg-white hover:text-black"
              >
                Record
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecordBookPopup;
