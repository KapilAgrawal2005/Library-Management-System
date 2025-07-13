require("dotenv").config();
const sendToken = (user, message, res) => {
  const token = user.generateToken();

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  console.log("Setting cookie with options:", cookieOptions);
  console.log("Token generated for user:", user.email);
  console.log("Environment:", process.env.NODE_ENV);

  res.status(200).cookie("token", token, cookieOptions).json({
    success: true,
    user,
    token,
    message,
  });
};
module.exports = { sendToken };
