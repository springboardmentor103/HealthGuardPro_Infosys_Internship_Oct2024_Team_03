import React, { useState } from "react";
import "./profile-p2.css";
import { Link } from 'react-router-dom';
import DashboardIcon from "../assets/icons/dashboard.svg";
import LeaderboardIcon from "../assets/icons/leaderboard.svg";
import ProfileIcon from "../assets/icons/profile.svg";
import LogoutIcon from "../assets/icons/logout.svg";
import ProfileIconi from "../assets/icons/profile i.svg";

function Profile2() {
  const [username, setUsername] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="main-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
       
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

      {/* Hamburger Button */}
      <button className="hamburger" onClick={toggleSidebar}>
        &#9776;
      </button>

      {/* Main Content */}
      <div className="content">
        {/* Header */}
        <div className="header">
          <span className="greeting">Hello, user</span>
          <span className="title">HealthGuard Pro</span>
        </div>

        {/* Edit Profile Card */}
        <div className="edit-profile-container">
          <div className="edit-profile-card">
            {/* Profile Image */}
            <div className="profile-image-container">
              <img src={ProfileIconi} alt="Profile Icon" className="profile-icon" />
            </div>
            <div className="edit-profile-title">
              <h2>Edit Profile</h2>
            </div>
            <div className="edit-profile-details">
              <div className="edit-profile-row">
                <label className="edit-label">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field"
                  placeholder="Enter your new username"
                />
              </div>
            </div>
            <div className="edit-profile-buttons">
            <Link to="/profile-p1" className="cancel-button">
              <button type="button">Cancel</button>
            </Link>
            
            <Link to="/profile-p1" className="save-button">
              <button type="button">Save</button>
            </Link>
 </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile2;
