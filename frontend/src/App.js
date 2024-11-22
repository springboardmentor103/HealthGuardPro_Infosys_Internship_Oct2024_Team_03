import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Verifycode from './pages/verifycode';

function App() {
  return (
      <Router>
          <div className="App">
            <Routes>
                <Route path="/verifycode" element={<Verifycode />} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;
