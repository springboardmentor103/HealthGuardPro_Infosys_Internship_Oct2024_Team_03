import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LifestyleQuiz.css';
import DashboardIcon from '../assets/icons/dashboard.svg';
import LeaderboardIcon from '../assets/icons/leaderboard.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import LogoutIcon from '../assets/icons/logout.svg';

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

  const scoring = {
    "Daily": 4, "3-4 times a week": 3, "1-2 times a week": 2, "Rarely or never": 1,
    "8+ cups": 4, "5-7 cups": 3, "2-4 cups": 2, "Less than 2 cups": 1,
    "8+ hours": 4, "6-8 hours": 3, "4-6 hours": 2, "Less than 4 hours": 1,
    "Mostly cook at home": 4, "A mix of both": 3, "Mostly eat out": 2, "Rarely cook at home": 1,
    "Every day": 4, "Several times a week": 3, "Occasionally": 2, "Rarely or never": 1,
    "Regularly": 4, "Occasionally": 3, "Rarely": 2, "Never": 1,
    "Very often": 4, "A few times a week": 3, "Occasionally": 2, "Rarely or never": 1,
    "Well balanced": 4, "Fairly balanced": 3, "Poorly balanced": 2, "No balance": 1,
    "Very often": 4, "Occasionally": 3, "Rarely": 2, "Never": 1,
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(null);

  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleGoBack = () => {
    navigate('/dashboard');
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
    const maxPoints = questions.length * 4;
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
      const userId = localStorage.getItem('userId');
      const username = localStorage.getItem('username');
      const email = localStorage.getItem('email');
      const category = "Lifestyle";

      if (!userId || !username || !email) {
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

      alert("Score saved successfully!");
    } catch (error) {
      console.error("Error saving score:", error);
      alert("Failed to save score. Please try again.");
    }
  };

  const handleNext = () => {
    if (!responses[currentPage]) {
      alert("Please select an answer before proceeding.");
      return;
    }
    if (currentPage < questions.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const progress = ((currentPage + 1) / questions.length) * 100;

  return (
    <div className={`lifestyle-quiz-container ${isSidebarOpen ? "sidebar-active" : ""}`}>
      <aside className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <ul>
          <li><img src={DashboardIcon} alt="Dashboard" className="sidebar-icon" /> Dashboard</li>
          <li><img src={LeaderboardIcon} alt="Leaderboard" className="sidebar-icon" /> Leaderboard</li>
          <li><img src={ProfileIcon} alt="Profile" className="sidebar-icon" /> Profile</li>
          <li><img src={LogoutIcon} alt="Logout" className="sidebar-icon" /> Logout</li>
        </ul>
      </aside>

      <div className="hamburger" onClick={toggleSidebar}>
        &#9776;
      </div>

      <div className="quiz-container">
        {completed ? (
          <div className="completion-message">
            <h1>🎉 Thank You! 🎉</h1>
            <p>You have successfully completed the Lifestyle Quiz!</p>
            <p>Your score is: {score}%</p>
            <button className="previous-btn" onClick={handleGoBack}>Back to Dashboard</button>
          </div>
        ) : (
          <div className="question-page">
            <h1>Lifestyle Quiz</h1>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="question-container">
              <p>{currentPage + 1}. {questions[currentPage].question}<span className="mandatory"> *</span></p>
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
              {currentPage > 0 && <button className="previous-btn" onClick={handlePrevious}>Previous</button>}
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

export default LifestyleQuiz;



/* import React, { useState } from 'react';
import './LifestyleQuiz.css';
import DashboardIcon from '../assets/icons/dashboard.svg';
import LeaderboardIcon from '../assets/icons/leaderboard.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import LogoutIcon from '../assets/icons/logout.svg';
import { Link } from 'react-router-dom';


function LifestyleQuiz() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(null));
  

  const questions = [
    { question: 'How many hours do you sleep on average daily?', options: ['< 6 hours', '6-8 hours', '> 8 hours'] },
    { question: 'Do you smoke or consume alcohol?', options: ['Yes, frequently', 'Occasionally', 'No'] },
    { question: 'How balanced is your diet?', options: ['Poor', 'Moderate', 'Healthy'] },
    { question: 'How much water do you drink daily?', options: ['< 1 liter', '1-2 liters', '> 2 liters'] },
    { question: 'Do you take time to relax or meditate?', options: ['Never', 'Sometimes', 'Regularly'] },
    { question: 'How often do you eat junk food?', options: ['Frequently', 'Occasionally', 'Rarely'] },
    { question: 'Do you maintain a consistent daily routine?', options: ['No', 'Somewhat', 'Yes'] },
    { question: 'How do you rate your work-life balance?', options: ['Poor', 'Neutral', 'Good'] },
    { question: 'Do you engage in any hobbies or leisure activities?', options: ['No', 'Sometimes', 'Regularly'] },
    { question: 'How satisfied are you with your current lifestyle?', options: ['Not satisfied', 'Neutral', 'Very satisfied'] },
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
            <h1>Lifestyle Quiz</h1>
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

export default LifestyleQuiz ; */