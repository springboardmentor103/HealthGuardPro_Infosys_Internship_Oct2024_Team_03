import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './dashboard.css';
import DashboardIcon from '../assets/icons/dashboard.svg';
import LeaderboardIcon from '../assets/icons/leaderboard.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import LogoutIcon from '../assets/icons/logout.svg';
import axios from 'axios';

function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [scores, setScores] = useState({});
  const [overallScore, setOverallScore] = useState("0"); // State to hold the overall score
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleTakeTest = (testRoute) => {
    navigate(testRoute);
  };

  const fetchScores = useCallback(
    async (category) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/get-fitness-scores/${userId}/${category}`);
        const latestScore = response.data?.score || "0";
        console.log(`Latest score for ${category}:`, latestScore);
        return latestScore;
      } catch (error) {
        if (error.response?.status === 404) {
          console.warn(`No scores found for category: ${category}`);
          return "0";
        } else {
          console.error(`Error fetching scores for ${category}:`, error);
          return "0";
        }
      }
    },
    [userId]
  );

  // Fetch all scores and calculate overall score
  useEffect(() => {
    const categories = ['Physical Fitness', 'Nutrition', 'Lifestyle', 'Mental Well-being', 'Bio-markers'];

    const fetchAllScores = async () => {
      const scoresData = {};
      let totalScore = 0;

      for (const category of categories) {
        const score = await fetchScores(category);
        scoresData[category] = score;
        totalScore += parseFloat(score); // Accumulate scores
      }

      setScores(scoresData);
      const averageScore = (totalScore / 5).toFixed(2); // Divide by 5 to calculate overall score
      setOverallScore(averageScore); // Update overall score state
    };

    fetchAllScores();
  }, [fetchScores]);

  const testRoutes = {
    'Physical Fitness': '/physical-fitness',
    'Nutrition': '/nutrition',
    'Lifestyle': '/lifestyle',
    'Mental Well-being': '/mental-wellbeing',
    'Bio-markers': '/biomarkers',
  };

  return (
    <div className="dashboard-container">
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

      <main className="main-content">
        <header className="header">
          <h1 className="greeting">Hello, {username}</h1>
          <h2 className="title">HealthGuard Pro</h2>
        </header>

        <section className="cards-section">
          {Object.keys(testRoutes).map((category, index) => (
            <div className="card" key={index}>
              <h3>{category}</h3>
              <button onClick={() => handleTakeTest(testRoutes[category])}>Take test</button>
              <p>Your previous score was {scores[category] || 'Loading...'}%</p>
            </div>
          ))}

          {/* Overall Score Card */}
          <div className="card overall-score">
            <h3>Overall Score</h3>
            <h3> {overallScore}%</h3>
          </div>
        </section>


        <section className="scoreboard">
          <h3>Scoreboard</h3>
          <table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Time</th>
                <th>Score</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>date / time</td>
                <td>95%</td>
                <td><button>View</button></td>
              </tr>
              <tr>
                <td>2</td>
                <td>date / time</td>
                <td>90%</td>
                <td><button>View</button></td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
