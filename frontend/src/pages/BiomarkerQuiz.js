import React, { useState } from "react";
import './BiomarkerQuiz.css';
import DashboardIcon from "../assets/dashboard.svg";
import LeaderboardIcon from "../assets/leaderboard.svg";
import ProfileIcon from "../assets/profile.svg";
import LogoutIcon from "../assets/logout.svg";

const BiomarkerQuiz = () => {
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

  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState(Array(questions.length).fill(""));
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [error, setError] = useState("");

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
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
      alert("Quiz completed!"); // You can handle completion here
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const progress = Math.round(((currentPage + 1) / questions.length) * 100);

  return (
    <div className="quiz-page-container">
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
      <div className="hamburger" onClick={toggleSidebar}>
        &#9776;
      </div>

      <div className="biomarker-quiz-container">
        <div className="question-page">
          <h1>Biomarker Quiz</h1>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          {currentPage === questions.length ? (
            <div className="completion-message">
              <h2>🎉 Thank You! 🎉</h2>
              <p>You have successfully completed the quiz.</p>
              <button className="score-btn" onClick={() => console.log(responses)}>
                View Responses in Console
              </button>
            </div>
          ) : (
            <>
              <div className="question-container">
                <p>
                  {currentPage + 1}. {questions[currentPage].question}
                </p>
                {questions[currentPage].options.map((option, i) => (
                  <div key={i} className="option-wrapper">
                    <label className="option-label">
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
              {error && <p className="error-message">{error}</p>}
              <div className="navigation-buttons">
                {currentPage > 0 && (
                  <button type="button" className="previous-btn" onClick={handlePrevious}>
                    Previous
                  </button>
                )}
                <button type="button" className="next-btn" onClick={handleNext}>
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
