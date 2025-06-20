require("dotenv").config();
const sendToken = (user, message, res) => {
  try {
    console.log("Generating token for user:", user._id);
    const token = user.generateToken();
    console.log("Token generated successfully");

    console.log("Setting cookie and sending response");
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      })
      .json({
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
