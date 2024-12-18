import React, { useState } from 'react';
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
            <h1>Lifestyle Quiz</h1>
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

export default LifestyleQuiz