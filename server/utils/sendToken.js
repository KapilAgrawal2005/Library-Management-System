require("dotenv").config();
const sendToken = (user, message, res) => {
  try {
    const token = user.generateToken();

    // Cookie options for cross-site requests
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only secure in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Allow cross-site in production
    };

    res.status(200).cookie("token", token, cookieOptions).json({
      success: true,
      user,
      token,
      message,
    });
  } catch (error) {
    console.error("Error in sendToken:", error);
    throw error;
  }
};
module.exports = { sendToken };
