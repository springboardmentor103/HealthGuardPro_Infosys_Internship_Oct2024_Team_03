import React, { useState } from 'react';
import './NutritionQuiz.css';
import DashboardIcon from '../assets/icons/dashboard.svg';
import LeaderboardIcon from '../assets/icons/leaderboard.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import LogoutIcon from '../assets/icons/logout.svg';
import { Link } from 'react-router-dom';

function NutritionQuiz() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(null));
  const [isQuizComplete, setQuizComplete] = useState(false);

  const questions = [
    { question: 'How many servings of fruits and vegetables do you eat daily?', options: ['None', '1-2', '3 or more'], scores: [0, 1, 2] },
    { question: 'Do you consume whole grains daily?', options: ['No', 'Sometimes', 'Yes'], scores: [0, 1, 2] },
    { question: 'How often do you drink sugary beverages?', options: ['Rarely', 'Occasionally', 'Frequently'], scores: [2, 1, 0] },
    { question: 'Do you consume dairy or dairy alternatives?', options: ['No', 'Sometimes', 'Regularly'], scores: [0, 1, 2] },
    { question: 'How often do you include lean protein in your meals?', options: ['Rarely', 'Sometimes', 'Often'], scores: [0, 1, 2] },
    { question: 'How mindful are you about portion sizes?', options: ['Not mindful', 'Somewhat mindful', 'Very mindful'], scores: [0, 1, 2] },
    { question: 'Do you drink at least 8 cups of water daily?', options: ['No', 'Sometimes', 'Yes'], scores: [0, 1, 2] },
    { question: 'Do you include healthy fats (e.g., nuts, seeds, olive oil) in your diet?', options: ['No', 'Occasionally', 'Regularly'], scores: [0, 1, 2] },
    { question: 'How often do you eat processed or fast food?', options: ['Rarely', 'Occasionally', 'Frequently'], scores: [2, 1, 0] },
    { question: 'Are you satisfied with your overall diet quality?', options: ['Not satisfied', 'Neutral', 'Very satisfied'], scores: [0, 1, 2] },
  ];

  const handleAnswer = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = index;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestion] !== null) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setQuizComplete(true);
      }
    } else {
      alert('Please answer the question before proceeding.');
    }
  };

  const handlePrev = () => {
    setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const calculateScore = () => {
    return answers.reduce((total, answer, index) => {
      if (answer !== null) {
        return total + questions[index].scores[answer];
      }
      return total;
    }, 0);
  };

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
        {!isQuizComplete ? (
          <div className="quiz-body">
            <header className="quiz-header">
              <h1>Nutrition Quiz</h1>
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
                <button onClick={handleNext}>
                  {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="quiz-result">
            <h1>Quiz Completed!</h1>
            <p>Your Score: {calculateScore()} / {questions.length * 2}</p>
            <p>
              {calculateScore() > 15
                ? 'Excellent! Your dietary habits are commendable!'
                : 'Good effort! Consider improving some aspects of your diet.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default NutritionQuiz;
