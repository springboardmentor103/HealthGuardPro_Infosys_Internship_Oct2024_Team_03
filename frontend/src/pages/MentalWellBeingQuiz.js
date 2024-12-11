import React, { useState } from "react";
import './MentalWellBeingQuiz.css';
import DashboardIcon from "../assets/dashboard.svg";
import LeaderboardIcon from "../assets/leaderboard.svg";
import ProfileIcon from "../assets/profile.svg";
import LogoutIcon from "../assets/logout.svg";

const MentalWellBeingQuiz = () => {
  const questions = [
    {
      question: "How often do you feel optimistic about the future?",
      options: ["Always", "Often", "Occasionally", "Rarely", "Never"],
    },
    {
      question: "In the past week, how often have you felt overwhelmed or stressed?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "How often do you feel content with your life?",
      options: ["Always", "Most of the time", "Sometimes", "Rarely", "Never"],
    },
    {
      question: "How often do you feel lonely or disconnected from others?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "How well do you cope with setbacks or challenges?",
      options: ["Very well", "Well", "Sometimes", "Struggling", "Not at all"],
    },
    {
      question: "How often have you felt sad or down in the past month?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "How easily can you relax and unwind?",
      options: ["Always", "Most of the time", "Sometimes", "Rarely", "Never"],
    },
    {
      question: "Do you have a good balance between work, personal life, and rest?",
      options: ["Yes, always", "Mostly, but could improve", "Sometimes", "Rarely", "No, it's a struggle"],
    },
    {
      question: "How often do you feel anxious or worried about things you can't control?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question: "How often do you feel supported by friends, family, or colleagues?",
      options: ["Always", "Most of the time", "Sometimes", "Rarely", "Never"],
    },
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
    <div className={`mentalwellbeing-quiz-container ${sidebarVisible ? "sidebar-active" : ""}`}>
      <aside className={`sidebar ${sidebarVisible ? "active" : ""}`}>
        <ul>
          <li>
            <img src={DashboardIcon} alt="Dashboard" className="sidebar-icon" /> Dashboard
          </li>
          <li>
            <img src={LeaderboardIcon} alt="Leaderboard" className="sidebar-icon" /> Leaderboard
          </li>
          <li>
            <img src={ProfileIcon} alt="Profile" className="sidebar-icon" /> Profile
          </li>
          <li>
            <img src={LogoutIcon} alt="Logout" className="sidebar-icon" /> Logout
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
            <h1>Mental Well-Being Quiz</h1>
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

export default MentalWellBeingQuiz;
