import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./PhysicalFitnessQuiz.css";
import axios from "axios";
import DashboardIcon from "../assets/icons/dashboard.svg";
import LeaderboardIcon from "../assets/icons/leaderboard.svg";
import ProfileIcon from "../assets/icons/profile.svg";
import LogoutIcon from "../assets/icons/logout.svg";
 
const PhysicalFitnessQuiz = () => {
 
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
      { question: "How often do you exercise each week?", options: ["5 or more days","3–4 days", "1–2 days","Rarely or never"] },
      { question: "What types of exercises or activities do you usually do?", options: ["A mix of cardio, strength, and flexibility","Mostly cardio (e.g., running, cycling)","Mostly strength training (e.g., weights, bodyweight exercises)","Minimal structured exercise, mostly daily activities"] },
      { question: "How long can you sustain moderate activity, like jogging or cycling?", options: ["An hour, nearly","15–30 minutes","Less than 15 minutes","I can’t sustain it without stopping"] },
      { question: "How many push-ups or squats can you do in one set?", options: [ "20 or more", "10–20", "Less than 10","I can’t do them at all" ] },
      { question: "Can you comfortably perform stretches, like touching your toes?", options: ["Yes, with ease","Yes, but with some difficulty","Barely, or not fully", "No, I can’t reach at all"] },
      { question: "Do you get breathless or tired during activities like climbing stairs?", options: ["never", "Occasionally, but it’s manageable", "Frequently, with moderate difficulty","Always, even with minimal effort"] },
      { question: "What is your resting heart rate?", options: ["Below 60 beats per minute (bpm)","60–80 bpm", "80–100 bpm","Above 100 bpm (unsure / haven’t checked)"] },
      { question: "How quickly do you recover after a workout?", options: [ "Within a few minutes","10–15 minutes","30-60 minutes","still sore the next day"] },
      { question: "How would you rate your daily energy levels?", options: ["High, with consistent energy all day","Moderate, with occasional dips", "Low, often feeling tired","Very low, struggling with fatigue most of the day"] },
      { question: "Do you track your fitness, such as steps, heart rate, or workouts?", options: ["Yes, consistently","Occasionally, when I remember","only during workouts","No, I don’t track it at all"] },
    ];
 
    const scoring = {
      "5 or more days": 4,
      "3–4 days": 3,
      "1–2 days": 2,
      "Rarely or never": 1,
      "A mix of cardio, strength, and flexibility":4,
      "Mostly cardio (e.g., running, cycling)":3,
      "Mostly strength training (e.g., weights, bodyweight exercises)":2,
      "Minimal structured exercise, mostly daily activities":1,
      "An hour, nearly":4,
      "15–30 minutes":3,
      "Less than 15 minutes":2,
      "I can’t sustain it without stopping":1,
      "20 or more":4, 
      "10–20":3, 
      "Less than 10":2,
      "I can’t do them at all":1,
      "Yes, with ease":4,
      "Yes, but with some difficulty":3,
      "Barely, or not fully":2, 
      "No, I can’t reach at all":1,
      "never":4, 
      "Occasionally, but it’s manageable":3, 
      "Frequently, with moderate difficulty":2,
      "Always, even with minimal effort":1,
      "Below 60 beats per minute (bpm)":4,
      "60–80 bpm":3, 
      "80–100 bpm":2,
      "Above 100 bpm (unsure / haven’t checked)":1,
      "Within a few minutes":4,
      "10–15 minutes":3,
      "30-60 minutes":2,
      "still sore the next day":1,
      "High, with consistent energy all day":4,
      "Moderate, with occasional dips":3, 
      "Low, often feeling tired":2,
      "Very low, struggling with fatigue most of the day":1,
      "Yes, consistently":4,
      "Occasionally, when I remember":3,
      "only during workouts":2,
      "No, I don’t track it at all":1,
    };

    const handleGoBack = () => {
      navigate('/dashboard');
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
      const calculatedScore = calculateScore();
      setScore(calculatedScore);
      setCompleted(true);
   
      try {
        const userId = localStorage.getItem("userId");
        const username = localStorage.getItem("username");
        const email = localStorage.getItem("email");
        const category = "Physical Fitness"; 
   
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
   
    const progress = Math.round(((currentPage + 1) / questions.length) * 100);
   
    return (
      <div className="physical-quiz-container">
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
   
        <div className="physical-quiz-content">
          <div className="physical-quiz-body">
            {completed ? (
              <div className="quiz-result">
                <h1>Thank You!</h1>
                <p>Your Score: {score}%</p>
                <p>You have successfully completed the quiz.</p>
                <button className="score-btn" onClick={handleGoBack}>Go Back</button>
              </div>
            ) : (
              <>
                <div className="physical-quiz-header">
                  <h1>Physical Fitness Quiz</h1>
                  <div className="physical-progress-bar">
                    <div className="physical-progress" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
                <div className="physical-quiz-body-content">
                  <div className="physical-question">
                    {currentPage + 1}. {questions[currentPage].question}
                  </div>
                  <div className="physical-options">
                    {questions[currentPage].options.map((option, i) => (
                      <button
                        key={i}
                        className={`physical-option ${responses[currentPage] === option ? "selected" : ""}`}
                        onClick={() => handleChange(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {error && <p className="error-message">{error}</p>}
                </div>
                <div className="physical-quiz-footer">
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
   

export default PhysicalFitnessQuiz;