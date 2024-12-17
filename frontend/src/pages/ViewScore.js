import React, { useState } from 'react';
import './ViewScore.css';
import DashboardIcon from '../assets/icons/dashboard.svg';
import LeaderboardIcon from '../assets/icons/leaderboard.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import LogoutIcon from '../assets/icons/logout.svg';
import { Link } from 'react-router-dom';
function ViewScore() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive(prevState => !prevState); // Toggle the sidebar state
  };

  return (
    <div className="view-score-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
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

      {/* Main Content */}
      <main className="view-main-content">
        <header className="header">
          <div className="hamburger-menu" onClick={toggleSidebar}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h1 className="greeting">Hello, user</h1>
          <h2 className="title">HealthGuard Pro</h2>
        </header>

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
              {/* First row */}
              <tr>
                <td>1</td>
                <td>date / time</td>
                <td>95%</td>
                <td><button>View</button></td>
              </tr>
              {/* Score Details Section */}
              <tr className="details-row">
                <td colSpan="4">
                  <section className="details">
                    <table className="details-table">
                      <tbody>
                        <tr>
                          <td>Physical fitness</td>
                          <td>80%</td>
                          <td>Mental well-being</td>
                          <td>65%</td>
                        </tr>
                        <tr>
                          <td>Nutrition</td>
                          <td>60%</td>
                          <td>Bio-markers</td>
                          <td>80%</td>
                        </tr>
                        <tr>
                          <td>Lifestyle</td>
                          <td>70%</td>
                          <td>Overall score</td>
                          <td>95%</td>
                        </tr>
                      </tbody>
                    </table>
                  </section>
                </td>
              </tr>
              {/* Second row */}
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

export default ViewScore;
