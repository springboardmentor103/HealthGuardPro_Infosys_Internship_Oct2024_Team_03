import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NutritionQuiz.css";
import api from "../utils/axiosConfig";
import { getUserData } from '../utils/userUtils';
import DashboardIcon from "../assets/icons/dashboard.svg";
import LeaderboardIcon from "../assets/icons/leaderboard.svg";
import ProfileIcon from "../assets/icons/profile.svg";
import LogoutIcon from "../assets/icons/logout.svg";

const NutritionQuiz = () => {

  // const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(null);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };
  // const toggleSidebar_1 = () => setSidebarOpen(!isSidebarOpen);

  const questions = [
    { question: "How often do you eat fruits and vegetables?", options: ["Daily", "A few times a week", "Rarely", "Never"] },
    { question: "How many servings of whole grains do you consume each day?", options: ["3 or more servings", "1–2 servings", "Occasionally", "None"] },
    { question: "How many servings of whole grains (like brown rice, quinoa, oats) do you consume each day?", options: ["3 or more servings", "1–2 servings", "Occasionally", "None"] },
    { question: "How often do you consume processed or fast foods (e.g., chips, burgers, pizza)?", options: ["Almost every day", "A few times a week", "Rarely", "Never"] },
    { question: "Do you regularly drink sugary beverages (soda, energy drinks, sweetened coffee/tea)?", options: ["Yes, multiple times a day", "Occasionally, a few times a week", "Rarely", "Never"] },
    { question: "How often do you include protein-rich foods in your meals (e.g., Tofu, Lentils, Nuts)?", options: ["Every meal", "Once a day", "Rarely", "never"] },
    { question: "How much water do you drink daily??", options: ["8 or more cups", "2–5 cups", "Less than 2 cups", "I don't track"] },
    { question: "How often do you eat snacks between meals?", options: ["multiple times a day", "Sometimes", "Rarely", "Never"] },
    { question: "Do you pay attention to portion sizes during meals?", options: ["Yes,Always", "Often", "Rarely", "Never"] },
    { question: "How often do you consume dairy products or dairy alternatives (milk, cheese, yogurt)??", options: ["I am Lactose Intolerant", "A few times a week", "Rarely", "Daily"] },
  ];

  const scoring = {
    // Frequency
    "Daily": 4,
    "3 or more servings": 4,
    "A few times a week": 3,
    "1–2 servings": 3,
    "Sometimes": 2,
    "Rarely": 1,
    "None": 1,

    // Meal habits
    "Almost every day": 1,
    "Yes, multiple times a day": 1,
    "Never": 4,
    "Every meal": 4,
    "Once or twice a day": 3,
    "Frequently": 1,

    // Water intake
    "5–7 cups": 3,
    "2–4 cups": 2,
    "Less than 2 cups": 1,

    // Attention to diet
    "Always": 4,
    "Often": 3,
    "Only occasionally": 2,

    // Supplements
    "Yes, regularly": 4,
    "No, but I plan to": 2,
    "No, I don't take any": 1
  };

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  const calculateScore = () => {
    let totalPoints = 0;
    responses.forEach((response) => {
      totalPoints += scoring[response] || 0;
    });
    const maxPoints = questions.length * 4;
    return Math.round((totalPoints / maxPoints) * 100);
  };

  const handleChange = (value) => {
    const updatedResponses = [...responses];
    updatedResponses[currentPage] = value;
    setResponses(updatedResponses);
    setError("");
  };

  const handleNext = () => {
    if (!responses[currentPage]) {
      setError("Please select an answer before proceeding.");
      return;
    }
    if (currentPage < questions.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      alert("Quiz completed!");
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = async () => {
    if (responses.length < questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    try {
      const calculatedScore = calculateScore();
      const userData = getUserData();

      console.log('Submitting nutrition score:', {
        userId: userData.userId,
        category: "Nutrition",
        score: calculatedScore
      });

      const response = await api.post('/fitness/save-score', {
        userId: userData.userId,
        username: userData.username,
        email: userData.email,
        category: "Nutrition",
        score: calculatedScore
      });

      if (response.data.success) {
        setScore(calculatedScore);
        setCompleted(true);
        // alert('Score saved successfully!');
      } else {
        throw new Error(response.data.message || 'Failed to save score');
      }
    } catch (error) {
      console.error('Error saving score:', error);
      if (error.message === 'User data missing. Please log in again.') {
        alert('Please log in again to continue');
        navigate('/login');
        return;
      }
      alert(error.response?.data?.message || 'Failed to save score. Please try again.');
    }
  };

  const progress = Math.round(((currentPage + 1) / questions.length) * 100);

  return (
    <div className="nutrition-quiz-container">
      <aside className={`nutrition-sidebar ${sidebarVisible ? "active" : ""}`}>
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

      <div className="hamburger-menu" onClick={toggleSidebar}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="nutrition-quiz-content">
        <div className="nutrition-quiz-body">
          {completed ? (
            <div className="quiz-result">
              <h1> Thank You! </h1>
              <p>Your Score: {score}%</p>
              <p>You have successfully completed the quiz.</p>
              <button className="score-btn" onClick={handleGoBack}>
                Go Back to Dashboard </button>

            </div>
          ) : (
            <>
              <div className="nutrition-quiz-header">
                <h1>Nutrition Quiz</h1>
                <div className="nutrition-progress-bar">
                  <div className="nutrition-progress" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              <div className="nutrition-quiz-body-content">
                <div className="nutrition-question">
                  {currentPage + 1}. {questions[currentPage].question}
                </div>
                <div className="nutrition-options">
                  {questions[currentPage].options.map((option, i) => (
                    <button
                      key={i}
                      className={`nutrition-option ${responses[currentPage] === option ? "selected" : ""}`}
                      onClick={() => handleChange(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {error && <p className="error-message">{error}</p>}
              </div>
              <div className="nutrition-quiz-footer">
                {currentPage > 0 && (
                  <button onClick={handlePrevious}>Previous</button>
                )}
                <button onClick={handleNext} className="next-button">
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


export default NutritionQuiz;
