require("dotenv").config();
const sendToken = (user, message, res) => {
    const token = user.generateToken();

    res.status(200).cookie("token", token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/'
    }).json({
        success: true,
        user,
        message,
    });
};

module.exports = { sendToken };