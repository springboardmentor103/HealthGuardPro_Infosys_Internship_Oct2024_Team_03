<<<<<<< HEAD
 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'; // Correct import for Login
import ForgotPassword from './pages/forgotpassword'; // Correct import for ForgotPassword

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}
 
export default App;
=======
import logo from './logo.svg';
import SignupPage from './pages/signup';


function App() {
  return (
    <div className="App">
     <SignupPage />
    
    </div>
  );
};

export default App;
>>>>>>> 997575d8282996cb5e28d42336e5a7fb4e1b6d01
