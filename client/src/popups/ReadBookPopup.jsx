import React from "react";
import { useDispatch } from "react-redux";
import { toggleReadBookPopup } from "../store/slices/popupSlice";

const ReadBookPopup = ({ book }) => {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-11/12 max-w-2xl mx-4 bg-white rounded-lg shadow-lg sm:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-center text-white bg-black rounded-t-lg px-6 py-4">
          <h2 className="font-bold text-lg">View Book Info</h2>
          <button
            onClick={() => dispatch(toggleReadBookPopup())}
            className="text-black text-lg font-bold hover:cursor-pointer bg-white w-7 rounded-full"
          >
            &times;
          </button>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Book Title
            </label>
            <p className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100">
              {book && book.title}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Author</label>
            <p className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100">
              {book && book.author}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Description
            </label>
            <p className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100">
              {book && book.description}
            </p>
          </div>
          <div className="flex justify-end px-6 py-4 bg-gray-100 rounded-b-lg">
            <button
              className="px-4 py-2 bggray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer"
              type="button"
              onClick={() => dispatch(toggleReadBookPopup())}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadBookPopup;
