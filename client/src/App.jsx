import "./App.css";
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
    dispatch(getUser());
    dispatch(fetchAllBooks());
    if (isAuthenticated && user?.role === "Admin") {
      dispatch(fetchAllUsers());
      dispatch(fetchAllBorrowedBooks());
    }
    if (isAuthenticated && user?.role === "User") {
      dispatch(fetchUserBorrowedBooks());
    }
  }, [isAuthenticated]);

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
