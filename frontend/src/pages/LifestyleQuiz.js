import React, { useState } from "react";
import './LifestyleQuiz.css';
import DashboardIcon from "../assets/dashboard.svg";
import LeaderboardIcon from "../assets/leaderboard.svg";
import ProfileIcon from "../assets/profile.svg";
import LogoutIcon from "../assets/logout.svg";
import { Link } from 'react-router-dom';
const LifestyleQuiz = () => {
  const questions = [
    { question: "How often do you exercise each week?", options: ["Daily", "3-4 times a week", "1-2 times a week", "Rarely or never"] },
    { question: "How much water do you drink daily?", options: ["8+ cups", "5-7 cups", "2-4 cups", "Less than 2 cups"] },
    { question: "How many hours do you sleep each night, on average?", options: ["8+ hours", "6-8 hours", "4-6 hours", "Less than 4 hours"] },
    { question: "How often do you eat fruits or vegetables?", options: ["Daily", "A few times a week", "Occasionally", "Rarely or never"] },
    { question: "Do you primarily cook at home or eat out?", options: ["Mostly cook at home", "A mix of both", "Mostly eat out", "Rarely cook at home"] },
    { question: "How often do you spend time outdoors?", options: ["Every day", "Several times a week", "Occasionally", "Rarely or never"] },
    { question: "Do you practice relaxation techniques (e.g., meditation, deep breathing)?", options: ["Regularly", "Occasionally", "Rarely", "Never"] },
    { question: "How often do you socialize with family or friends?", options: ["Very often", "A few times a week", "Occasionally", "Rarely or never"] },
    { question: "How would you rate your work-life balance?", options: ["Well balanced", "Fairly balanced", "Poorly balanced", "No balance"] },
    { question: "How often do you engage in activities that bring you joy (e.g., hobbies, travel)?", options: ["Very often", "Occasionally", "Rarely", "Never"] },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState(Array(questions.length).fill(""));
  const [completed, setCompleted] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false); // State for sidebar visibility

  const handleChange = (value) => {
    const updatedResponses = [...responses];
    updatedResponses[currentPage] = value;
    setResponses(updatedResponses);
  };

  const handleNext = () => {
    if (!responses[currentPage]) {
      alert("Please select an answer before proceeding.");
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

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);

     
  };

  const progress = Math.round(((currentPage + 1) / questions.length) * 100);

  return (
    <div className={`lifestyle-quiz-container ${sidebarVisible ? "sidebar-active" : ""}`}>
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
      <div className="hamburger" onClick={toggleSidebar}>
        &#9776; {/* Hamburger icon */}
      </div>

      <div className="quiz-container">
        {completed ? (
          <div className="completion-message">
            <h1>🎉 Thank You! 🎉</h1>
            <p>You have successfully completed the Mental Well-Being Quiz!</p>
            <p>Your responses have been recorded.</p>
          </div>
        ) : (
          <div className="question-page">
            <h1>Lifestyle Quiz</h1>
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
                  <label className="option-label">
                    <input
                      type="radio"
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
            <div className="navigation-buttons">
              {currentPage > 0 && (
                <button
                  type="button"
                  className="previous-btn"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
              )}
              <button
                type="button"
                className="next-btn"
                onClick={handleNext}
              >
                {currentPage === questions.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LifestyleQuiz;
