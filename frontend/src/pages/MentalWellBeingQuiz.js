import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './MentalWellBeingQuiz.css';
import axios from "axios";
import DashboardIcon from "../assets/icons/dashboard.svg";
import LeaderboardIcon from "../assets/icons/leaderboard.svg";
import ProfileIcon from "../assets/icons/profile.svg";
import LogoutIcon from "../assets/icons/logout.svg";
 
const MentalWellBeingQuiz = () => {
 
      // const [isSidebarOpen, setSidebarOpen] = useState(false);
      const [currentPage, setCurrentPage] = useState(0);
      const [responses, setResponses] = useState([]);
      const [sidebarVisible, setSidebarVisible] = useState(false);
      const [error, setError] = useState("");
      const [completed, setCompleted] = useState(false);
      const [score, setScore] = useState(null);
 
      const toggleSidebar = () => {
        setSidebarVisible((prev) => !prev);
      };
 
      const navigate = useNavigate();

        // const toggleSidebar_1 = () => setSidebarOpen(!isSidebarOpen);
 
        const questions = [
          { question: "How often do you feel optimistic about the future?", options: ["Always", "Occasionally", "Rarely", "Never"] },
          { question: "In the past week, how often have you felt overwhelmed or stressed?", options: ["Never", "Rarely", "Often", "Always"] },
          { question: "How often do you feel content with your life?", options: ["Always", "Most of the time", "Sometimes", "Never"] },
          { question: "How often do you feel lonely or disconnected from others?", options: ["Never", "Rarely", "Sometimes", "Always"] },
          { question: "How well do you cope with setbacks or challenges?", options: ["Very well", "Well", "Struggling", "Not at all"] },
          { question: "How often have you felt sad or down in the past month?", options: ["Never", "Rarely", "Sometimes", "Always"] },
          { question: "How easily can you relax and unwind?", options: ["Always", "Most of the time", "Sometimes", "Never"] },
          { question: "Do you have a good balance between work, personal life, and rest?", options: ["Yes, always", "Mostly, but could improve", "Rarely", "No, it's a struggle"] },
          { question: "How often do you feel anxious or worried about things you can't control?", options: ["Never", "Sometimes", "Often", "Always"] },
          { question: "How often do you feel supported by friends, family, or colleagues?", options: ["Always", "Most of the time", "Sometimes", "Never"] },
        ];
 
        const scoring = {
          "Always": 5,
          "Often": 4,
          "Occasionally": 3,
          "Sometimes": 3,
          "Rarely": 2,
          "Never": 1,
          "Very well": 5,
          "Well": 4,
          "Struggling": 2,
          "Not at all": 1,
          "Yes, always": 5,
          "Mostly, but could improve": 4,
          "No, it's a struggle": 1,

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
          const calculatedScore = calculateScore();
          setScore(calculatedScore);
          setCompleted(true);
       
          try {
            const userId = localStorage.getItem("userId");
            const username = localStorage.getItem("username");
            const email = localStorage.getItem("email");
            const category = "Mental Well-being";
       
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


        const handleGoBack = () => {
          navigate("/dashboard");
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
          <div className="mentalwellbeing-quiz-container">
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
       
            <div className="mentalwellbeing-quiz-content">
              <div className="mentalwellbeing-quiz-body">
                {completed ? (
                  <div className="quiz-result">
                    <h1>Thank You! </h1>
                    <p>Your Score: {score}%</p>
                    <p>You have successfully completed the quiz.</p>
                    <button className="score-btn" onClick={handleGoBack}>Go Back</button>
                  </div>
                ) : (
                  <>
                    <div className="mentalwellbeing-quiz-header">
                      <h1>Mental Wellbeing Quiz</h1>
                      <div className="mentalwellbeing-progress-bar">
                        <div className="mentalwellbeing-progress" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                    <div className="mentalwellbeing-quiz-body-content">
                      <div className="mentalwellbeing-question">
                        {currentPage + 1}. {questions[currentPage].question}
                      </div>
                      <div className="mentalwellbeing-options">
                        {questions[currentPage].options.map((option, i) => (
                          <button
                            key={i}
                            className={`mentalwellbeing-option ${responses[currentPage] === option ? "selected" : ""}`}
                            onClick={() => handleChange(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {error && <p className="error-message">{error}</p>}
                    </div>
                    <div className="mentalwellbeing-quiz-footer">
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
       
export default MentalWellBeingQuiz;