const express = require('express');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const router = express.Router();

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
    // lastName: String,
    email: { type: String, unique: true },
    phoneNumber: String,
    password: String,
});


const User = mongoose.model('User', userSchema);

const FitnessScoreSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    username: { type: String, required: true },
    email: { type: String, required: true },
    category: { type: String, required: true }, // New field to specify the test category
    score: { type: Number, required: true },
    dateTaken: { type: Date, default: Date.now },
});

const FitnessScore = mongoose.model("FitnessScore", FitnessScoreSchema);

const testResultsSchema = new mongoose.Schema({
    email: { type: String, required: true },
    category: { type: String, required: true },  // E.g., "physicalfitness"
    marks: { type: Number, required: true },  // You can store the score as a number
    dateSubmitted: { type: Date, default: Date.now }
});

const TestResults = mongoose.model('TestResults', testResultsSchema);


const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Extract token from 'Authorization' header

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    // Verify the token
    jwt.verify(token, 'your_secret_key', (err, user) => {  // Replace 'your_secret_key' with your actual secret key
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
        req.user = user;  // Attach the decoded user info to the request
        next();  // Proceed to the next middleware or route handler
    });
};


// Route to submit marks
app.post('/api/submit-marks', authenticateToken, async (req, res) => {
    const { category, marks } = req.body;
    const userEmail = req.user.email; // Email of the logged-in user from JWT token

    if (!category || !marks) {
        return res.status(400).json({ message: 'Category and marks are required' });
    }

    try {
        // Create a new test result entry
        const newTestResult = new TestResults({
            email: userEmail,
            category,
            marks
        });

        await newTestResult.save();

        res.json({ message: 'Marks submitted successfully' });
    } catch (error) {
        console.error('Error submitting marks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Signup route
app.post('/api/signup', async (req, res) => {
    try {
        const { firstName, email, phoneNumber, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            // lastName,
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


const jwtSecretKey = 'your_secret_key'; // Replace with a secure random string


    app.post('/api/login', async (req, res) => {
        try {
            const { email, password } = req.body;

            // Find user by email
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ error: 'User not found' });

            // Compare password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });

            // Generate JWT
            const token = jwt.sign(
                { id: user._id, email: user.email }, // Payload
                jwtSecretKey,                        // Secret key
                { expiresIn: '1h' }                  // Expiration
            );
            const userId=user._id;
            const username = user.firstName;

            console.log('Generated Token:', token); // Debug log for token
<<<<<<< HEAD
            res.status(200).json({ message: 'Login successful', token, userId , email ,username});
=======
            res.status(200).json({ message: 'Login successful', token,  userId , email ,username});
>>>>>>> develop
        } catch (err) {
            console.error('Error during login:', err);
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

app.get('/api/user', authenticateToken, async (req, res) => {
    try {
        const email = req.user.email;  // Use the email from the decoded JWT token
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email }, { password: 0 }); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user); // Return user details (excluding password)
    } catch (error) {
        console.error('Error fetching user details:', error.message, error.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// const sendConfirmationEmail = async (oldEmail, newEmail, userId) => {
//     const transporter = nodemailer.createTransport({
//         service: "Gmail",
//         auth: {
//             user: 'siva1998vel@gmail.com',
//             pass: 'bfbh swqd buua moob',
//         },
//     });

//     const confirmationUrl = `http://localhost:5000/api/user/confirm-email?userId=${userId}&newEmail=${encodeURIComponent(newEmail)}`;
//     const mailOptions = {
//         from: '"Your App Name" <your-email@gmail.com>',
//         to: newEmail,
//         subject: "Confirm Your Email Address",
//         text: `You requested to change your email address. Please confirm your new email by clicking the link below:\n\n${confirmationUrl}\n\nIf you did not request this, please ignore this email.`,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log(`Confirmation email sent to ${newEmail}`);
// };

app.put("/api/user/update", async (req, res) => {
    const { firstName, email } = req.body; // Data being updated
    const token = req.headers["authorization"]?.split(" ")[1]; // Get the token from the Authorization header

    if (!token) {
        return res.status(401).json({ message: "Authorization token missing." });
    }

    try {
        const decoded = jwt.verify(token, jwtSecretKey); // Verify JWT using secret key
        console.log("Decoded token:", decoded); // Log decoded token for verification

        if (!decoded || !decoded.email) {
            return res.status(400).json({ message: "Token does not contain a valid email." });
        }

        const user = await User.findOne({ email: decoded.email }); // Find user by email from token
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let emailChanged = false;

        // Update user data
        if (firstName) {
            user.firstName = firstName; // Update the firstName if provided
        }
        if (email && email !== user.email) {
           // await sendConfirmationEmail(user.email, email, user._id);
            //  await sendConfirmationEmail(user.email, email, user._id); 
            user.email = email;
            emailChanged = true;
        }

            user.save();

        console.log("Updated user:", user); // Log the updated user for debugging

        if (emailChanged) {
            return res.status(200).json({
                //message: "Email change requested. A confirmation email has been sent to your new email address.",
               message: "Profile updated successfully", user 
            });
        }

        // res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Error in update:", error);
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
});

<<<<<<< HEAD
=======
// Add a route to confirm the email change
/* app.get("/api/user/confirm-email", async (req, res) => {
    const { userId, newEmail } = req.query;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.email = newEmail;
        await user.save();

        res.status(200).json({
            message: "Email address updated successfully! Please log in again.",
            requireLogout: true, // Flag to indicate the user should log out
        });
    } catch (error) {
        console.error("Error in email confirmation:", error);
        res.status(500).json({ message: "Error confirming email", error: error.message });
    }
}); */

>>>>>>> develop
app.post("/api/save-fitness-score", async (req, res) => {
    const { userId, username, email, category, score } = req.body;

    if (!userId || !username || !email || !category || !score) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        const newFitnessScore = new FitnessScore({ userId, username, email, category, score });
        await newFitnessScore.save();
        res.status(200).json({ message: "Fitness score saved successfully!" });
    } catch (error) {
        console.error("Error saving fitness score:", error);
        res.status(500).json({ message: "Failed to save fitness score." });
    }
});

app.get("/api/get-fitness-scores/:userId/:category", async (req, res) => {
    const { userId, category } = req.params;

    if (!userId || !category) {
        return res.status(400).json({ message: "User ID and category are required." });
    }

    try {
        // Fetch the most recent fitness score for the given user and category
        const score = await FitnessScore.findOne({ userId, category })
            .sort({ dateTaken: -1 }); // Sort by most recent date

        console.log("score :",score);

        if (!score) {
            return res.status(404).json({ message: "No scores found for this user and category." });
        }

        // Return the single score object
        res.status(200).json(score);
    } catch (error) {
        console.error("Error retrieving fitness scores:", error);
        res.status(500).json({ message: "Failed to retrieve scores. Please try again later." });
    }
});

<<<<<<< HEAD
=======

>>>>>>> develop

module.exports = app;

app.listen(5000, () => console.log('Server running on port 5000'));

