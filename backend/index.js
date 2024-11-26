const express = require('express');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userAuth', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// User schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phoneNumber: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Signup route
app.post('/api/signup', async (req, res) => {
    // console.log("hi")
    try {
        const { firstName, lastName, email, phoneNumber, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Error registering user' });
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });

        // Generate JWT (optional)
        const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});


// Database Schema for storing verification codes
const VerificationCodeSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true }, // Expiry time for the code
});

const VerificationCode = mongoose.model('VerificationCode', VerificationCodeSchema);

app.post('/api/send-code', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const code = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Code expires in 10 minutes

        // Save the code in the database (overwrite if it already exists)
        await VerificationCode.findOneAndUpdate(
            { email },
            { code, expiresAt },
            { upsert: true }
        );

        // Set up nodemailer to send the email
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // or use a custom SMTP server
            auth: {
                user: 'siva1998vel@gmail.com',
                pass: 'bfbh swqd buua moob',
            },
        });

        await transporter.sendMail({
            from: 'siva1998vel@gmail.com',
            to: email,
            subject: 'Your Verification Code',
            text: `Your verification code is ${code}. It will expire in 10 minutes.`,
        });

        res.json({ message: 'Verification code sent!' });
    } catch (error) {
        console.error('Error sending code:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/api/verify-code', async (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
        return res.status(400).json({ message: 'Email and code are required' });
    }

    try {
        const record = await VerificationCode.findOne({ email });

        if (!record) {
            return res.status(404).json({ message: 'No verification code found for this email' });
        }

        if (record.code !== code) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }

        if (new Date() > record.expiresAt) {
            return res.status(400).json({ message: 'Verification code has expired' });
        }

        res.json({ message: 'Code verified!' });
    } catch (error) {
        console.error('Error verifying code:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Database Schema for Users (example schema)
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

//const User = mongoose.model('User', UserSchema);

app.post('/api/set-password', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Password updated successfully!' });
    } catch (error) {
        console.error('Error setting password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




app.listen(5000, () => console.log('Server running on port 5000'));

