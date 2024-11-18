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
=======
import React from "react";
import SetPassword from "./pages/SetPassword"; 
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <SetPassword />
    </div>
  );
};
>>>>>>> 271cdcd5571d715491820fb39f49f780115cad41

export default App;
