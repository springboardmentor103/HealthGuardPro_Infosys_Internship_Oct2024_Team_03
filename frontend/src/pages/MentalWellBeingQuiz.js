import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MentalWellBeingQuiz.css";
import DashboardIcon from '../assets/icons/dashboard.svg';
import LeaderboardIcon from '../assets/icons/leaderboard.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import LogoutIcon from '../assets/icons/logout.svg';

const MentalWellBeingQuiz = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const navigate = useNavigate();

  const questions = [
    { question: "How often do you feel optimistic about the future?", options: ["Always", "Often", "Occasionally", "Rarely", "Never"] },
    { question: "In the past week, how often have you felt overwhelmed or stressed?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often do you feel content with your life?", options: ["Always", "Most of the time", "Sometimes", "Rarely", "Never"] },
    { question: "How often do you feel lonely or disconnected from others?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "How well do you cope with setbacks or challenges?", options: ["Very well", "Well", "Sometimes", "Struggling", "Not at all"] },
    { question: "How often have you felt sad or down in the past month?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "How easily can you relax and unwind?", options: ["Always", "Most of the time", "Sometimes", "Rarely", "Never"] },
    { question: "Do you have a good balance between work, personal life, and rest?", options: ["Yes, always", "Mostly, but could improve", "Sometimes", "Rarely", "No, it's a struggle"] },
    { question: "How often do you feel anxious or worried about things you can't control?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often do you feel supported by friends, family, or colleagues?", options: ["Always", "Most of the time", "Sometimes", "Rarely", "Never"] },
  ];

  const scoring = {
    "Always": 5,
    "Often": 4,
    "Occasionally": 3,
    "Sometimes": 3,
    "Rarely": 2,
    "Never": 1,
    "Very well": 5,
    "Well": 4,
    "Struggling": 2,
    "Not at all": 1,
    "Yes, always": 5,
    "Mostly, but could improve": 4,
    "No, it's a struggle": 1,
  };

  const handleChange = (option) => {
    const newResponses = [...responses];
    newResponses[currentPage] = option;
    setResponses(newResponses);
  };

  const calculateScore = () => {
    let totalPoints = 0;
    responses.forEach((response) => {
      totalPoints += scoring[response] || 0;
    });
    const maxPoints = questions.length * 5;
    return Math.round((totalPoints / maxPoints) * 100);
  };

  const handleSubmit = async () => {
    if (responses.includes(undefined)) {
      alert("Please answer all questions before submitting.");
      return;
    }
    const calculatedScore = calculateScore();
    setScore(calculatedScore);
    setCompleted(true);

    try {
      const userId = localStorage.getItem("userId");
      const username = localStorage.getItem("username");
      const email = localStorage.getItem("email");
      const category = "Mental Well-being";

      if (!userId || !username || !email || !category) {
        alert("Missing user information. Please log in.");
        return;
      }

      await axios.post("http://localhost:5000/api/save-fitness-score", {
        userId,
        username,
        email,
        category,
        score: calculatedScore,
      });

      alert("Score saved successfully!");
    } catch (error) {
      console.error("Error saving score:", error);
      alert("Failed to save score. Please try again.");
    }
  };

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  const progress = ((currentPage + 1) / questions.length) * 100;

  return (
    <div className={`mentalwellbeing-quiz-container ${isSidebarOpen ? "sidebar-active" : ""}`}>
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
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

      {/* Hamburger Menu */}
      <div className="hamburger" onClick={toggleSidebar}>
        &#9776;
      </div>

      {/* Quiz Section */}
      <div className="quiz-container">
        {completed ? (
          <div className="completion-message">
            <h1>🎉 Thank You! 🎉</h1>
            <p>You have successfully completed the Mental Well-Being Quiz!</p>
            <p>Your score: {score}%</p>
            <button className="score-btn" onClick={handleGoBack}>Go Back</button>
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
                      onChange={() => handleChange(option)}
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
            <div className="navigation-buttons">
              {currentPage > 0 && (
                <button className="previous-btn" onClick={() => setCurrentPage(currentPage - 1)}>
                  Previous
                </button>
              )}
              {currentPage < questions.length - 1 ? (
                <button className="next-btn" onClick={() => setCurrentPage(currentPage + 1)}>
                  Next
                </button>
              ) : (
                <button className="next-btn" onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentalWellBeingQuiz;



/* import React, { useState } from 'react';
import './MentalWellBeingQuiz.css';
import DashboardIcon from '../assets/icons/dashboard.svg';
import LeaderboardIcon from '../assets/icons/leaderboard.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import LogoutIcon from '../assets/icons/logout.svg';
import { Link } from 'react-router-dom';

function MentalWellBeingQuiz() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(null));

  const questions = [
    { question: 'How often do you feel stressed?', options: ['Rarely', 'Sometimes', 'Often'] },
    { question: 'Do you have a strong support network of family or friends?', options: ['No', 'Somewhat', 'Yes'] },
    { question: 'How often do you feel anxious or worried?', options: ['Rarely', 'Sometimes', 'Often'] },
    { question: 'How well do you manage your work-life balance?', options: ['Poorly', 'Moderately', 'Well'] },
    { question: 'How often do you practice mindfulness or meditation?', options: ['Never', 'Occasionally', 'Regularly'] },
    { question: 'How satisfied are you with your emotional well-being?', options: ['Not satisfied', 'Neutral', 'Very satisfied'] },
    { question: 'Do you feel optimistic about the future?', options: ['No', 'Sometimes', 'Yes'] },
    { question: 'How often do you take breaks to relax or recharge?', options: ['Rarely', 'Sometimes', 'Frequently'] },
    { question: 'Do you have hobbies or activities that help you relax?', options: ['No', 'A few', 'Yes, several'] },
    { question: 'How often do you laugh or experience joy?', options: ['Rarely', 'Sometimes', 'Often'] },
  ];

  const handleAnswer = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = index;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestion] !== null) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      alert('Please answer the question before proceeding.');
    }
  };

  const handlePrev = () => {
    setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="quiz-container">
      
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      
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

      
      <main className="quiz-content">
        <div className="quiz-body">
          <header className="quiz-header">
            <h1>Mental Wellbeing Quiz</h1>
          </header>

          
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          <div className="quiz-body-content">
            <h3 className="question">{questions[currentQuestion].question}</h3>
            <div className="options">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`option ${answers[currentQuestion] === index ? 'selected' : ''}`}
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="quiz-footer">
              <button onClick={handlePrev} disabled={currentQuestion === 0}>Previous</button>
              <button onClick={currentQuestion < questions.length - 1 ? handleNext : () => alert('Quiz Complete!')}>
                {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MentalWellBeingQuiz; */
