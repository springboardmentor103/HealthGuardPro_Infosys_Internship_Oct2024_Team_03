import React, { useState } from 'react';
import './dashboard.css';
import DashboardIcon from '../assets/icons/dashboard.svg';
import LeaderboardIcon from '../assets/icons/leaderboard.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import LogoutIcon from '../assets/icons/logout.svg';
import { Link } from 'react-router-dom';
function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Hamburger Menu */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Sidebar */}
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
        <span className="leaderboard-label">  Leaderboard</span>
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
      <main className="main-content">
        <header className="header">
          <h1 className="greeting">Hello, user</h1>
          <h2 className="title">HealthGuard Pro</h2>
        </header>
        <section className="cards-section">
  {[
    { title: 'Physical fitness', score: '95%', link: '/PhysicalFitnessQuiz' },
    { title: 'Nutrition', score: '95%', link: '/NutritionQuiz' },
    { title: 'Lifestyle', score: '90%', link: '/LifestyleQuiz' },
    { title: 'Mental well-being', score: '90%', link: '/MentalWellBeingQuiz' },
    { title: 'Bio-markers', score: '85%', link: '/BiomarkerQuiz' },
    { title: 'Overall score', score: '80%' },
  ].map((card, index) => (
    <div className="card" key={index}>
      <h3>{card.title}</h3>
      {card.link && (
        <Link to={card.link}>
          <button>Take test</button>
        </Link>
      )}
      <p>Your previous score was {card.score}</p>
    </div>
  ))}
</section>


        <section className="scoreboard">
          <h3>Scoreboard</h3>
          <table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Time</th>
                <th>Score</th>
                <th> <Link to="/ViewScore">
              <button>View</button>
            </Link></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>date / time</td>
                <td>95%</td>
                <td> <Link to="/viewscore">
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
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
