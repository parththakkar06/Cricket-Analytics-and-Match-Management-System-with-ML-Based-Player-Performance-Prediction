import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import '../admin/adminsidebar.css';
import image from '../../assets/logo.png'


export const AdminSidedbar = () => {

  const [AdminProfile, setAdminProfile] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const getApiCall = async () => {
    try {
      console.log("adminToken ", localStorage.getItem('token'));
      const res = await axios.get("http://localhost:3002/user/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })


      console.log("API Response:", res.data.data); // Check response in console

      setAdminProfile(res.data.data); // Set response data to state
      return res; // Return response if needed
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Call the function
  useEffect(() => {
    getApiCall();
  }
    , []);


  const handleProfileClick = (e) => {
    e.preventDefault();
    setShowProfile(!showProfile);
  };

  return (
    <>
      {/* Coding By CodingNepal - youtube.com/@codingnepal */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Sidebar Menu | CodingNepal</title>
      <link rel="stylesheet" href="style.css" />
      {/* Linking Google fonts for icons */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <aside className="sidebar">
        {/* Sidebar header */}
        <header className="sidebar-header">
          <a href="#" className="header-logo">
            <img src={image} alt="CodingNepal" />
            <div> <h3>CricFusion</h3></div>
          </a>

          <button className="toggler sidebar-toggler">
            <span className="material-symbols-rounded">chevron_left</span>
          </button>
          <button className="toggler menu-toggler">
            <span className="material-symbols-rounded">menu</span>
          </button>
        </header>
        <nav className="sidebar-nav">
          {/* Primary top nav */}
          <ul className="nav-list primary-nav">
            <li className="nav-item">
              <Link to="/admin" className="nav-link">
                <span className="nav-icon material-symbols-rounded">dashboard</span>
                <span className="nav-label">Dashboard</span>
              </Link>
              <span className="nav-tooltip">Dashboard</span>
            </li>
            <li className="nav-item">
              <Link to="/userlist" className="nav-link">
                <span className="nav-icon material-symbols-rounded">
                  person
                </span>
                <span className="nav-label">User List</span>
              </Link>
              <span className="nav-tooltip">User List</span>
            </li>
            <li className="nav-item">
              <Link to='/admintour' className="nav-link">
                <span className="nav-icon material-symbols-rounded">
                  emoji_events
                </span>
                <span className="nav-label">Tournament</span>
              </Link>
              <span className="nav-tooltip">Tournament</span>
            </li>
            <li className="nav-item">
              <Link to="/adminteam" className="nav-link">
                <span className="nav-icon material-symbols-rounded">group</span>
                <span className="nav-label">Team</span>
              </Link>
              <span className="nav-tooltip">Team</span>
            </li>
            <li className="nav-item">
              <Link to="/match" className="nav-link">
                <span className="nav-icon material-symbols-rounded">
                  insert_chart
                </span>
                <span className="nav-label">Match</span>
              </Link>
              <span className="nav-tooltip">Match</span>
            </li>
            <li className="nav-item">
              <Link to="/userstats" className="nav-link">
                <span className="nav-icon material-symbols-rounded">star</span>
                <span className="nav-label">User Stats</span>
              </Link>
              <span className="nav-tooltip">User Stats</span>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <span className="nav-icon material-symbols-rounded">settings</span>
                <span className="nav-label">Settings</span>
              </a>
              <span className="nav-tooltip">Settings</span>
            </li>
          </ul>
          {/* Secondary bottom nav */}
          <ul className="nav-list secondary-nav">
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={handleProfileClick}>
                <span className="nav-icon material-symbols-rounded">
                  account_circle
                </span>
                <span className="nav-label">Profile</span>
              </a>
              <span className="nav-tooltip">Profile</span>
            </li>
            <li className="nav-item">
              <Link to="/logout" className="nav-link">
                <span className="nav-icon material-symbols-rounded">logout</span>
                <span className="nav-label">Logout</span>
              </Link>
              <span className="nav-tooltip">Logout</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Add Profile Card */}
      {showProfile && (
        <div className="profile-card">
          <div className="profile-header">
            <h2 style={{color:"white"}}>Profile Information</h2>
            <button className="close-btn" onClick={() => setShowProfile(false)}>×</button>
          </div>
          <div className="profile-content">
            <div className="profile-item">
              <label>First Name:</label>
              <span>{AdminProfile.firstname || 'N/A'}</span>
            </div>
            <div className="profile-item">
              <label>Last Name:</label>
              <span>{AdminProfile.lastname || 'N/A'}</span>
            </div>
            <div className="profile-item">
              <label>Email:</label>
              <span>{AdminProfile.email || 'N/A'}</span>
            </div>
            <div className="profile-item">
              <label>Contact:</label>
              <span>{AdminProfile.contact || 'N/A'}</span>
            </div>
            <div className="profile-item">
              <label>Date of Birth:</label>
              <span>{AdminProfile.DOB || 'N/A'}</span>
            </div>
            <div className="profile-item">
              <label>Gender:</label>
              <span>{AdminProfile.gender || 'N/A'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Add this CSS */}
      {/* <style>
        {`
                  `}
      </style> */}
    </>
  );
};
