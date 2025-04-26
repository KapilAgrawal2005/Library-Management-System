import React, { useState } from "react";
import closeIcon from "../assets/close-square.png";
import settingIcon from "../assets/setting.png";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../store/slices/authSlice";
import { toggleSettingPopup } from "../store/slices/popupSlice";
const SettingPopup = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const dispatch = useDispatch();

  const { loading, user } = useSelector((state) => state.auth);

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("currentPassword", currentPassword);
    formdata.append("newPassword", newPassword);
    formdata.append("confirmNewPassword", confirmNewPassword);
    dispatch(updatePassword(formdata));
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg sm:w-auto lg:w-1/2 2xl:w-1/3">
        <div className="p-6">
          <header className="flex justify-between items-center mb-7 border-b-[1px] pb-5 border-black">
            <div className="flex items-center gap-3">
              <img
                src={settingIcon}
                alt="settingIcon"
                className="bg-gray-300 p-5 rounded-lg"
              />
              <h3 className="text-xl font-bold">Change Credentials</h3>
            </div>
            <img
              src={closeIcon}
              alt="closeIcon"
              className="cursor-pointer"
              onClick={() => dispatch(toggleSettingPopup())}
            />
          </header>
          <form onSubmit={handleUpdatePassword}>
            <div className="mb-4 sm:flex gap-4 items-center">
              <label className="block text-gray-900 font-medium w-full">
                Enter Current Password
              </label>
              <input
                required
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md "
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
              />
            </div>

            <div className="mb-4 sm:flex gap-4 items-center">
              <label className="block text-gray-900 font-medium w-full">
                Enter New Password
              </label>
              <input
                required
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md "
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
              />
            </div>

            <div className="mb-4 sm:flex gap-4 items-center">
              <label className="block text-gray-900 font-medium w-full">
                Confirm New Password
              </label>
              <input
                required
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md "
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm New Password"
              />
            </div>
            <div className="flex justify-end space-x-4 my-5 pt-5">
              <button
                type="button"
                onClick={() => dispatch(toggleSettingPopup())}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-black rounded-md hover:bg-gray-800 text-white cursor-pointer"
              >
                CONFIRM
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingPopup;
