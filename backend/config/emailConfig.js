const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendVerificationEmail = async (email, code) => {
    const mailOptions = {
        from: `"Password Reset" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Password Reset Verification Code',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Password Reset Verification</h2>
                <p>You have requested to reset your password. Please use the following verification code:</p>
                <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0;">
                    ${code}
                </div>
                <p>This code will expire in 15 minutes.</p>
                <p>If you didn't request this password reset, please ignore this email.</p>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully:', info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Propagate the error for better handling
    }
};

// Verify the connection configuration
transporter.verify(function(error, success) {
    if (error) {
        console.error('SMTP connection error:', error);
    } else {
        console.log('SMTP server is ready to take our messages');
    }
});

module.exports = { sendVerificationEmail }; 