const jwt = require("jsonwebtoken");
const { catchAsyncErrors } = require("./catchAsyncErrors");
const { ErrorHandler } = require("./errorMiddlewares");
const userModel = require("../models/userModel");
require("dotenv").config();
const User = require("../models/userModel");


const isAuthenticated = catchAsyncErrors(async(req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("User is not authenticated.",400));
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY); 
    req.user = await User.findById(decode.id);
    next();
});


const isAuthorized = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`User with ${req.user.role} role is not allowed to access this resource`,400));
        }
        next();
    };
};

module.exports = {isAuthenticated, isAuthorized};