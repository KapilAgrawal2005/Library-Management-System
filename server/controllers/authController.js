const { ErrorHandler } = require("../middleware/errorMiddlewares");
require("dotenv").config();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const {sendOTP} = require("../utils/sendOTP");
const { sendToken } = require("../utils/sendToken");
const { sendEmail } = require("../utils/sendEmail");
const { generateResetPasswordEmailTemplate } = require("../utils/emailTemplates");


const signup = catchAsyncErrors(async(req, res, next)=>{
    const {name, email, password} = req.body;
    try{
        if(!name || !email || !password){
            return next(new ErrorHandler("Please fill all the fields.", 400));
        }

        const isAlreadySignup = await User.findOne({email, accountVerified: true});
        if(isAlreadySignup){
            return next(new ErrorHandler("User already exist with this email.", 400));
        }

        const signupAttempts = await User.find({email, accountVerified: false});
        if(signupAttempts.length >= 5){
            return next(new ErrorHandler("Too many attempts. Please try again later.", 400));
        }

        if(password.length < 8 || password.length > 16){
            return next(new ErrorHandler("Password must be between 8 to 16 characters.", 400));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const otp = await user.generateOTP();
        await user.save();

        try {
            await sendOTP(otp, email, res);
        } catch (emailError) {
            console.error('Error sending OTP:', emailError);
            // If email fails, delete the user and return error
            await User.findByIdAndDelete(user._id);
            return next(new ErrorHandler("Failed to send OTP. Please try again.", 500));
        }

    } catch(error) {
        console.error('Signup error:', error);
        return next(new ErrorHandler(error.message || "Internal server error.", 500));
    }
});


const verifyOTP = catchAsyncErrors(async(req,res,next)=>{
    const {email, otp} = req.body;
    if(!email ||!otp){
        return next(new ErrorHandler("Email and OTP is required.",400));
    }
    try{
        const userAllEntries = await User.find({
            email, 
            accountVerified: false,
        }).sort({createdAt: -1});

        if(!userAllEntries){
            return next(new ErrorHandler("User not found.",404))
        }


        let user;
        if(userAllEntries.length > 1){
            user = userAllEntries[0];
            await User.deleteMany({
                _id : {$ne : user._id},
                email,
                accountVerified: false,
            });
        } else{
            user = userAllEntries[0];
        }

        if(user.otp !== Number(otp)){
            return next(new ErrorHandler("Invalid OTP",400));
        }

        const currentTime = Date.now();
        const otpExpire = new Date(user.otpExpire).getTime();

        if(currentTime > otpExpire){
            return next(new ErrorHandler("OTP has expired",400))
        }
        user.accountVerified = true;
        user.otp = null;
        user.otpExpire = null;

        await user.save({validateModifiedOnly : true});

        sendToken(user, "Account Verified.", res);


    }catch(error){
        return next(new ErrorHandler("Internal server error.",500));
    }
});


const login = catchAsyncErrors(async(req,res,next)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("All fields are required.",400));
    }
    try{
        const user = await User.findOne({email, accountVerified:true}).select("+password");

        if(!user){
            return next(new ErrorHandler("User doesn't exist.",400));
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if(!isPasswordMatched){
            return next(new ErrorHandler("Password is incorrect",400));
        }

        sendToken(user,"User logged in successfully.",res);

    }catch(error){
        return next(new ErrorHandler("Internal server error.",500));
    }
});


const logout = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly:true,
    }).json({
        success:true,
        message: "User logged out successfully",
    });
});


const getUser = catchAsyncErrors(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});


const forgotPasswordEmail =catchAsyncErrors(async(req,res,next)=>{
    const {email} = req.body;
    if(!email){
        return next(new ErrorHandler("Email is required",400));
    }

    const user = await User.findOne({
        email,
        accountVerified: true,
    });
    try{
        if(!user){
            return next(new ErrorHandler("Invalid email.",400));
        }
        
        const passwordTokenForReset = user.getResetPasswordToken();
    
        await user.save({validateBeforeSave: false});
    
        const resetPasswordURL = `${process.env.FRONTEND_URL}/password/reset/${passwordTokenForReset}`;
    
        const message = generateResetPasswordEmailTemplate(resetPasswordURL);

        await sendEmail({email,subject :"Password Reset for BookWarm Library.",message});

        res.status(200).json({
            success: true,
            message: "Password reset email send successfully",
        })
    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message,500));
    }
});


const resetPassword = catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.params;
    const {password, confirmPassword} = req.body;
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({resetPasswordToken, resetPasswordTokenExpire : {$gt : Date.now()}});

    try{
        if(!user){
            return next(new ErrorHandler("Reset password token is invalid or has been expired",400));
        }

        if(password !== confirmPassword){
            return next(new ErrorHandler("Password doesn't match.",400));
        }

        if(password.length < 8 || password.length > 16 || confirmPassword.length < 8 ||  confirmPassword.length > 16){
            return next(new ErrorHandler("Password must be between 8 to 16 characters.",400));
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;

        await user.save();

        sendToken(user, "Password reset successfully.",res);

    }catch(error){
        return next(new ErrorHandler("Can't reset the password.",500));
    }


});


const updatePassword = catchAsyncErrors(async (req, res, next) => {
    const _id = req.user._id; 
    const user = await User.findById(_id).select("+password");

    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    try {
        if(!currentPassword || !newPassword || !confirmNewPassword) {
            return next(new ErrorHandler("All fields are required.", 400));
        }

        const isCurrentPasswordMatched = await bcrypt.compare(currentPassword, user.password);

        if(!isCurrentPasswordMatched) {
            return next(new ErrorHandler("The current password is incorrect.", 400));
        }

        if(newPassword.length < 8 || newPassword.length > 16 || confirmNewPassword.length < 8 || confirmNewPassword.length > 16) {
            return next(new ErrorHandler("Password must be between 8 to 16 characters.", 400));
        }

        if (newPassword !== confirmNewPassword) {
            return next(new ErrorHandler("New password and confirm new password don't match.", 400));
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password has been updated successfully."
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});


module.exports = {signup, verifyOTP, login, logout, getUser, forgotPasswordEmail, resetPassword, updatePassword};