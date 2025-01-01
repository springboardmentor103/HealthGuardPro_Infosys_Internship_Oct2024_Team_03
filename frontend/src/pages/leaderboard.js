import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from "../utils/axiosConfig";
import DashboardIcon from '../assets/icons/dashboard.svg';
import LeaderboardIcon from '../assets/icons/leaderboard.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import LogoutIcon from '../assets/icons/logout.svg';
import './leaderboard.css';
import './dashboard.css';


const Leaderboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUsername = localStorage.getItem("username");

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('/user/leaderboard');
      console.log(data);

      setLeaderboardData(data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch leaderboard data');
      console.error('Error fetching leaderboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const currentUserData = leaderboardData.find(user => user.username === currentUsername);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-flex">
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

        <main className="leaderboard-main">
          <button
            className="leaderboard-menu-button"
            onClick={toggleSidebar}
          >
            <span className="leaderboard-sr-only">Open menu</span>
            <svg className="leaderboard-menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16" />
            </svg>
          </button>

          <div className="leaderboard-header">
            <h1 className="leaderboard-title">Hello, {currentUsername}</h1>
            <h2 className="leaderboard-subtitle">HealthGuard Pro Leaderboard</h2>
          </div>

          {currentUserData && (
            <div className="leaderboard-user-card">
              <div className="leaderboard-user-content">
                <div className="leaderboard-user-info">
                  <div className="leaderboard-avatar">
                    <span>{currentUserData.username[0]}</span>
                  </div>
                  <div className="leaderboard-user-details">
                    <h3 className="leaderboard-user-name">{currentUserData.username}</h3>
                    <p className="leaderboard-user-rank">Rank #{currentUserData.ranking}</p>
                  </div>
                </div>
                <div className="leaderboard-user-score">
                  <p className="leaderboard-score-label">Overall Score</p>
                  <p className="leaderboard-score-value">{currentUserData.overallScore}</p>
                </div>
              </div>
            </div>
          )}

          <div className="leaderboard-table-container">
            <div className="leaderboard-table-header">
              <h3 className="leaderboard-table-title">Global Leaderboard</h3>
            </div>

            {isLoading ? (
              <div className="leaderboard-loading">Loading leaderboard data...</div>
            ) : error ? (
              <div className="leaderboard-error">{error}</div>
            ) : (
              <div className="leaderboard-table-wrapper">
                <table className="leaderboard-table">
                  <thead>
                    <tr>
                      <th className="leaderboard-th">Rank</th>
                      <th className="leaderboard-th">User</th>
                      <th className="leaderboard-th">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      key={currentUserData.username}
                      className={`leaderboard-tr ${currentUserData.username === currentUsername ? 'current-user' : ''
                        }`}
                    >
                      <td className="leaderboard-td">#{currentUserData.ranking}</td>
                      <td className="leaderboard-td">
                        {currentUserData.username}
                        {currentUserData.username === currentUsername && (
                          <span className="leaderboard-current-user-tag">(You)</span>
                        )}
                      </td>
                      <td className="leaderboard-td">{currentUserData.overallScore}</td>
                    </tr>

                    {leaderboardData.map((user) => {
                      if (user.username === currentUsername) {
                        return null;
                      }

                      return (<tr
                        key={user.username}
                        className={`leaderboard-tr ${user.username === currentUsername ? 'current-user' : ''
                          }`}
                      >
                        <td className="leaderboard-td">#{user.ranking}</td>
                        <td className="leaderboard-td">
                          {user.username}
                          {user.username === currentUsername && (
                            <span className="leaderboard-current-user-tag">(You)</span>
                          )}
                        </td>
                        <td className="leaderboard-td">{user.overallScore}</td>
                      </tr>)
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Leaderboard;