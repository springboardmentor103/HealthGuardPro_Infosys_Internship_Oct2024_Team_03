import React, { useState } from "react";
import "./PhysicalFitnessQuiz.css";
import DashboardIcon from "../assets/dashboard.svg";
import LeaderboardIcon from "../assets/leaderboard.svg";
import ProfileIcon from "../assets/profile.svg";
import LogoutIcon from "../assets/logout.svg";
import { Link } from 'react-router-dom';
const PhysicalFitnessQuiz = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState([]);
  const [completed, setCompleted] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const questions = [
    // Add your question objects here (truncated for brevity)
    {
        question: "How often do you exercise each week?",
        options: [
            "5 or more days",
            "3–4 days",
            "1–2 days",
            "Rarely or never"
        ]
    },
    // Other questions...
    {
        question: "How often do you exercise each week?",
        options: [
            "5 or more days",
            "3–4 days",
            "1–2 days",
            "Rarely or never"
        ]
    },
    {
        question: "What types of exercises or activities do you usually do?",
        options: [
            "A mix of cardio, strength, and flexibility",
            "Mostly cardio (e.g., running, cycling)",
            "Mostly strength training (e.g., weights, bodyweight exercises)",
            "Minimal structured exercise, mostly daily activities"
        ]
    },
    {
        question: "How long can you sustain moderate activity, like jogging or cycling?",
        options: [
            "30 minutes or more",
            "15–30 minutes",
            "Less than 15 minutes",
            "I can’t sustain it without stopping"
        ]
    },
    {
        question: "How many push-ups or squats can you do in one set?",
        options: [
            "20 or more",
            "10–20",
            "Less than 10",
            "I can’t do them at all"
        ]
    },
    {
        question: "Can you comfortably perform stretches, like touching your toes?",
        options: [
            "Yes, with ease",
            "Yes, but with some difficulty",
            "Barely, or not fully",
            "No, I can’t reach at all"
        ]
    },
    {
        question: "Do you get breathless or tired during activities like climbing stairs?",
        options: [
            "Rarely or never",
            "Occasionally, but it’s manageable",
            "Frequently, with moderate difficulty",
            "Always, even with minimal effort"
        ]
    },
    {
        question: "What is your resting heart rate?",
        options: [
            "Below 60 beats per minute (bpm)",
            "60–80 bpm",
            "80–100 bpm",
            "Above 100 bpm (unsure or haven’t checked)"
        ]
    },
    {
        question: "How quickly do you recover after a workout?",
        options: [
            "Within a few minutes",
            "10–15 minutes",
            "15–30 minutes",
            "Longer than 30 minutes or still sore the next day"
        ]
    },
    {
        question: "How would you rate your daily energy levels?",
        options: [
            "High, with consistent energy all day",
            "Moderate, with occasional dips",
            "Low, often feeling tired",
            "Very low, struggling with fatigue most of the day"
        ]
    },
    {
        question: "Do you track your fitness, such as steps, heart rate, or workouts?",
        options: [
            "Yes, consistently",
            "Occasionally, when I remember",
            "Rarely or only during workouts",
            "No, I don’t track it at all"
        ]
    }
];

  const handleChange = (option) => {
    const newResponses = [...responses];
    newResponses[currentPage] = option;
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (responses[currentPage] !== undefined) {
      if (currentPage < questions.length - 1) {
        setCurrentPage(currentPage + 1);
      } else {
        setCompleted(true);
      }
    } else {
      alert("Please select an answer before proceeding.");
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }

    
  };

  const progress = ((currentPage + 1) / questions.length) * 100;

  return (
    <div className="quiz-page-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
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
        &#9776;
      </div>

      {/* Quiz Container */}
      <div className={`quiz-container ${isSidebarOpen ? "shifted" : ""}`}>
        <h2 className="quiz-heading">Physical Fitness Quiz</h2>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>
        {completed ? (
          <div className="completion-message">
            <h2>Quiz Completed!</h2>
            <p>Your responses have been recorded.</p>
            <button className="score-btn">View Score</button>
          </div>
        ) : (
          <div className="question-container">
            <h3>
              {questions[currentPage]?.question} <span className="asterisk">*</span>
            </h3>
            {questions[currentPage]?.options.map((option, index) => (
              <div className="option-wrapper" key={index}>
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="quiz-option"
                  value={option}
                  checked={responses[currentPage] === option}
                  onChange={() => handleChange(option)}
                />
                <label htmlFor={`option-${index}`}>{option}</label>
              </div>
            ))}
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
  );
};

export default PhysicalFitnessQuiz;
