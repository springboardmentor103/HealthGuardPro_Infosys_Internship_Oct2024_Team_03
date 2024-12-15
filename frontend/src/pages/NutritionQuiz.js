import React, { useState } from "react";
import "./NutritionQuiz.css";
import DashboardIcon from "../assets/dashboard.svg";
import LeaderboardIcon from "../assets/leaderboard.svg";
import ProfileIcon from "../assets/profile.svg";
import LogoutIcon from "../assets/logout.svg";
import { Link } from 'react-router-dom';
const NutritionQuiz = () => {
  const questions = [
    { question: "How often do you eat fruits and vegetables?", options: ["Daily", "A few times a week", "Rarely", "Never"] },
    { question: "How many servings of whole grains do you consume each day?", options: ["3 or more servings", "1–2 servings", "Occasionally", "None"] },
    // Add the rest of the questions here...
    { question: "How many servings of whole grains (like brown rice, quinoa, oats) do you consume each day?", options: ["3 or more servings", "1–2 servings", "Occasionally", "None"] },   
      { question: "How often do you consume processed or fast foods (e.g., chips, burgers, pizza)?", options: ["Almost every day", "A few times a week", "Rarely", "Never"] },   
        { question: "Do you regularly drink sugary beverages (soda, energy drinks, sweetened coffee/tea)?", options: ["Yes, multiple times a day", "Occasionally, a few times a week", "Rarely", "Never"] },  
           { question: "How often do you include protein-rich foods in your meals (e.g., meat, fish, eggs, legumes)?", options: ["Every meal", "Once or twice a day", "Only occasionally", "Rarely or never"] },   
             { question: "How much water do you drink daily?", options: ["8 or more cups", "5–7 cups", "2–4 cups", "Less than 2 cups"] },   
               { question: "How often do you eat snacks between meals?", options: ["Frequently (multiple times a day)", "Sometimes (a few times a week)", "Rarely", "Never"] },    
                { question: "Do you pay attention to portion sizes during meals?", options: ["Always", "Often", "Occasionally", "Never"] },     
    { question: "How often do you consume dairy products or dairy alternatives (milk, cheese, yogurt)?", options: ["Daily", "A few times a week", "Rarely", "Never"] }, 
        { question: "Do you take any dietary supplements (vitamins, minerals, etc.)?", options: ["Yes, regularly", "Occasionally", "No, but I plan to", "No, I don’t take any"] },   ];

  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState(Array(questions.length).fill(""));
  const [completed, setCompleted] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [error, setError] = useState("");

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleChange = (value) => {
    const updatedResponses = [...responses];
    updatedResponses[currentPage] = value;
    setResponses(updatedResponses);
    setError("");
  };

  const handleNext = () => {
    if (!responses[currentPage]) {
      setError("Please select an answer before proceeding.");
      return;
    }
    if (currentPage < questions.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
    
  };

  const progress = Math.round(((currentPage + 1) / questions.length) * 100);

  return (
    <div className="quiz-page-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarVisible ? 'active' : ''}`}>
  <ul>
    <li>
      <Link to="/dashboard" className="sidebar-item">
        <img src={DashboardIcon} alt="Dashboard" className="dashboard-icon" />
        <span className="dashboard-label">Dashboard</span>
      </Link>
    </li>
    <li>
      <Link to="/leaderboard" className="sidebar-item">
        <img src={LeaderboardIcon} alt="Leaderboard" className="leaderboard-icon" />
        <span className="leaderboard-label">Leaderboard</span>
      </Link>
    </li>
    <li>
      <Link to="/profile-p1" className="sidebar-item">
        <img src={ProfileIcon} alt="Profile" className="profile-icon" />
        <span className="profile-label">Profile</span>
      </Link>
    </li>
    <li>
      <Link to="/login" className="sidebar-item">
        <img src={LogoutIcon} alt="Logout" className="logout-icon" />
        <span className="logout-label">Logout</span>
      </Link>
    </li>
  </ul>
</aside>
      
      {/* Hamburger Icon */}
      <div className={`hamburger ${sidebarVisible ? "active" : ""}`} onClick={toggleSidebar}>
        &#9776; {/* Hamburger icon */}
      </div>

      {/* Quiz Content */}
      <div className={`quiz-content ${sidebarVisible ? "sidebar-visible" : ""}`}>
        <div className="quiz-background">
          {completed ? (
            <div className="completion-message">
              <h1>🎉 Thank You for Completing the Nutrition Quiz! 🎉</h1>
              <p>Your responses have been recorded!</p>
              <button className="score-btn" onClick={() => console.log(responses)}>
                View Responses in Console
              </button>
              <button className="restart-btn" onClick={() => window.location.reload()}>
                Restart Quiz
              </button>
            </div>
          ) : (
            <div className="question-page">
              <h1>Nutrition Quiz</h1>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="question-container">
                <p>
                  {currentPage + 1}. {questions[currentPage].question}
                  <span className="mandatory"> *</span>
                </p>
                {questions[currentPage].options.map((option, i) => (
                  <div key={i} className="option-wrapper">
                    <label htmlFor={`option-${i}`} className="option-label">
                      <input
                        type="radio"
                        id={`option-${i}`}
                        name={`question-${currentPage}`}
                        value={option}
                        checked={responses[currentPage] === option}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              {error && <p className="error-message">{error}</p>}
              <div className="navigation-buttons">
                {currentPage > 0 && (
                  <button className="previous-btn" onClick={handlePrevious}>
                    Previous
                  </button>
                )}
                <button className="next-btn" onClick={handleNext}>
                  {currentPage === questions.length - 1 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NutritionQuiz;
