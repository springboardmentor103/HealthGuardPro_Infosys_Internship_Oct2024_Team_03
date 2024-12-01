import React, { useState } from "react";
import "./profile-p2.css";
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
                <label className="label">Username</label>
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
              <button className="cancel-button">Cancel</button>
              <button className="save-button">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile2;
