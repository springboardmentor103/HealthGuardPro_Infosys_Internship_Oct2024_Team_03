import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './dashboard.css';
import DashboardIcon from '../assets/icons/dashboard.svg';
import LeaderboardIcon from '../assets/icons/leaderboard.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import LogoutIcon from '../assets/icons/logout.svg';
import api from '../utils/axiosConfig';

function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [scores, setScores] = useState({});
  const [overallScore, setOverallScore] = useState("0");
  
  const userId = localStorage.getItem("userId");
  const displayName = localStorage.getItem("firstName") || localStorage.getItem("username") || "User";
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken || !userId) {
      navigate('/login');
      return;
    }
  }, [navigate, userId]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleTakeTest = (testRoute) => {
    navigate(testRoute);
  };

  const fetchScores = useCallback(async (category) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('No auth token found');
      }

      const response = await api.get(`/fitness/scores/${userId}`);
      
      if (response.data?.success) {
        // Filter scores by category and get the latest one
        const categoryScores = response.data.data.filter(score => score.category === category);
        const latestScore = categoryScores.length > 0 ? categoryScores[0].score : 0;
        return latestScore;
      }
      
      return 0;
    } catch (error) {
      console.error(`Error fetching scores for ${category}:`, error);
      if (error.response?.status === 401) {
        // Handle unauthorized error
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        navigate('/login');
      }
      return 0;
    }
  }, [userId, navigate]);

  // Fetch all scores and calculate overall score
  useEffect(() => {
    const categories = ['Physical Fitness', 'Nutrition', 'Lifestyle', 'Mental Well-being', 'Bio-markers'];
    
    const fetchAllScores = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          navigate('/login');
          return;
        }

        // Use the user-scores endpoint to get all scores at once
        const response = await api.get(`/fitness/user-scores/${userId}`);
        
        if (response.data?.success) {
          const { categoryScores, overallScore } = response.data.data;
          
          // Update scores state
          const scoreObj = {};
          categoryScores.forEach(score => {
            scoreObj[score._id] = score.latestScore;
          });
          setScores(scoreObj);
          
          // Update overall score
          setOverallScore(overallScore.toString());
        }
      } catch (error) {
        console.error('Error fetching all scores:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    if (userId) {
      fetchAllScores();
    }
  }, [userId, navigate]);

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
          <h1 className="greeting">Hello, {displayName}</h1>
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
                <td> <Link to="/ViewScore">
              <button>View</button>
            </Link></td>
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
