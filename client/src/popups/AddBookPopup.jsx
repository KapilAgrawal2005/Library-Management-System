import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook, fetchAllBooks } from "../store/slices/bookSlice";
import { toggleAddBookPopup } from "../store/slices/popupSlice";
const AddBookPopup = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setdescription] = useState("");

  const handleAddBook = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("description", description);
    dispatch(addBook(formData));
    dispatch(fetchAllBooks());
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg md:w-1/3">
        <div className="p-6">
          <h3 className="texl-xl font-bold mb-4">Record Book</h3>
          <form onSubmit={handleAddBook}>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium">
                Book Title
              </label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Book Title"
                className="w-full px-4 py-2 border-2 border-black rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium">
                Book Author
              </label>
              <input
                required
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Book Author"
                className="w-full px-4 py-2 border-2 border-black rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium">
                Book Price (Price for Borrowing)
              </label>
              <input
                required
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Book Price"
                className="w-full px-4 py-2 border-2 border-black rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium">
                Quantity
              </label>
              <input
                required
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Book Quantity"
                className="w-full px-4 py-2 border-2 border-black rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium">
                Description
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                placeholder="Book Description"
                className="w-full px-4 py-2 border-2 border-black rounded-md"
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer font-bold"
                onClick={() => dispatch(toggleAddBookPopup())}
              >
                Close
              </button>
              <button
                type="submit"
                className="hover:cursor-pointer px-4 py-3 border-2 border-black bg-black text-white rounded-md font-bold hover:bg-white hover:text-black"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookPopup;
