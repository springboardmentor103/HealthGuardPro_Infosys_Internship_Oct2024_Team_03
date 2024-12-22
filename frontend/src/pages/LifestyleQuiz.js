import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './LifestyleQuiz.css';
import axios from "axios";
import DashboardIcon from "../assets/icons/dashboard.svg";
import LeaderboardIcon from "../assets/icons/leaderboard.svg";
import ProfileIcon from "../assets/icons/profile.svg";
import LogoutIcon from "../assets/icons/logout.svg";
 
const LifestyleQuiz = () => {
 
    // const [isSidebarOpen, setSidebarOpen] = useState(false);
      // const toggleSidebar_1 = () => setSidebarOpen(!isSidebarOpen);
 
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
     
  
      const handleGoBack = () => {
        navigate('/dashboard');
      };

      const handleChange = (value) => {
        const updatedResponses = [...responses];
        updatedResponses[currentPage] = value;
        setResponses(updatedResponses);
        setError("");
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
          const userId = localStorage.getItem("userId");
          const username = localStorage.getItem("username");
          const email = localStorage.getItem("email");
          const category = "Lifestyle";
     
          if (!userId || !username || !email) {
            alert("Missing user information. Please log in.");
            return;
          }
     
          await axios.post("http://localhost:5000/api/save-fitness-score", {
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
     
      const progress = Math.round(((currentPage + 1) / questions.length) * 100);
     
      return (
        <div className="lifestyle-quiz-container">
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
     
          <div className="lifestyle-quiz-content">
            <div className="lifestyle-quiz-body">
              {completed ? (
                <div className="quiz-result">
                  <h1>Thank You! </h1>
                  <p>Your Score: {score}%</p>
                  <p>You have successfully completed the quiz.</p>
                  <button className="previous-btn" onClick={handleGoBack}>Back to Dashboard</button>
                </div>
              ) : (
                <>
                  <div className="lifestyle-quiz-header">
                    <h1>Lifestyle Quiz</h1>
                    <div className="lifestyle-progress-bar">
                      <div className="lifestyle-progress" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                  <div className="lifestyle-quiz-body-content">
                    <div className="lifestyle-question">
                      {currentPage + 1}. {questions[currentPage].question}
                    </div>
                    <div className="lifestyle-options">
                      {questions[currentPage].options.map((option, i) => (
                        <button
                          key={i}
                          className={`lifestyle-option ${responses[currentPage] === option ? "selected" : ""}`}
                          onClick={() => handleChange(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {error && <p className="error-message">{error}</p>}
                  </div>
                  <div className="lifestyle-quiz-footer">
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
     
export default LifestyleQuiz;