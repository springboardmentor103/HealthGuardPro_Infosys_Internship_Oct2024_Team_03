import React, { useState } from "react";
import styles from "./profile-p1.module.css";  // Importing the CSS module
import { Link } from 'react-router-dom';
import DashboardIcon from "../assets/icons/dashboard.svg";
import LeaderboardIcon from "../assets/icons/leaderboard.svg";
import ProfileIcon from "../assets/icons/profile.svg";
import LogoutIcon from "../assets/icons/logout.svg";
import ProfileIconi from "../assets/icons/profile i.svg";

function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles["main-container"]}>  {/* Correct class reference */}
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
  <ul>
    <li>
      <Link to="/dashboard" className={styles["sidebar-item"]}>
        <img src={DashboardIcon} alt="Dashboard" className={styles["slidebar-icon"]} />
        <span className={styles["icon-label"]}>Dashboard</span>
      </Link>
    </li>
    <li>
      <Link to="/leaderboard" className={styles["sidebar-item"]}>
        <img src={LeaderboardIcon} alt="Leaderboard" className={styles["slidebar-icon"]} />
        <span className={styles["icon-label"]}>Leaderboard</span>
      </Link>
    </li>
    <li>
      <Link to="/profile-p1" className={styles["sidebar-item"]}>
        <img src={ProfileIcon} alt="Profile" className={styles["slidebar-icon"]} />
        <span className={styles["icon-label"]}>Profile</span>
      </Link>
    </li>
    <li>
      <Link to="/login" className={styles["sidebar-item"]}>
        <img src={LogoutIcon} alt="Logout" className={styles["slidebar-icon"]} />
        <span className={styles["icon-label"]}>Logout</span>
      </Link>
    </li>
  </ul>
</aside>


      {/* Hamburger Button */}
      <button className={styles.hamburger} onClick={toggleSidebar}>
        ☰
      </button>

      {/* Main Content */}
      <div className={`${styles.content} ${isSidebarOpen ? styles["content-overlay"] : ""}`}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.greeting}>Hello, user</span>
          <span className={styles.title}>HealthGuard Pro</span>
        </div>

        {/* Profile Card */}
        <div className={styles["profile-container"]}>
          <div className={styles["profile-card"]}>
            {/* Circular Profile Icon */}
            <div className={styles["profile-image-container"]}>
              <img src={ProfileIconi} alt="Profile Icon" className={styles["profile-icon"]} />
            </div>
            <div className={styles["profile-details"]}>
              <div className={styles["profile-row"]}>
                <span className={styles.label}>Username</span>
                <span className={styles.value}>Priya</span>
              </div>
              <div className={styles["profile-row"]}>
                <span className={styles.label}>Email</span>
                <span className={styles.value}>priya@gmail.com</span>
              </div>
              <div className={styles["profile-row"]}>
                <span className={styles.label}>Rank</span>
                <span className={styles.value}>1234th</span>
              </div>
              <div className={styles["profile-row"]}>
                <span className={styles.label}>Points</span>
                <span className={styles.value}>635</span>
              </div>
            </div>
            <Link to="/profile-p2" className={styles["edit-button"]}>
              <button type="button">Edit</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
