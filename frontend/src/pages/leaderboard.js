import React, { useState } from "react";
import "./leaderboard.css"; // Ensure the CSS file is imported correctly
import DashboardIcon from "../assets/icons/dashboard.svg";
import LeaderboardIcon from "../assets/icons/leaderboard.svg";
import ProfileIcon from "../assets/icons/profile.svg";
import LogoutIcon from "../assets/icons/logout.svg";
import ProfileImage from "../assets/images/profile.png"; // Import the profile image

const Leaderboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State for mobile sidebar toggle

  const leaderboardData = [
    { user: "Priya (you)", ranking: 90, points: 635 },
    { user: "Abhi", ranking: 1, points: 3000 },
    { user: "Ravi", ranking: 2, points: 2862 },
    { user: "Roshan", ranking: 3, points: 2597 },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility on mobile
  };

  return (
    <div className="leaderboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <ul>
          <li>
            <img src={DashboardIcon} alt="Dashboard" className="sidebar-icon" /> Dashboard
          </li>
          <li className="active">
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

      {/* Hamburger Icon for Mobile */}
      <div className="hamburger" onClick={toggleSidebar}>
        &#9776; {/* Hamburger icon */}
      </div>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <h1 className="greeting">Hello, user</h1>
          <h2 className="title">HealthGuard Pro</h2>
        </header>

        {/* User Info Section (Centered on Mobile) */}
        <section className="user-info">
          <div className="profile">
            <img
              src={ProfileImage} // Profile image added here
              alt="User Profile"
              className="profile-picture"
            />
            <div>
              <h2>Priya</h2>
              <p>#097654</p>
            </div>
          </div>
          <div className="points">
            <h2>Points: 635</h2>
          </div>
        </section>

        {/* Leaderboard Table */}
        <section className="leaderboard-section">
          <table className="leaderboard-table">
            <thead>
              <tr className="leaderboard-title">
                <th colSpan="3">Leaderboard</th> {/* Spans all columns */}
              </tr>
              <tr className="table-header">
                <th>User</th>
                <th>Ranking</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((item, index) => (
                <tr key={index}>
                  <td>{item.user}</td>
                  <td>{item.ranking}</td>
                  <td>{item.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Leaderboard;
