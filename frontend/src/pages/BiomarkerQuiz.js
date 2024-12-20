import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BiomarkerQuiz.css";
import DashboardIcon from '../assets/icons/dashboard.svg';
import LeaderboardIcon from '../assets/icons/leaderboard.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import LogoutIcon from '../assets/icons/logout.svg';;

const BiomarkerQuiz = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const navigate = useNavigate();

  const questions = [
    { question: "Have you had a cholesterol test in the past year?", options: ["Yes", "No", "Unsure"] },
    { question: "What is your current blood pressure reading?", options: ["Normal (under 120/80 mmHg)", "Elevated (120-129/under 80 mmHg)", "Stage 1 Hypertension (130-139/80-89 mmHg)", "Stage 2 Hypertension (140+/90+ mmHg)"] },
    { question: "When did you last have a blood sugar (glucose) test?", options: ["Within the last 6 months", "Within the last year", "1–2 years ago", "Never"] },
    { question: "Do you know your current body mass index (BMI)?", options: ["Yes", "No", "I don't track it regularly"] },
    { question: "Have you had a C-reactive protein (CRP) test for inflammation?", options: ["Yes, recently", "Yes, long ago", "No, never"] },
    { question: "How does your current weight compare to last year?", options: ["I’ve lost weight", "I’ve gained weight", "It’s remained stable"] },
    { question: "Do you regularly monitor your resting heart rate?", options: ["Yes", "Occasionally", "No"] },
    { question: "Have you had your vitamin D levels checked in the last 6 months?", options: ["Yes", "No", "Unsure"] },
    { question: "When was your last liver function test (ALT/AST)?", options: ["Within the past year", "1–2 years ago", "More than 2 years ago", "Never"] },
    { question: "Have you undergone genetic testing or family health screenings for inherited risks?", options: ["Yes, recently", "Yes, in the past", "No, but I plan to", "No"] },
  ];

  const scoring = {
    "Yes": 4,
    "No": 1,
    "Unsure": 2,
    "Normal (under 120/80 mmHg)": 4,
    "Elevated (120-129/under 80 mmHg)": 3,
    "Stage 1 Hypertension (130-139/80-89 mmHg)": 2,
    "Stage 2 Hypertension (140+/90+ mmHg)": 1,
    "Within the last 6 months": 4,
    "Within the last year": 3,
    "1–2 years ago": 2,
    "Never": 1,
    "I’ve lost weight": 4,
    "I’ve gained weight": 2,
    "It’s remained stable": 3,
    "Occasionally": 2,
    "Yes, regularly": 4,
    "No, never": 1,
    "Yes, recently": 4,
    "Yes, long ago": 2,
    "I don't track it regularly": 2,
  };

  const calculateScore = () => {
    let totalPoints = 0;
    responses.forEach((response) => {
      totalPoints += scoring[response] || 0;
    });
    const maxPoints = questions.length * 4;
    return Math.round((totalPoints / maxPoints) * 100);
  };

  const handleChange = (option) => {
    const updatedResponses = [...responses];
    updatedResponses[currentPage] = option;
    setResponses(updatedResponses);
  };

  const handleNext = () => {
    if (!responses[currentPage]) {
      alert("Please select an option before proceeding.");
      return;
    }
    if (currentPage < questions.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleSubmit = async () => {
    const calculatedScore = calculateScore();
    setScore(calculatedScore);
    setCompleted(true);

    try {
      const userId = localStorage.getItem("userId");
      const username = localStorage.getItem("username");
      const email = localStorage.getItem("email");

      if (!userId || !username || !email) {
        alert("Missing user information. Please log in.");
        return;
      }

      await axios.post("http://localhost:5000/api/save-fitness-score", {
        userId,
        username,
        email,
        category: "Bio-markers",
        score: calculatedScore,
      });

      alert("Score saved successfully!");
    } catch (error) {
      console.error("Error saving score:", error);
      alert("Failed to save score. Please try again.");
    }
  };

  const progress = ((currentPage + 1) / questions.length) * 100;

  return (
    <div className="quiz-page-container">
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
      <div className="hamburger" onClick={toggleSidebar}>
        &#9776;
      </div>

      <div className="biomarker-quiz-container">
        <div className="question-page">
          <h1>Biomarker Quiz</h1>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          {completed ? (
            <div className="completion-message">
              <h2>🎉 Quiz Completed! 🎉</h2>
              <p>Your Score: {score}%</p>
              <button onClick={() => navigate("/dashboard")} className="score-btn">
                Go to Dashboard
              </button>
            </div>
          ) : (
            <>
              <p>{currentPage + 1}. {questions[currentPage].question}</p>
              {questions[currentPage].options.map((option, i) => (
                <label key={i} className="option-label">
                  <input
                    type="radio"
                    name={`question-${currentPage}`}
                    value={option}
                    checked={responses[currentPage] === option}
                    onChange={() => handleChange(option)}
                  />
                  {option}
                </label>
              ))}
              <div className="navigation-buttons">
                {currentPage > 0 && (
                  <button className="previous-btn" onClick={handlePrevious}>Previous</button>
                )}
                <button className="next-btn" onClick={handleNext}>
                  {currentPage === questions.length - 1 ? "Submit" : "Next"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiomarkerQuiz;



/* import React, { useState } from 'react';
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
      
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      
      <aside className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <ul>
          <SidebarItem to="/dashboard" icon={DashboardIcon} label="Dashboard" />
          <SidebarItem to="/leaderboard" icon={LeaderboardIcon} label="Leaderboard" />
          <SidebarItem to="/profile-p1" icon={ProfileIcon} label="Profile" />
          <SidebarItem to="/login" icon={LogoutIcon} label="Logout" />
        </ul>
      </aside>

      
      <main className="quiz-content">
        {!isQuizComplete ? (
          <div className="quiz-body">
            <header className="quiz-header">
              <h1>Biomarker Quiz</h1>
            </header>

            
            <ProgressBar currentQuestion={currentQuestion} totalQuestions={questions.length} />

            
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

export default BiomarkerQuiz; */
