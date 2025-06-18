import nodemailer from 'nodemailer';

export const sendEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'instagramclone0@gmail.com',
                pass: 'qhlc jhxt hieh vdek',
            },
        });

        const mailOptions = {
            from: 'instagramclone0@gmail.com',
            to: email,
            subject: 'OTP for password reset',
            html: `<div style="max-width: 500px; margin: auto; padding: 25px; border-radius: 15px; font-family: 'Poppins', Arial, sans-serif; background-color: #f8f5ff; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #9b7ede; margin: 0; font-size: 28px;">Password Reset</h1>
                <div style="width: 80px; height: 4px; background: linear-gradient(to right, #c5a8ff, #9b7ede); margin: 10px auto;"></div>
            </div>
            
            <p style="font-size: 16px; color: #666; text-align: center; line-height: 1.5;">
                We received a request to reset your password. Use the OTP below to complete the process:
            </p>
            
            <div style="background-color: #e8f4fd; border-left: 5px solid #a6d5fa; border-right: 5px solid #a6d5fa; padding: 15px; margin: 20px ; border-radius: 8px;">
                <p style="font-size: 42px; color: #5b92e5; font-weight: bold; text-align: center; margin: 0; letter-spacing: 5px;">
                    ${otp}
                </p>
            </div>
            
            <div style="background-color: #fff8e8; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                <p style="color: #d4a84f; font-size: 14px; margin: 0;">
                    <strong>⚠️ Important:</strong> This OTP will expire in 10 minutes. Never share this code with anyone.
                </p>
            </div>
            
            <p style="font-size: 14px; color: #888; text-align: center; margin-top: 25px; line-height: 1.4;">
                If you didn't request a password reset, please ignore this email or contact support if you have concerns.
            </p>
            
            <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <p style="color: #999; font-size: 13px; margin: 0;">
                    © 2023 Your Company. All rights reserved.
                </p>
            </div>
        </div>`
        };

        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully');
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
};

