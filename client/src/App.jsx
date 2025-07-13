import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import OTP from "./pages/OTP";
import ResetPassword from "./pages/ResetPassword";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./store/slices/authSlice";
import { fetchAllUsers } from "./store/slices/userSlice";
import { fetchAllBooks } from "./store/slices/bookSlice";
import {
  fetchAllBorrowedBooks,
  fetchUserBorrowedBooks,
} from "./store/slices/borrowSlice";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is logging out, if so don't try to authenticate
    if (localStorage.getItem("isLoggingOut") === "true") {
      localStorage.removeItem("isLoggingOut");
      return;
    }

    // Check authentication status on app load
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    // Only fetch data if user is authenticated and user object exists
    if (isAuthenticated && user) {
      dispatch(fetchAllBooks());

      if (user.role === "Admin") {
        dispatch(fetchAllUsers());
        dispatch(fetchAllBorrowedBooks());
      }

      if (user.role === "User") {
        dispatch(fetchUserBorrowedBooks());
      }
    }
  }, [isAuthenticated, user, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/otp-verification/:email" element={<OTP />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
      </Routes>
      <ToastContainer theme="dark" />
    </Router>
  );
};

export default App;
