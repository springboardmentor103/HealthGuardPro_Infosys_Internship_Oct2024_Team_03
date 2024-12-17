import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'; // Correct import for Login
import ForgotPassword from './pages/forgotpassword'; // Correct import for ForgotPassword
import Signup from './pages/signup';
import  Verify from './pages/verifycode';
import  Setpassword from './pages/Setpassword';
import { EmailProvider } from './pages/EmailContext';
import Profile from "./pages/profile-p1";  
import Profile2 from "./pages/profile-p2";
import Dashboard from './pages/dashboard';
import Leaderboard from './pages/leaderboard';

import PhysicalFitnessQuiz from './pages/PhysicalFitnessQuiz';
import NutritionQuiz from './pages/NutritionQuiz';
import LifestyleQuiz from './pages/LifestyleQuiz';
import MentalWellBeingQuiz from './pages/MentalWellBeingQuiz';
import BiomarkerQuiz from './pages/BiomarkerQuiz';
import ViewScore from './pages/ViewScore';
function App() {
  return (
    <EmailProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/verifycode" element={<Verify/>} />
        <Route path="/Setpassword" element={<Setpassword/>} />
        <Route path="/profile-p2" element={<Profile2/>} />
        <Route path="/profile-p1" element={<Profile/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/PhysicalFitnessQuiz" element={<PhysicalFitnessQuiz />} />
        <Route path="/NutritionQuiz" element={<NutritionQuiz />} />
        <Route path="/LifestyleQuiz" element={<LifestyleQuiz />} />
        <Route path="/MentalWellBeingQuiz" element={<MentalWellBeingQuiz/>} />
        <Route path="/BiomarkerQuiz" element={<BiomarkerQuiz />} />
        <Route path="/ViewScore" element={<ViewScore/>} />
         {/* Route for Dashboard */}
         <Route path="/" element={<Dashboard />} />
        
        {/* Route for Leaderboard Page */}
        <Route path="/leaderboard" element={<Leaderboard />} />
        
        {/* Route for Profile Page */}
        <Route path="/profile-p1" element={<Profile />} />
        
        {/* Route for Login Page */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </EmailProvider>
  );
}
 
export default App;
