import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ViewScore.css';
import DashboardIcon from '../assets/icons/dashboard.svg';
import LeaderboardIcon from '../assets/icons/leaderboard.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import LogoutIcon from '../assets/icons/logout.svg';

function ViewScore() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const displayName = localStorage.getItem('firstName') || localStorage.getItem('username') || 'User';

  useEffect(() => {
    const fetchScoreHistory = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token || !userId) {
          navigate('/login');
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/fitness/scores/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (response.data?.success) {
          const groupedScores = groupScoresByTimestamp(response.data.data);
          setScoreHistory(groupedScores);
        }
      } catch (error) {
        console.error('Error fetching score history:', error);
        setError('Failed to load score history');
      } finally {
        setLoading(false);
      }
    };

    fetchScoreHistory();
  }, [userId, navigate]);

  const groupScoresByTimestamp = (scores) => {
    const grouped = {};
    scores.forEach(score => {
      const timestamp = new Date(score.timestamp).toISOString();
      if (!grouped[timestamp]) {
        grouped[timestamp] = {
          timestamp,
          scores: {},
          overallScore: 0
        };
      }
      grouped[timestamp].scores[score.category] = score.score;
    });

    return Object.values(grouped).map(group => {
      const scores = Object.values(group.scores);
      group.overallScore = scores.length > 0 
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) 
        : 0;
      return group;
    }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  const toggleExpandRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="view-score-container">
      <aside className={`view-sidebar ${isSidebarActive ? 'active' : ''}`}>
        <ul>
          <li>
            <Link to="/dashboard" className="view-sidebar-item">
              <img src={DashboardIcon} alt="Dashboard" className="dashboard-icon" />
              <span className="dashboard-label">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className="view-sidebar-item">
              <img src={LeaderboardIcon} alt="Leaderboard" className="leaderboard-icon" />
              <span className="leaderboard-label">Leaderboard</span>
            </Link>
          </li>
          <li>
            <Link to="/profile-p1" className="view-sidebar-item">
              <img src={ProfileIcon} alt="Profile" className="profile-icon" />
              <span className="profile-label">Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/login" className="view-sidebar-item">
              <img src={LogoutIcon} alt="Logout" className="logout-icon" />
              <span className="logout-label">Logout</span>
            </Link>
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="view-header">
          <div className="hamburger-menu" onClick={toggleSidebar}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h1 className="view-greeting">Hello, {displayName}</h1>
          <h2 className="view-title">HealthGuard Pro</h2>
        </header>

        <section className="view-scoreboard">
          <h3>Score History</h3>
          <table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Time</th>
                <th>Overall Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {scoreHistory.map((entry, index) => (
                <React.Fragment key={entry.timestamp}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{formatDate(entry.timestamp)}</td>
                    <td>{entry.overallScore}%</td>
                    <td>
                      <button onClick={() => toggleExpandRow(index)}>
                        {expandedRow === index ? 'Hide' : 'View'}
                      </button>
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <tr className="view-details-row">
                      <td colSpan="4">
                        <table className="view-details-table">
                          <tbody>
                            <tr>
                              <td>Physical Fitness</td>
                              <td>{entry.scores['Physical Fitness'] || '0'}%</td>
                              <td>Mental Well-being</td>
                              <td>{entry.scores['Mental Well-being'] || '0'}%</td>
                            </tr>
                            <tr>
                              <td>Nutrition</td>
                              <td>{entry.scores['Nutrition'] || '0'}%</td>
                              <td>Bio-markers</td>
                              <td>{entry.scores['Bio-markers'] || '0'}%</td>
                            </tr>
                            <tr>
                              <td>Lifestyle</td>
                              <td>{entry.scores['Lifestyle'] || '0'}%</td>
                              <td>Overall Score</td>
                              <td>{entry.overallScore}%</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default ViewScore;
