const {catchAsyncErrors} = require("../middleware/catchAsyncErrors");
const {ErrorHandler} = require("../middleware/errorMiddlewares");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

const getAllUsers = catchAsyncErrors(async(req,res,next)=>{
    try{
        const users = await User.find({accountVerified : true});
        res.status(200).json({
            success: true,
            users,
        });
    }catch(error){
        return next(new ErrorHandler(error.message,500));
    }
});

const registerNewAdmin = catchAsyncErrors( async(req,res,next)=>{
    try{

        if(!req.files || Object.keys(req.files).length === 0){
            return next(new ErrorHandler("Admin Avatar is required.",400));
        }
    
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return next (new ErrorHandler("All fields are required.",400));
        }

        const userAlreadyExist = await User.findOne({email, accountVerified: true});


        if(userAlreadyExist){
            return next(new ErrorHandler("User already exist.",400));
        }
    
        if(password.length < 8 || password.length > 16){
            return next(new ErrorHandler("Password must be between 8 to 16 characters.",400));
        }
    
        const {avatar} = req.files;
        const allowedFormats = ["image/png","image/jpeg","image/webp"];
        if(!allowedFormats.includes(avatar.mimetype)){
            return next(new ErrorHandler("This file format is not supported.",400));
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const cloudinaryResponse = await cloudinary.uploader.upload(
            avatar.tempFilePath,
            {folder: "LIBRARY_MANAGEMENT_SYSTEM_ADMIN_AVATAR",}
        );
    
        if(!cloudinaryResponse || cloudinaryResponse.error){
            console.error("Cloudinary Error",cloudinaryResponse.error);
            return next( new ErrorHandler("Failed to upload the avatar.",500));
        }
    
        const admin = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "Admin",
            accountVerified: true,
            avatar: {
                public_id : cloudinaryResponse.public_id,
                url : cloudinaryResponse.secure_url,
            },
        });
        res.status(200).json({
            success: true,
            message: "Admin registered successfully.",
            admin,
        });
    }catch(error){
        return next( new ErrorHandler(error.message,500));
    }
    
});

module.exports = {getAllUsers, registerNewAdmin};