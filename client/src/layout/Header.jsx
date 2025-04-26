import React, { useEffect, useState } from "react";
import settingIcon from "../assets/setting.png";
import userIcon from "../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettingPopup } from "../store/slices/popupSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setCurrentTime(`${hours}:${minutes} ${ampm}`);

      const options = { month: "short", day: "numeric", year: "numeric" };
      setCurrentDate(now.toLocaleDateString("en-US", options));
    };

    // Call immediately to set initial values
    updateDateTime();

    // Set up interval to update every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="bg-white flex justify-between items-center absolute top-0 w-full px-6 py-4 left-0 shadow-md ">
      {/* {left side} */}
      <div className="flex items-center gap-2">
        <img src={userIcon} alt="userIcon" className="w-8 h-8" />
        <div className="flex flex-col">
          <span className="text-sm font-medium sm:text-lg lg:text-xl sm:font-semibold">
            {user && user?.name}
          </span>
          <span className="text-sm font-medium sm:text-lg sm:font-medium">
            {user && user?.role}
          </span>
        </div>
      </div>

      {/* {right side} */}
      <div className="hidden md:flex items-center gap-2">
        <div className="flex flex-col text-sm lg:text-lg items-end font-semibold">
          <span>{currentTime}</span>
          <span>{currentDate}</span>
        </div>
        <span className="bg-black w-[2px] h-14" />
        <img
          src={settingIcon}
          alt="settingIcon"
          className="h-8 w-8 hover:cursor-pointer"
          onClick={() => dispatch(toggleSettingPopup())}
        />
      </div>
    </header>
  );
};

export default Header;
