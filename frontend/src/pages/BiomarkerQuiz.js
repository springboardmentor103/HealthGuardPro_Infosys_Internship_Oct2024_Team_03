import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './BiomarkerQuiz.css';
import axios from "axios";
import DashboardIcon from "../assets/icons/dashboard.svg";
import LeaderboardIcon from "../assets/icons/leaderboard.svg";
import ProfileIcon from "../assets/icons/profile.svg";
import LogoutIcon from "../assets/icons/logout.svg";
 
const BiomarkerQuiz = () => {

  // const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(null);

   
  // const toggleSidebar_1 = () => setSidebarOpen(!isSidebarOpen);
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



  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
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
 
  const progress = Math.round(((currentPage + 1) / questions.length) * 100);
 
  return (
    <div className="biomarker-quiz-container">
      <aside className={`sidebar ${sidebarVisible ? "active" : ""}`}>
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
 
      <div className="biomarker-quiz-content">
        <div className="biomarker-quiz-body">
          {completed ? (
            <div className="quiz-result">
              <h1> Thank You!</h1>
              <p>Your Score: {score}%</p>
              <p>You have successfully completed the quiz.</p>
              <button onClick={() => navigate("/dashboard")} className="score-btn">
                View Responses in Console
              </button>
            </div>
          ) : (
            <>
              <div className="biomarker-quiz-header">
                <h1>Biomarker Quiz</h1>
                <div className="biomarker-progress-bar">
                  <div className="biomarker-progress" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              <div className="biomarker-quiz-body-content">
                <div className="biomarker-question">
                  {currentPage + 1}. {questions[currentPage].question}
                </div>
                <div className="biomarker-options">
                  {questions[currentPage].options.map((option, i) => (
                    <button
                      key={i}
                      className={`biomarker-option ${responses[currentPage] === option ? "selected" : ""}`}
                      onClick={() => handleChange(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {error && <p className="error-message">{error}</p>}
              </div>
              <div className="biomarker-quiz-footer">
                {currentPage > 0 && (
                  <button onClick={handlePrevious}>Previous</button>
                )}
                <button onClick={handleNext}>
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