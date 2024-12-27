const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendVerificationEmail = async (to, code) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: 'Your Verification Code',
            text: `Your verification code is ${code}. It will expire in 10 minutes.`,
        });
        return true;
    } catch (error) {
        console.error('Email sending error:', error);
        return false;
    }
};