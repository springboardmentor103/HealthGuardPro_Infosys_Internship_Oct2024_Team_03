import React from 'react';
import './dashboard.css'; // Ensure this file is linked correctly
import DashboardIcon from '../assets/icons/dashboard.svg';
import LeaderboardIcon from '../assets/icons/leaderboard.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import LogoutIcon from '../assets/icons/logout.svg';

function Dashboard() {
  return (
    <div className="dashboard-container">
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
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <h1 className="greeting">Hello, user</h1>
          <h2 className="title">HealthGuard Pro</h2>
        </header>

        <section className="cards-section">
  {[
    { title: "Physical fitness", score: "95%" },
    { title: "Nutrition", score: "95%" },
    { title: "Lifestyle", score: "90%" },
    { title: "Mental well-being", score: "90%" },
    { title: "Bio-markers", score: "85%" },
    { title: "Overall score", score: "80%" },
  ].map((card, index) => (
    <div className="card" key={index}>
      <h3>{card.title}</h3>
      {/* Conditionally render the button */}
      {card.title !== "Overall score" && <button>Take test</button>}
      <p>Your previous score was {card.score}</p>
    </div>
  ))}
</section>


        {/* Scoreboard */}
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
                <td><button>View</button></td>
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