const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        trim : true,
    },
    email: {
        type : String,
        required : true,
        lowercase : true,
    },
    password: {
        type : String,
        required : true,
        select : false,
    },
    role: {
        type : String,
        enum : ["Admin", "User"],
        default : "User",
    },
    accountVerified: {
        type: Boolean,
        default: false,
    },
    borrowedBooks:[{
        bookId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "borrow",
        },
        returned : {
            type:Boolean,
            default:false,
        },
        bookTitle:{
            type:String,
        },
        borrowedDate:{
            type:Date,
        },
        dueDate:{
            type:Date,
        },
    }],
    avatar: {
        public_id : String,
        url: String,
    },
    otp:{
        type: Number,
    },
    otpExpire:{
        type:Date,
    },
    resetPasswordToken:{
        type:String,
    },
    resetPasswordTokenExpire:{
        type:Date,
    }
},
{
    timestamps:true,
});


userSchema.methods.generateOTP = function () {
    const otp = Math.floor(Math.random() * 900000) + 100000;
    this.otp = otp;
    this.otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    return otp;
};

userSchema.methods.generateToken = function(){
    return jwt.sign(
        {id: this._id},
        process.env.JWT_SECRET_KEY,
        {expiresIn: process.env.JWT_EXPIRE},
    )
}

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordTokenExpire = Date.now() + 15*60*1000;

    return resetToken;
}

module.exports = mongoose.model("User" , userSchema);