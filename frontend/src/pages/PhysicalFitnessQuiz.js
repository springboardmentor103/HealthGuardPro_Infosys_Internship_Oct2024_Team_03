import React, { useState } from 'react';
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
      {/* Hamburger Menu for Mobile */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <div></div>
        <div></div>
        <div></div>
      </div>

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

      {/* Main Quiz Content */}
      <main className="quiz-content">
        <div className="quiz-body">
          <header className="quiz-header">
            <h1>Physical Fitness Quiz</h1>
          </header>
          
          {/* Progress Bar */}
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

export default PhysicalFitnessQuiz;

