import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { register, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const navigateTo = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    dispatch(register(data));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
      navigateTo(`/otp-verification/${email}`);
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading]);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex flex-col justify-center md:flex-row h-screen">
      {/* left side */}
      <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col justify-center items-center rounded-tr-[80px] rounded-br-[80px]">
        <div className="text-center h-[376px]">
          <div className="flex justify-center mb-12">
            <img
              src={logo_with_title}
              alt="logo"
              className="mb-12 h-44 w-auto"
            />
          </div>
          <p className="text-gray-300 mb-12">
            Already have an Account? Sign in now.
          </p>
          <Link
            to={"/login"}
            className="border-2 rounded-lg border-white px-8 py-2 hover:bg-white hover:text-black font-semibold transition"
          >
            SIGN IN
          </Link>
        </div>
      </div>

      {/* right side */}
      <div className="w-1/3 md:w-full bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-12">
            <div className="flec flex-col-reverse sm:flex-row items-center justify-center gap-5">
              <h3 className="text-4xl overflow-hidden font-medium">Sign Up</h3>
              <img src={logo} alt="logo" className="h-auto w-24 object-cover" />
            </div>
          </div>
          <p className="text-gray-800 text-center mb-12">
            Please provide your information to Sign up.
          </p>

          <form onSubmit={handleRegister}>
            <div className="mb-2">
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
              />
            </div>

            <div className="mb-2">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
              />
            </div>

            <div className="mb-2">
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
              />
            </div>

            <div className="block md:hidden font-semibold mt-5">
              <p>
                Already have an Account?
                <Link
                  to={"/login"}
                  className="text-sm text-gray-500 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>

            <button
              type="submit"
              className="border-2 mt-5 border-black bg-black text-white w-full font-semibold py-2 rounded-lg hover:text-black hover:bg-white hover:cursor-pointer"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
