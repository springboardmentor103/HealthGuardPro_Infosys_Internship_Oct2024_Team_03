import React, { useState, useEffect } from 'react';
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

  // const fetchScores = useCallback(async (category) => {
  //   try {
  //     const authToken = localStorage.getItem('authToken');
  //     if (!authToken) {
  //       throw new Error('No auth token found');
  //     }

<<<<<<< HEAD
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
  
=======
  //     const response = await api.get(`/fitness/scores/${userId}`);

  //     if (response.data?.success) {
  //       // Filter scores by category and get the latest one
  //       const categoryScores = response.data.data.filter(score => score.category === category);
  //       const latestScore = categoryScores.length > 0 ? categoryScores[0].score : 0;
  //       return latestScore;
  //     }

  //     return 0;
  //   } catch (error) {
  //     console.error(`Error fetching scores for ${category}:`, error);
  //     if (error.response?.status === 401) {
  //       // Handle unauthorized error
  //       localStorage.removeItem('authToken');
  //       localStorage.removeItem('userId');
  //       navigate('/login');
  //     }
  //     return 0;
  //   }
  // }, [userId, navigate]);

  // Fetch all scores and calculate overall score
  useEffect(() => {
    // const categories = ['Physical Fitness', 'Nutrition', 'Lifestyle', 'Mental Well-being', 'Bio-markers'];

>>>>>>> develop
    const fetchAllScores = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          navigate('/login');
          return;
        }

        // Use the user-scores endpoint to get all scores at once
        const response = await api.get(`/fitness/user-scores/${userId}`);
<<<<<<< HEAD
  
        if (response.data?.success) {
          const { categoryScores, overallScore } = response.data.data;
  
=======

        if (response.data?.success) {
          const { categoryScores, overallScore } = response.data.data;

>>>>>>> develop
          // Update scores state
          const scoreObj = {};
          categoryScores.forEach(score => {
            scoreObj[score._id] = score.latestScore;
          });
          setScores(scoreObj);
<<<<<<< HEAD
  
=======

>>>>>>> develop
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

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      navigate('/login');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <aside className={`dashboard-sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <ul>
          <li>
            <Link to="/dashboard" className="dashboard-sidebar-item">
              <img src={DashboardIcon} alt="Dashboard" className="dashboard-icon" />
              <span className="dashboard-label">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className="dashboard-sidebar-item">
              <img src={LeaderboardIcon} alt="Leaderboard" className="leaderboard-icon" />
              <span className="leaderboard-label">Leaderboard</span>
            </Link>
          </li>
          <li>
            <Link to="/profile-p1" className="dashboard-sidebar-item">
              <img src={ProfileIcon} alt="Profile" className="profile-icon" />
              <span className="profile-label">Profile</span>
            </Link>
          </li>
          <li>
<<<<<<< HEAD
            <Link to="#" onClick={handleLogout} className="sidebar-item"> 
=======
            <Link to="/login" className="dashboard-sidebar-item">
>>>>>>> develop
              <img src={LogoutIcon} alt="Logout" className="logout-icon" />
              <span className="logout-label">Logout</span>
            </Link>
          </li>
        </ul>
      </aside>

      <main className="dashboard-main-content">
        <header className="dashboard-header">
          <h1 className="dashboard-greeting">Hello, {displayName}</h1>
          <h2 className="dashboard-title">HealthGuard Pro</h2>
        </header>

        <section className="dashboard-cards-section">
          {Object.keys(testRoutes).map((category, index) => (
            <div className="dashboard-card" key={index}>
              <h3>{category}</h3>
              <button onClick={() => handleTakeTest(testRoutes[category])}>Take test</button>
              <p>Your previous score was {scores[category] || '0'}%</p>
            </div>
          ))}

          {/* Overall Score Card */}
          <div className="dashboard-card overall-score">
            <h3>Overall Score</h3>
            <h3> {overallScore}%</h3>
          </div>
        </section>

<<<<<<< HEAD
        <section className="dashboard-scoreboard">
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
=======
        {/* Updated Score History Section */}
        <section className="dashboard-score-history">
          <div className="score-history-box">
            <p>View your score history and track your progress over time.</p>
            <Link to="/ViewScore">
              <button className="view-button">View</button>
            </Link>
          </div>
        </section>

        {/* Helpful Tips Section */}
        <section className="dashboard-tips-section">
          <h3>Helpful Tips for Your Health Journey</h3>
          <div className="tips-container">
            {[
              "Stay hydrated throughout the day to keep your body functioning properly.",
              "Eat a balanced diet with a variety of fruits, vegetables, and whole grains.",
              "Exercise regularly to improve cardiovascular health and strength.",
              "Get at least 7-8 hours of sleep to help your body recover and recharge.",
              "Manage stress through mindfulness practices like meditation or yoga."
            ].map((tip, index) => (
              <div
                className={`tip-box ${index === 0 || index === 2 || index === 4 ? 'blue' : ''}`}
                key={index}
              >
                <p>{tip}</p>
              </div>
            ))}
          </div>
>>>>>>> develop
        </section>
      </main>
    </div>
  );
}

export default Dashboard;