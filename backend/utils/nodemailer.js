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
            subject: 'Google Verification Code',
            html: `<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #ffffff;">
            <!-- Header -->
            <div style="background-color: #4285f4; padding: 40px 20px; text-align: left;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: normal;">Google Verification Code</h1>
            </div>

            <!-- Content -->
            <div style="padding: 40px 20px; background-color: #f5f5f5;">
                <p style="color: #333; font-size: 14px; line-height: 1.5; margin: 0 0 20px 0;">
                    Dear Google User,
                </p>

                <p style="color: #333; font-size: 14px; line-height: 1.5; margin: 0 0 20px 0;">
                    We received a request to access your Google Account <a href=mailto:${email} style="color: #1a73e8; text-decoration: none;">${email}</a> through your email address. Your Google verification code is:
                </p>

                <div style="text-align: center; margin: 30px 0;">
                    <span style="font-size: 32px; font-weight: bold; color: #333; letter-spacing: 8px; display: inline-block; padding: 20px; background-color: #ffffff; border: 1px solid #dadce0; border-radius: 8px;">
                        ${otp}
                    </span>
                </div>

                <p style="color: #333; font-size: 14px; line-height: 1.5; margin: 20px 0;">
                    If you did not request this code, it is possible that someone else is trying to access the Google Account <a href=mailto:${email} style="color: #1a73e8; text-decoration: none;">${email}</a>. <strong>Do not forward or give this code to anyone.</strong>
                </p>

                <p style="color: #333; font-size: 14px; line-height: 1.5; margin: 20px 0 0 0;">
                    Sincerely yours,
                </p>

                <p style="color: #333; font-size: 14px; line-height: 1.5; margin: 5px 0 0 0;">
                    The Google Accounts team
                </p>
            </div>

            <!-- Footer -->
            <div style="padding: 20px; background-color: #f5f5f5; border-top: 1px solid #dadce0;">
                <p style="color: #5f6368; font-size: 12px; line-height: 1.4; margin: 0;">
                    This email can't receive replies. For more information, visit the <a href="#" style="color: #1a73e8; text-decoration: none;">Google Accounts Help Center</a>.
                </p>
                <p style="color: #5f6368; font-size: 12px; line-height: 1.4; margin: 5px 0 0 0;">
                    © Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA
                </p>
            </div>
        </div>`
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending Email:', error);
    }
};

