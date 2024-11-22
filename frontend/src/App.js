import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SetPassword from "./pages/Setpassword"

const App = () => {
  return (
    <Router>
      <Routes>
        {/* SetPassword Route */}
        <Route path="/" element={<SetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
