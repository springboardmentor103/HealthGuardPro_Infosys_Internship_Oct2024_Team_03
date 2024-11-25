import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Verifycode from './pages/verifycode';
import SetPassword from "./pages/Setpassword"

const App = () => {
  return (
      <Router>
          <div className="App">
            <Routes>
                <Route path="/verifycode" element={<Verifycode />} />
                <Route path="/setpassword" element={<SetPassword />} />
            </Routes>
        </div>
    </Router>
  );
};

export default App;
