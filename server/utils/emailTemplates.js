const generateOTPEmailTemplate = (otp) =>{
    return `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #dddddd;">
            <h1 style="margin: 0; color: #333333;">OTP Verification</h1>
        </div>
        <div style="padding: 20px 0; text-align: center;">
            <h2 style="color: #333333; margin-bottom: 10px;">Your One-Time Password (OTP)</h2>
            <p style="color: #555555; font-size: 16px;">Please use the following OTP to complete your verification process. This OTP is valid for 10 miniutes only.</p>
            <div style="font-size: 32px; font-weight: bold; color: #007bff; margin: 20px 0; padding: 10px; background-color: #f8f9fa; border-radius: 4px; display: inline-block;">
                ${otp}
            </div>
            <p style="color: #555555; font-size: 16px;">If you did not request this OTP, please ignore this email.</p>
        </div>
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #dddddd; color: #777777;">
            <p style="margin: 0;">Thank you for using our services.</p>
        </div>
    </div>
</body>`
}


const generateResetPasswordEmailTemplate =(resetPasswordURL)=>{
    return `<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #007BFF;">
                <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Reset Your Password</h1>
            </td>
        </tr>
        <!-- Body -->
        <tr>
            <td style="padding: 20px;">
                <p style="font-size: 16px; color: #333333; line-height: 1.5;">Hello,</p>
                <p style="font-size: 16px; color: #333333; line-height: 1.5;">We received a request to reset your password. Click the button below to reset it:</p>
                <!-- Dynamic Reset Password Button -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 20px 0;">
                    <tr>
                        <td align="center" style="background-color: #007BFF; border-radius: 5px;">
                            <a href="${resetPasswordURL}" style="font-size: 16px; color: #ffffff; text-decoration: none; padding: 10px 20px; display: inline-block;">Reset Password</a>
                        </td>
                    </tr>
                </table>
                <p style="font-size: 16px; color: #333333; line-height: 1.5;">This link is valid only for 15 miniutes.</p>
                <p style="font-size: 16px; color: #333333; line-height: 1.5;">Thanks,<br>Your Company Name</p>
            </td>
        </tr>
        <!-- Footer -->
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #f4f4f4;">
                <p style="font-size: 14px; color: #777777; line-height: 1.5;">&copy; 2023 Your Company Name. All rights reserved.</p>
            </td>
        </tr>
    </table>
</body>`
}


module.exports = {generateOTPEmailTemplate, generateResetPasswordEmailTemplate};