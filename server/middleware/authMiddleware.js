const jwt = require("jsonwebtoken");
const { catchAsyncErrors } = require("./catchAsyncErrors");
const { ErrorHandler } = require("./errorMiddlewares");
const User = require("../models/userModel");
require("dotenv").config();

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  console.log("Auth middleware - cookies:", req.cookies);
  console.log("Auth middleware - token:", token);

  if (!token) {
    console.log("No token found in cookies");
    return next(new ErrorHandler("Please login to access this resource.", 401));
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Token decoded successfully:", decode);

    const user = await User.findById(decode.id);

    if (!user) {
      console.log("User not found for ID:", decode.id);
      return next(new ErrorHandler("User not found.", 401));
    }

    console.log("User authenticated successfully:", user.email);
    req.user = user;
    next();
  } catch (error) {
    console.log("Token verification error:", error.message);
    return next(
      new ErrorHandler("Invalid or expired token. Please login again.", 401)
    );
  }
});

const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `User with ${req.user.role} role is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

module.exports = { isAuthenticated, isAuthorized };
