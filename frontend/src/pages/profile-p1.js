import React from "react";
import "./profile-p1.css";
import DashboardIcon from "../assets/icons/dashboard.svg";
import LeaderboardIcon from "../assets/icons/leaderboard.svg";
import ProfileIcon from "../assets/icons/profile.svg";
import LogoutIcon from "../assets/icons/logout.svg";
import ProfileIconi from "../assets/icons/profile i.svg";

function Profile() {
  return (
    <div className="main-container">
      {/* Sidebar */}
      <aside className="sidebar">
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

      {/* Main Content */}
      <div className="content">
        {/* Header */}
        <div className="header">
          <span className="greeting">Hello, user</span>
          <span className="title">HealthGuard Pro</span>
        </div>

        {/* Profile Card */}
        <div className="profile-container">
          <div className="profile-card">
            {/* Circular Profile Icon */}
            <div className="profile-image-container">
              <img src={ProfileIconi} alt="Profile Icon" className="profile-icon" />
            </div>
            <div className="profile-details">
              <div className="profile-row">
                <span className="label">Username</span>
                <span className="value">Priya</span>
              </div>
              <div className="profile-row">
                <span className="label">Email</span>
                <span className="value">priya@gmail.com</span>
              </div>
              <div className="profile-row">
                <span className="label">Rank</span>
                <span className="value">1234th</span>
              </div>
              <div className="profile-row">
                <span className="label">Points</span>
                <span className="value">635</span>
              </div>
            </div>
            <button className="edit-button">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
