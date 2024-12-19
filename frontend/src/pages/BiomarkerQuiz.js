import React, { useState } from 'react';
import './BiomarkerQuiz.css';
import { Link } from 'react-router-dom';
import DashboardIcon from '../assets/icons/dashboard.svg';
import LeaderboardIcon from '../assets/icons/leaderboard.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import LogoutIcon from '../assets/icons/logout.svg';

function BiomarkerQuiz() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(null));
  const [isQuizComplete, setQuizComplete] = useState(false);

  const questions = [
    { question: 'What is your fasting blood glucose level?', options: ['< 70 mg/dL', '70-99 mg/dL', '> 99 mg/dL'], scores: [1, 2, 3] },
    { question: 'What is your total cholesterol level?', options: ['< 200 mg/dL', '200-239 mg/dL', '> 240 mg/dL'], scores: [1, 2, 3] },
    { question: 'What is your blood pressure range?', options: ['< 120/80 mmHg', '120/80 - 139/89 mmHg', '> 140/90 mmHg'], scores: [1, 2, 3] },
    { question: 'What is your body mass index (BMI)?', options: ['< 18.5', '18.5-24.9', '25 or more'], scores: [1, 2, 3] },
    { question: 'Do you monitor inflammation markers like CRP?', options: ['Yes', 'No'], scores: [2, 1] },
    { question: 'What is your average hemoglobin A1c?', options: ['< 5.7%', '5.7-6.4%', '> 6.4%'], scores: [2, 1, 0] },
    { question: 'Do you check your vitamin D levels regularly?', options: ['Yes', 'No'], scores: [2, 1] },
    { question: 'How is your liver function (e.g., ALT/AST)?', options: ['Normal', 'Slightly Elevated', 'High'], scores: [2, 1, 0] },
    { question: 'Do you know your omega-3 index?', options: ['Yes', 'No'], scores: [2, 1] },
    { question: 'Are your kidney markers (e.g., creatinine) in range?', options: ['Yes', 'No'], scores: [2, 1] },
  ];

  const handleAnswer = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = index;
    setAnswers(updatedAnswers);
  };

  const handleNavigation = (direction) => {
    if (direction === 'next' && answers[currentQuestion] !== null) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizComplete(true);
      }
    } else if (direction === 'prev') {
      setCurrentQuestion(Math.max(0, currentQuestion - 1));
    } else {
      alert('Please answer the question before proceeding.');
    }
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const calculateScore = () => answers.reduce((total, answer, index) => (answer !== null ? total + questions[index].scores[answer] : total), 0);

  return (
    <div className="quiz-container">
      {/* Hamburger Menu */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <ul>
          <SidebarItem to="/dashboard" icon={DashboardIcon} label="Dashboard" />
          <SidebarItem to="/leaderboard" icon={LeaderboardIcon} label="Leaderboard" />
          <SidebarItem to="/profile-p1" icon={ProfileIcon} label="Profile" />
          <SidebarItem to="/login" icon={LogoutIcon} label="Logout" />
        </ul>
      </aside>

      {/* Quiz Main Content */}
      <main className="quiz-content">
        {!isQuizComplete ? (
          <div className="quiz-body">
            <header className="quiz-header">
              <h1>Biomarker Quiz</h1>
            </header>

            {/* Progress Bar */}
            <ProgressBar currentQuestion={currentQuestion} totalQuestions={questions.length} />

            {/* Quiz Question and Options */}
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
                <button onClick={() => handleNavigation('prev')} disabled={currentQuestion === 0}>
                  Previous
                </button>
                <button onClick={() => handleNavigation('next')}>
                  {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <QuizResults score={calculateScore()} total={questions.length} />
        )}
      </main>
    </div>
  );
}

function SidebarItem({ to, icon, label }) {
  return (
    <li>
      <Link to={to} className="sidebar-item">
        <img src={icon} alt={label} className={`${label.toLowerCase()}-icon`} />
        <span className={`${label.toLowerCase()}-label`}>{label}</span>
      </Link>
    </li>
  );
}

function ProgressBar({ currentQuestion, totalQuestions }) {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}></div>
    </div>
  );
}

function QuizResults({ score, total }) {
  return (
    <div className="quiz-result">
      <h1>Quiz Completed!</h1>
      <p>Your Score: {score} / {total * 2}</p>
      <p>
        {score > total * 2.5
          ? 'Excellent! Your biomarker knowledge is great!'
          : 'Good effort! Keep learning about biomarkers.'}
      </p>
    </div>
  );
}

export default BiomarkerQuiz;
