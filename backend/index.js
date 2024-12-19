// const express = require('express');
// const nodemailer = require('nodemailer');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/userAuth', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // User schema
// const userSchema = new mongoose.Schema({
//     firstName: String,
//     email: { type: String, unique: true },
//     phoneNumber: String,
//     password: String,
// });

// const User = mongoose.model('User', userSchema);

// // Signup route
// app.post('/api/signup', async (req, res) => {
//     // console.log("hi")
//     try {
//         const { firstName, email, phoneNumber, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             firstName,
//             email,
//             phoneNumber,
//             password: hashedPassword,
//         });

//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (err) {
//         res.status(400).json({ error: 'Error registering user' });
//     }
// });

// // Login route
// app.post('/api/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) return res.status(404).json({ error: 'User not found' });

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });

//         // Generate JWT (optional)
//         const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });

//         res.status(200).json({ message: 'Login successful', token });
//     } catch (err) {
//         res.status(500).json({ error: 'Server error' });
//     }
// });


// // Database Schema for storing verification codes
// const VerificationCodeSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     code: { type: String, required: true },
//     expiresAt: { type: Date, required: true }, // Expiry time for the code
// });

// const VerificationCode = mongoose.model('VerificationCode', VerificationCodeSchema);

// app.post('/api/send-code', async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ message: 'Email is required' });
//     }

//     try {
//         const code = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
//         const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Code expires in 10 minutes

//         // Save the code in the database (overwrite if it already exists)
//         await VerificationCode.findOneAndUpdate(
//             { email },
//             { code, expiresAt },
//             { upsert: true }
//         );

//         // Set up nodemailer to send the email
//         const transporter = nodemailer.createTransport({
//             service: 'Gmail', // or use a custom SMTP server
//             auth: {
//                 user: 'siva1998vel@gmail.com',
//                 pass: 'bfbh swqd buua moob',
//             },
//         });

//         await transporter.sendMail({
//             from: 'siva1998vel@gmail.com',
//             to: email,
//             subject: 'Your Verification Code',
//             text: `Your verification code is ${code}. It will expire in 10 minutes.`,
//         });

//         res.json({ message: 'Verification code sent!' });
//     } catch (error) {
//         console.error('Error sending code:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


// app.post('/api/verify-code', async (req, res) => {
//     const { email, code } = req.body;

//     if (!email || !code) {
//         return res.status(400).json({ message: 'Email and code are required' });
//     }

//     try {
//         const record = await VerificationCode.findOne({ email });

//         if (!record) {
//             return res.status(404).json({ message: 'No verification code found for this email' });
//         }

//         if (record.code !== code) {
//             return res.status(400).json({ message: 'Invalid verification code' });
//         }

//         if (new Date() > record.expiresAt) {
//             return res.status(400).json({ message: 'Verification code has expired' });
//         }

//         res.json({ message: 'Code verified!' });
//     } catch (error) {
//         console.error('Error verifying code:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


// // Database Schema for Users (example schema)
// const UserSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
// });

// //const User = mongoose.model('User', UserSchema);

// app.post('/api/set-password', async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Email and password are required' });
//     }

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

//         const updatedUser = await User.findOneAndUpdate(
//             { email },
//             { password: hashedPassword },
//             { new: true }
//         );

//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.json({ message: 'Password updated successfully!' });
//     } catch (error) {
//         console.error('Error setting password:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });




// app.listen(5000, () => console.log('Server running on port 5000'));

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
mongoose.connect('mongodb://localhost:27017/userAuth',
    
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// User schema
const userSchema = new mongoose.Schema({
    firstName: String,
    email: { type: String, unique: true },
    phoneNumber: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

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
    // console.log("hi")
    try {
        const { firstName, email, phoneNumber, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
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

            console.log('Generated Token:', token); // Debug log for token
            res.status(200).json({ message: 'Login successful', token });
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
                user: 'vrushalib2304@gmail.com',
                pass: 'jkqp bhwj zcid zzdl',
 
            },
        });

        await transporter.sendMail({
            from: 'vrushalib2304@gmail.com',
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
            user.email = email; // Update email if it has changed
            emailChanged = true;
        }

        await user.save();

        console.log("Updated user:", user); // Log the updated user for debugging

        if (emailChanged) {
            return res.status(401).json({
                message: "Email updated. Please log in again.",
                user: { firstName: user.firstName, email: user.email },
            });
        }

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Error in update:", error);
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
});


module.exports = app;


app.listen(5000, () => console.log('Server running on port 5000'));

