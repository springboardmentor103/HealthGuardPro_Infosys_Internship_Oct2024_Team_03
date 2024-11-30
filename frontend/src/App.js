import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'; // Correct import for Login
import ForgotPassword from './pages/forgotpassword'; // Correct import for ForgotPassword
import Signup from './pages/signup';
import  Verify from './pages/verifycode';
import  Setpassword from './pages/Setpassword';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/verifycode" element={<Verify/>} />
        <Route path="/Setpassword" element={<Setpassword/>} />
      </Routes>
    </Router>
  );
}
 
export default App;



