import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./PhysicalFitnessQuiz.css";
import DashboardIcon from '../assets/icons/dashboard.svg';
import LeaderboardIcon from '../assets/icons/leaderboard.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import LogoutIcon from '../assets/icons/logout.svg';

const PhysicalFitnessQuiz = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setResponses] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const navigate = useNavigate();

  const questions = [
    { question: "How often do you exercise each week?", options: ["5 or more days", "3–4 days", "1–2 days", "Rarely or never"] },
    { question: "What types of exercises or activities do you usually do?", options: ["A mix of cardio, strength, and flexibility", "Mostly cardio", "Mostly strength training", "Minimal structured exercise"] },
    { question: "How long can you sustain moderate activity?", options: ["30 minutes or more", "15–30 minutes", "Less than 15 minutes", "I can’t sustain it without stopping"] },
    { question: "How often do you engage in stretching exercises?", options: ["Every day", "3-4 times a week", "1-2 times a week", "Never"] },
    { question: "Do you track your physical activity?", options: ["Yes, regularly", "Occasionally", "No, never", "I plan to start"] },
    { question: "Do you have any chronic conditions that affect your physical activity?", options: ["Yes", "No"] },
    { question: "How would you rate your overall fitness?", options: ["Excellent", "Good", "Fair", "Poor"] },
    { question: "How often do you engage in strength training?", options: ["3-4 times a week", "1-2 times a week", "Rarely", "Never"] },
    { question: "How much water do you typically drink per day?", options: ["3+ liters", "2-3 liters", "1-2 liters", "Less than 1 liter"] },
    { question: "Do you track your calories or nutrition?", options: ["Yes, regularly", "Occasionally", "No, never", "I plan to start"] },
  ];

  const scoring = {
    "5 or more days": 4,
    "3–4 days": 3,
    "1–2 days": 2,
    "Rarely or never": 1,
    "Every day": 4,
    "3-4 times a week": 3,
    "1-2 times a week": 2,
    "Never": 1,
    "Yes, regularly": 4,
    "Occasionally": 3,
    "No, never": 2,
    "I plan to start": 1,
    "Excellent": 4,
    "Good": 3,
    "Fair": 2,
    "Poor": 1,
    "3+ liters": 4,
    "2-3 liters": 3,
    "1-2 liters": 2,
    "Less than 1 liter": 1,
  };

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  const handleChange = (option) => {
    const newanswers = [...answers];
    newanswers[currentQuestion] = option;
    setResponses(newanswers);
  };

  const calculateScore = () => {
    let totalPoints = 0;
    answers.forEach((response) => {
      totalPoints += scoring[response] || 0; // Assign 0 if no matching score
    });
    const maxPoints = questions.length * 4; // Max score is 4 points per question
    return Math.round((totalPoints / maxPoints) * 100); // Convert to percentage
  };

  const handleSubmit = async () => {
    if (answers.includes(undefined)) {
      alert("Please answer all questions before submitting.");
      return;
    }
    const calculatedScore = calculateScore();
    setScore(calculatedScore);
    setCompleted(true);

    try {
      const userId = localStorage.getItem('userId');
      const username = localStorage.getItem('username');
      const email = localStorage.getItem('email');
      const category = "Physical Fitness"; // Example, you can use a dynamic category based on your application

      if (!userId || !username || !email || !category) {
        alert("Missing user information. Please log in.");
        return;
      }

      await axios.post('http://localhost:5000/api/save-fitness-score', {
        userId,
        username,
        email,
        category,
        score: calculatedScore,
      });

      alert('Score saved successfully!');
    } catch (error) {
      console.error("Error saving score:", error);
      alert('Failed to save score. Please try again.');
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz">
    <div className="quiz-page-container">
      <aside className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <ul>
          <li><img src={DashboardIcon} alt="Dashboard" className="sidebar-icon" /> Dashboard</li>
          <li><img src={LeaderboardIcon} alt="Leaderboard" className="sidebar-icon" /> Leaderboard</li>
          <li><img src={ProfileIcon} alt="Profile" className="sidebar-icon" /> Profile</li>
          <li><img src={LogoutIcon} alt="Logout" className="sidebar-icon" /> Logout</li>
        </ul>
      </aside>

      <div className="hamburger" onClick={toggleSidebar}>&#9776;</div>

      <div className={`quiz-container ${isSidebarOpen ? "shifted" : ""}`}>
        <h2 className="quiz-heading">Physical Fitness Quiz</h2>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>
        {completed ? (
          <div className="completion-message">
            <h2>Quiz Completed!</h2>
            <p>Your score: {score}%</p>
            <button className="score-btn" onClick={handleGoBack}>Go Back</button>
          </div>
        ) : (
          <div className="question-container">
            <h3>{questions[currentQuestion]?.question} <span className="asterisk">*</span></h3>
            {questions[currentQuestion]?.options.map((option, index) => (
              <div className="option-wrapper" key={index}>
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="quiz-option"
                  value={option}
                  checked={answers[currentQuestion] === option}
                  onChange={() => handleChange(option)}
                />
                <label htmlFor={`option-${index}`}>{option}</label>
              </div>
            ))}
            <div className="navigation-buttons">
              {currentQuestion > 0 && <button className="previous-btn" onClick={() => setCurrentQuestion(currentQuestion - 1)}>Previous</button>}
              {currentQuestion=== questions.length - 1
                ? <button className="next-btn" onClick={handleSubmit}>Submit</button>
                : <button className="next-btn" onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</button>
              }
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default PhysicalFitnessQuiz;


/* import React, { useState } from 'react';
import './PhysicalFitnessQuiz.css';
import DashboardIcon from '../assets/icons/dashboard.svg';
import LeaderboardIcon from '../assets/icons/leaderboard.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import LogoutIcon from '../assets/icons/logout.svg';
import { Link } from 'react-router-dom';


function PhysicalFitnessQuiz() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(null));

  const questions = [
    { question: 'What is your average daily step count?', options: ['< 5,000', '5,000 - 10,000', '> 10,000'] },
    { question: 'How often do you exercise weekly?', options: ['Never', '1-2 times', '3+ times'] },
    { question: 'Do you engage in strength training?', options: ['Yes', 'No'] },
    { question: 'How long are your exercise sessions on average?', options: ['< 30 mins', '30-60 mins', '> 60 mins'] },
    { question: 'Do you warm up before exercising?', options: ['Yes', 'No'] },
    { question: 'How often do you stretch?', options: ['Never', 'Sometimes', 'Regularly'] },
    { question: 'Do you track your fitness progress?', options: ['Yes', 'No'] },
    { question: 'What is your hydration level during exercise?', options: ['Low', 'Moderate', 'High'] },
    { question: 'Do you have a fitness goal?', options: ['Yes', 'No'] },
    { question: 'How satisfied are you with your fitness level?', options: ['Not satisfied', 'Neutral', 'Very satisfied'] },
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
            <h1>Physical Fitness Quiz</h1>
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

export default PhysicalFitnessQuiz; */

