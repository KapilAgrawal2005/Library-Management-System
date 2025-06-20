require("dotenv").config();
const sendToken = (user, message, res) => {
  try {
    console.log("=== SENDTOKEN START ===");
    console.log("User ID:", user._id);
    console.log("Message:", message);

    console.log("Generating token...");
    const token = user.generateToken();
    console.log("Token generated successfully, length:", token.length);

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true, // Always use secure cookies for HTTPS deployment
      sameSite: "none", // Allow cross-origin cookies
    };
    console.log("Cookie options:", cookieOptions);

    console.log("Setting cookie and sending response...");
    res.status(200).cookie("token", token, cookieOptions).json({
      success: true,
      user,
      token,
      message,
    });
    console.log("=== SENDTOKEN END ===");
  } catch (error) {
    console.error("SendToken error:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    throw error;
  }
};
module.exports = { sendToken };
