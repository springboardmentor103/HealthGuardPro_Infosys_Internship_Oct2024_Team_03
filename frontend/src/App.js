import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'; // Correct import for Login
import ForgotPassword from './pages/forgotpassword'; // Correct import for ForgotPassword
import Signup from './pages/signup';
import  Verify from './pages/verify';
import  Setpassword from './pages/SetPassword';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/verify" element={<Verify/>} />
        <Route path="/SetPassword" element={<Setpassword/>} />
      </Routes>
    </Router>
  );
}

export default App;
