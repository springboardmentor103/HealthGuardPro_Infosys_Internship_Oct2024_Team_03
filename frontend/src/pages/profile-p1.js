import React, { useState, useEffect } from "react";
import styles from "./profile-p1.module.css";  // Importing the CSS module
import { Link } from 'react-router-dom';
import DashboardIcon from "../assets/icons/dashboard.svg";
import LeaderboardIcon from "../assets/icons/leaderboard.svg";
import ProfileIcon from "../assets/icons/profile.svg";
import LogoutIcon from "../assets/icons/logout.svg";
import ProfileIconi from "../assets/icons/profile i.svg";

function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({ firstName: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState({ firstName: "", email: "" });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const username = localStorage.getItem("username");

  useEffect(() => { // Fetch user data
    async function fetchUserData() {
      try {
        const token = localStorage.getItem("authToken"); // Ensure correct token key is used
        if (!token) {
          throw new Error("No token found in localStorage");
        }

        const response = await fetch("http://localhost:5000/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching user data");
        }

        const data = await response.json();
        console.log(data);

        // Update userData state with the fetched data
        if (data.firstName && data.email) {
          setUserData({ firstName: data.firstName, email: data.email });
          setTempData({ firstName: data.firstName, email: data.email });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert(error.message); // Optional: Show the error message to the user
      }
    }

    fetchUserData();
  }, []); // Empty dependency array means it will run only once when the component mounts
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const response = await fetch("http://localhost:5000/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: tempData.firstName,
          email: tempData.email,
        }),
      });

      const data = await response.json();
      if (response.ok) {
     //   if (data.message.includes("confirmation email")) {
          alert(data.message); // Email change case
          localStorage.removeItem("authToken");
          window.location.href = "/login";
      //  } 
       
      } else {
        throw new Error("Failed to update user data");
      }
      

      const updatedData = await response.json();
      setUserData(updatedData); // Update userData state
      setEditMode(false);
      alert("Profile updated successfully!");

      if (tempData.firstName !== userData.firstName) {
        window.location.reload(); // Reload the page
      }

    } catch (error) {
      console.error("Error saving user data:", error);
      // alert("Failed to save changes. Please try again.");
    }
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
          <span className={styles.greeting}>Hello, {username}</span>
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
                {editMode ? (
                  <input
                    type="text"
                    value={tempData.firstName}
                    onChange={(e) =>
                      setTempData({ ...tempData, firstName: e.target.value })
                    }
                    className={styles.input}
                  />
                ) : (
                  <span className={styles.value}>{userData.firstName || "N/A"}</span>
                )}
              </div>
              <div className={styles["profile-row"]}>
                <span className={styles.label}>Email</span>
                {editMode ? (
                  <input
                    type="email"
                    value={tempData.email}
                    onChange={(e) =>
                      setTempData({ ...tempData, email: e.target.value })
                    }
                    className={styles.input}
                  />
                ) : (
                  <span className={styles.value}>{userData.email || "N/A"}</span>
                )}
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
            {editMode ? (
              <button onClick={handleSave} className={styles["edit-button"]}>
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className={styles["edit-button"]}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
