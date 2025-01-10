# HealthGuardPro_Infosys_Internship_Oct2024_Team_03

# HealthGuard Pro

HealthGuard Pro is an innovative health management application designed to empower users in tracking their health metrics,achieving fitness goals, and exploring engaging health-related tips . Developed as part of the Infosys Springboard Internship (October 2024) by Team 03, this application integrates cutting-edge features to promote healthier lifestyles and well-being.

## Table of Contents

- [Project Overview]
- [Project Structure]
- [Setup Instructions]
- [Running the Application]
- [API Endpoints]
- [Frontend Components]
- [Testing]
- [License]

## Project Overview

HealthGuard Pro is a health tracking application that enables users to sign up, log in, and manage their health data. Features include:

- Secure user authentication with OTP-based password reset.
- Interactive dashboard displaying personalized health metrics.
- Health tips and trivia for engagement.
- Historical data tracking for health performance.

## Project Structure

The project is divided into two main components:

- **Frontend**: Built with React, JavaScript, and CSS, and styled for a responsive user experience.
- **Backend**: Powered by Node.js and Express, with MongoDB as the database.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm (v6 or higher)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory with the following content:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://healthguard:admin@cluster0.gf4jh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=2b5c1e0b4a6497e8e184b2b2eb6c2d8d67a2f0c10e04f4b3d6f4b3443c7e5c9c3d927154d12f9a412d378d5df3e6b06fa9c3e3e1cf217c7ea7bb12b95772c40
   NODE_ENV=development
   EMAIL_USER=siva1998vel@gmail.com
   EMAIL_PASSWORD=bfbh swqd buua moob
   ```
4. Start the backend server:
   ```bash
   node index.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```

## Running the Application

1. Ensure MongoDB is running locally or use a valid MongoDB Atlas connection string.
2. Start the backend server by running `node index.js` in the backend directory.
3. Start the frontend server by running `npm start` in the frontend directory.
4. Open your browser and navigate to `http://localhost:3000` to view the application.

## API Endpoints

### User Management

#### Registration

- **Endpoint**: `/api/auth/signup`
- **Method**: POST
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "username": "JohnDoe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

#### Login

- **Endpoint**: `/api/auth/login`
- **Method**: POST
- **Description**: Authenticates a user.
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

#### Password Reset

- **Endpoint**: `/api/auth/forgot-password`
- **Method**: POST
- **Description**: Sends an OTP to the user's email for password reset.
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com"
  }
  ```

### Health Tracking

#### Submit Health Data

- **Endpoint**: `/api/fitnessscores`
- **Method**: POST
- **Description**: Records user's health metrics.
- **Request Body**:
  ```json
  {
    "userId": "user123",
    "PhysicalFitness": 75,
    "Nutrition": 56,
    "MentalWellness": 81,
    "LifeStyle": 79,
    "BioMarkers": 96,
    "timestamp": "2024-02-20T10:00:00Z"
  }
  ```

#### Health History

- **Endpoint**: `/api/fitnessscores` 
- **Method**: GET
- **Description**: Retrieves user's health history.
- **Query Parameters**: `userId`, `startDate`, `endDate`

## Frontend Components

- **Login Page**: `frontend/src/pages/login.js`
  - Handles user authentication.
- **Signup Page**: `frontend/src/pages/signup.js`
  - Facilitates user registration.
- **Forgot Password Page**: `frontend/src/pages/forgotpassword.js`
  - Sends OTP for password reset.
- **OTP Verification Page**: `frontend/src/pages/verifycode.js`
  - Validates OTP.
- **Reset Password Page**: `frontend/src/pages/Setpassword.js`
  - Allows users to reset their password.
- **Profile Pages**:
  - **Profile Step 1**: `frontend/src/pages/profile-p1.js`
  - **Profile Step 2**: `frontend/src/pages/profile-p2.js`
- **Dashboard**: `frontend/src/pages/dashboard.js`
  - Displays personalized health metrics and visualizations.
- **Leaderboard**: `frontend/src/pages/leaderboard.js`
  - Shows real-time user performance rankings. 
- **Health Quizzes**: Various quiz components for health tracking, such as:
  - `PhysicalFitnessQuiz.js`
  - `NutritionQuiz.js`
  - `LifestyleQuiz.js`
  - `MentalWellBeingQuiz.js`
  - `BiomarkerQuiz.js`
- **View Scores**: `frontend/src/pages/ViewScore.js`
  - Displays historical scores for quizzes.

## Testing

The project uses Jest and React Testing Library for testing.

### Running Tests

Navigate to the frontend directory and run:

```bash
npm test
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


