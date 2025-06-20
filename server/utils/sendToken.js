require("dotenv").config();
const sendToken = (user, message, res) => {
  const token = user.generateToken();

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true, // Always use secure cookies for HTTPS deployment
    sameSite: "none", // Allow cross-origin cookies
  };

  res.status(200).cookie("token", token, cookieOptions).json({
    success: true,
    user,
    token,
    message,
  });
};
module.exports = { sendToken };
