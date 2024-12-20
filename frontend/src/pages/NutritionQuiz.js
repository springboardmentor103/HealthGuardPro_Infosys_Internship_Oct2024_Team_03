import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API connectivity
import "./NutritionQuiz.css";
import DashboardIcon from '../assets/icons/dashboard.svg';
import LeaderboardIcon from '../assets/icons/leaderboard.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import LogoutIcon from '../assets/icons/logout.svg';

const NutritionQuiz = () => {
  const navigate = useNavigate();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const questions = [
    { question: "How often do you eat fruits and vegetables?", options: ["Daily", "A few times a week", "Rarely", "Never"] },
    { question: "How many servings of whole grains do you consume each day?", options: ["3 or more servings", "1–2 servings", "Occasionally", "None"] },
    { question: "How often do you consume processed or fast foods?", options: ["Almost every day", "A few times a week", "Rarely", "Never"] },
    { question: "Do you regularly drink sugary beverages?", options: ["Yes, multiple times a day", "Occasionally", "Rarely", "Never"] },
    { question: "How often do you include protein-rich foods in your meals?", options: ["Every meal", "Once or twice a day", "Only occasionally", "Rarely or never"] },
    { question: "How much water do you drink daily?", options: ["8 or more cups", "5–7 cups", "2–4 cups", "Less than 2 cups"] },
    { question: "How often do you eat snacks between meals?", options: ["Frequently", "Sometimes", "Rarely", "Never"] },
    { question: "Do you pay attention to portion sizes during meals?", options: ["Always", "Often", "Occasionally", "Never"] },
    { question: "How often do you consume dairy products or alternatives?", options: ["Daily", "A few times a week", "Rarely", "Never"] },
    { question: "Do you take any dietary supplements?", options: ["Yes, regularly", "Occasionally", "No, but I plan to", "No, I don’t take any"] },
  ];

  const scoring = {
    "Daily": 4,
    "3 or more servings": 4,
    "A few times a week": 3,
    "1–2 servings": 3,
    "Occasionally": 2,
    "Rarely": 2,
    "None": 1,
    "Almost every day": 1,
    "Yes, multiple times a day": 1,
    "Sometimes": 3,
    "Never": 4,
    "Every meal": 4,
    "Once or twice a day": 3,
    "Frequently": 1,
    "5–7 cups": 3,
    "2–4 cups": 2,
    "Less than 2 cups": 1,
    "Always": 4,
    "Often": 3,
    "Only occasionally": 2,
    "Rarely or never": 1,
    "Yes, regularly": 4,
    "Occasionally": 3,
    "No, but I plan to": 2,
    "No, I don’t take any": 1,
  };

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  const handleChange = (option) => {
    const newResponses = [...responses];
    newResponses[currentPage] = option;
    setResponses(newResponses);
  };

  const calculateScore = () => {
    let totalPoints = 0;
    responses.forEach((response) => {
      totalPoints += scoring[response] || 0; // Add score if it matches, default 0 otherwise
    });
    const maxPoints = questions.length * 4; // Max score (4 points per question)
    return Math.round((totalPoints / maxPoints) * 100); // Convert to percentage
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
      const category = "Nutrition"; // Example, you can use a dynamic category based on your application

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

  return (
    <div className="quiz">
      <div className="quiz-page-container">
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

        {/* Hamburger Icon */}
        <div className={`hamburger ${isSidebarOpen ? "active" : ""}`} onClick={toggleSidebar}>
          &#9776;
        </div>

        {/* Quiz Content */}
        <div className={`quiz-content ${isSidebarOpen ? "sidebar-visible" : ""}`}>
          {completed ? (
            <div className="completion-message">
              <h1>🎉 Thank You for Completing the Nutrition Quiz! 🎉</h1>
              <p>Your Score: {score}%</p>
              <button className="score-btn" onClick={handleGoBack}>
                Go Back to Dashboard
              </button>
            </div>
          ) : (
            <div className="question-page">
              <h1>Nutrition Quiz</h1>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${((currentPage + 1) / questions.length) * 100}%` }}></div>
              </div>
              <div className="question-container">
                <p>
                  {currentPage + 1}. {questions[currentPage].question}
                </p>
                {questions[currentPage].options.map((option, index) => (
                  <div key={index} className="option-wrapper">
                    <label>
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
                {currentPage === questions.length - 1 ? (
                  <button className="next-btn" onClick={handleSubmit}>
                    Submit
                  </button>
                ) : (
                  <button className="next-btn" onClick={() => setCurrentPage(currentPage + 1)}>
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NutritionQuiz;



/* import React, { useState } from 'react';
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
        {!isQuizComplete ? (
          <div className="quiz-body">
            <header className="quiz-header">
              <h1>Nutrition Quiz</h1>
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

export default NutritionQuiz; */
