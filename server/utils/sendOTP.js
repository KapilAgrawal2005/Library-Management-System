const { generateOTPEmailTemplate } = require("./emailTemplates");
const { sendEmail } = require("./sendEmail");

const sendOTP = async (otp, email, res) => {
    try {
        const message = generateOTPEmailTemplate(otp);
        await sendEmail({
            email,
            subject: "OTP for Bookworm Library",
            message,
        });
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "OTP failed to send.",
        });
    }
};

module.exports = { sendOTP };