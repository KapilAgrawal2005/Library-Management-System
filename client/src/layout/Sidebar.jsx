import React, { useEffect } from "react";
import logo_with_title from "../assets/logo-with-title.png";
import logoutIcon from "../assets/logout.png";
import closeIcon from "../assets/white-close-icon.png";
import dashboardIcon from "../assets/element.png";
import bookIcon from "../assets/book.png";
import catalogIcon from "../assets/catalog.png";
import settingIcon from "../assets/setting-white.png";
import usersIcon from "../assets/people.png";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import {
  toggleAddNewAdminPopup,
  toggleSettingPopup,
} from "../store/slices/popupSlice";

import AddNewAdmin from "../popups/AddNewAdmin";
import SettingPopup from "../popups/SettingPopup";

const Sidebar = ({ isSidebarOpen, setSidebarOpen, setSelectedComponent }) => {
  const dispatch = useDispatch();
  const { addNewAdminPopup, settingPopup } = useSelector(
    (state) => state.popup
  );
  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, loading, error, message]);

  return (
    <div>
      <aside
        className={`${
          isSidebarOpen ? "left-0" : "-left-full"
        } z-10 transition-all duration-700 md:relative w-64 h-full flex flex-col bg-black text-white md:left-0`}
        style={{ position: "fixed" }}
      >
        <div className="px-6 py-4 my-8">
          <img src={logo_with_title} alt="logo" />
        </div>
        <nav className="px-6 space-y-2 flex-1">
          <button
            className="w-full py-2 font-medium hover:cursor-pointer bg-transparent rounded-md flex items-center space-x-2"
            onClick={() => setSelectedComponent("Dashboard")}
          >
            <img src={dashboardIcon} alt="icon" />
            <span>Dashboard</span>
          </button>

          <button
            className="w-full py-2 font-medium hover:cursor-pointer bg-transparent rounded-md flex items-center space-x-2"
            onClick={() => setSelectedComponent("Book")}
          >
            <img src={bookIcon} alt="icon" />
            <span>Books</span>
          </button>

          {isAuthenticated && user?.role === "Admin" ? (
            <>
              <button
                className="w-full py-2 font-medium hover:cursor-pointer bg-transparent rounded-md flex items-center space-x-2"
                onClick={() => setSelectedComponent("Catalog")}
              >
                <img src={catalogIcon} alt="icon" />
                <span>Catalog</span>
              </button>
              <button
                className="w-full py-2 font-medium hover:cursor-pointer bg-transparent rounded-md flex items-center space-x-2"
                onClick={() => setSelectedComponent("Users")}
              >
                <img src={usersIcon} alt="icon" />
                <span>Users</span>
              </button>

              <button
                className="w-full py-2 font-medium hover:cursor-pointer bg-transparent rounded-md flex items-center space-x-2"
                onClick={() => dispatch(toggleAddNewAdminPopup())}
              >
                <RiAdminFill className="w-6 h-6" />
                <span>Add New Admin</span>
              </button>
            </>
          ) : (
            <button
              className="w-full py-2 font-medium hover:cursor-pointer bg-transparent rounded-md flex items-center space-x-2"
              onClick={() => setSelectedComponent("My Borrowed Books")}
            >
              <img src={catalogIcon} alt="icon" />
              <span>My Borrowed Books</span>
            </button>
          )}

          <button
            className="md:hidden w-full py-2 font-medium hover:cursor-pointer bg-transparent rounded-md flex items-center space-x-2"
            onClick={() => dispatch(toggleSettingPopup())}
          >
            <img src={settingIcon} alt="icon" />
            <span>Update Credentials</span>
          </button>
        </nav>

        <div className="px-6 py-4">
          <button
            className="py-2 rounded-md text-center flex items-center justify-center space-x-5 mx-auto w-fit bg-transparent hover:cursor-pointer"
            onClick={handleLogout}
          >
            <img src={logoutIcon} alt="icon" />
            <span>Logout</span>
          </button>
        </div>
        <img
          src={closeIcon}
          alt="icon"
          className="h-fit w-fit absolute top-0 right-4 mt-4 block md:hidden "
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        />
      </aside>
      {addNewAdminPopup && <AddNewAdmin />}
      {settingPopup && <SettingPopup />}
    </div>
  );
};

export default Sidebar;
