import React, { useState } from "react";
import placeHolder from "../assets/placeHolder.jpg";
import closeIcon from "../assets/close-square.png";
import keyIcon from "../assets/key.png";
import { useDispatch, useSelector } from "react-redux";
import { addNewAdmin } from "../store/slices/userSlice";
import { toggleAddNewAdminPopup } from "../store/slices/popupSlice";
const AddNewAdmin = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setAvatar(file);
    }
  };

  const handleAddNewAdmin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    dispatch(addNewAdmin(formData));
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <header className="flex justify-between items-center mb-7 border-b-[1px] pb-5 border-black">
            <div className="flex items-center gap-3">
              <img
                src={keyIcon}
                alt="keyIcon"
                className="bg-gray-300 p-5 rounded-lg"
              />
              <h3 className="text-xl font-bold">Add New Admin</h3>
            </div>
            <img
              src={closeIcon}
              alt="closeIcon"
              className="cursor-pointer"
              onClick={() => dispatch(toggleAddNewAdminPopup())}
            />
          </header>
          <form onSubmit={handleAddNewAdmin}>
            <div className="flex flex-col items-center mb-6">
              <label htmlFor="avtarInput" className="cursor-pointer">
                <img
                  src={avatarPreview ? avatarPreview : placeHolder}
                  alt="avatar"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <input
                  required
                  type="file"
                  id="avtarInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium">Name</label>
              <input
                required
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md "
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Admin's Name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 font-medium">Email</label>
              <input
                required
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin's Email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 font-medium">
                Password
              </label>
              <input
                required
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin's Password"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => dispatch(toggleAddNewAdminPopup())}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-black rounded-md hover:bg-gray-800 text-white cursor-pointer"
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

export default AddNewAdmin;
