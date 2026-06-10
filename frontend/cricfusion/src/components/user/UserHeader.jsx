import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { jwtDecode } from "jwt-decode";
import "../../assets/usefeture.css";
import axios from "axios";
// import { set } from "react-hook-form";

export const UserHeader = () => {
  const [isProfileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [isLiveMatchesDropdownVisible, setLiveMatchesDropdownVisible] = useState(false);
  const [isHighlightDropdownVisible, setHighlightDropdownVisible] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userId, setuserId] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("decodedToken", decodedToken);
        setuserId(decodedToken._id); // Fixed: properly set userId without extra text

        setFirstname(decodedToken.firstname || "User");
      
        console.log("decodedToken",decodedToken.firstname)
        // setProfilePic(decodedToken.profilePicPath
        //   || "default.png");
        //   console.log("image",decodedToken.profilePicPath)
        setRoleName(decodedToken.roleId?.rolename || "User"); // Ensure role exists
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      if (userId) {
        try {
          console.log("Fetching profile for userId:", userId);
          
          // Check if we're online before making the request
          if (!navigator.onLine) {
            throw new Error("You are offline. Please check your internet connection.");
          }
          
          // Set a timeout for the request to prevent long waiting times
          const res = await axios.get(`http://localhost:3002/userprofile/userprofile/${userId}`, {
            timeout: 5000, // 5 second timeout
            // Add retry logic
            validateStatus: function (status) {
              return status >= 200 && status < 300; // Default
            }
          });
          
          // Log the entire response to debug
          console.log("Profile response:", res.data);
          
          // Check if data exists and has the expected structure
          if (res.data && res.data.data) {
            // Try to access the profile image directly from the response structure
            const profileData = res.data.data;
            
            // Check if profileData is an array and get the first item if it is
            const userData = Array.isArray(profileData) ? profileData[0] : profileData;
            
            console.log("User data for profile:", userData);
            
            // Check all possible image field names
            const possibleImageFields = ['profilePicPath', 'image', 'profileImage', 'avatar', 'photo', 'profilePic'];
            let imageField = null;
            
            for (const field of possibleImageFields) {
              if (userData && userData[field]) {
                imageField = userData[field];
                console.log(`Found image in field: ${field}`, imageField);
                break;
              }
            }
            
            if (imageField) {
              // Ensure the path is absolute (starts with http) or construct it
              const imageUrl = imageField.startsWith('http') 
                ? imageField 
                : `http://localhost:3002/${imageField.replace(/^\//, '')}`;
              
              // Store the image URL in localStorage as a fallback
              localStorage.setItem('userProfilePic', imageUrl);
              
              console.log("Setting profile pic to:", imageUrl);
              setProfilePic(imageUrl);
            } else {
              console.log("No profile pic found, using default");
              setProfilePic("https://via.placeholder.com/40");
            }
          } else {
            console.log("Invalid response structure:", res.data);
            setProfilePic("https://via.placeholder.com/40");
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          
          // Check if it's a network error and provide more specific logging
          if (error.code === 'ERR_NETWORK' || error.message.includes('offline')) {
            console.log("Network error - backend server might be down or not accessible");
            
            // Try to get cached profile image from localStorage
            const cachedProfilePic = localStorage.getItem('userProfilePic');
            if (cachedProfilePic) {
              console.log("Using cached profile pic from localStorage");
              setProfilePic(cachedProfilePic);
              return;
            }
          }
          
          // Try to get profile image from token if available
          const token = localStorage.getItem("token");
          if (token) {
            try {
              const decodedToken = jwtDecode(token);
              if (decodedToken.profilePicPath) {
                console.log("Using profile pic from token");
                setProfilePic(decodedToken.profilePicPath);
                return;
              }
            } catch (tokenError) {
              console.error("Error extracting profile pic from token", tokenError);
            }
          }
          
          // Default fallback
          setProfilePic("https://via.placeholder.com/40");
        }
      }
    };
    
    fetchdata();
    
    // Add event listener for online/offline status
    const handleOnlineStatus = () => {
      if (navigator.onLine && userId) {
        console.log("Back online, attempting to fetch profile again");
        fetchdata();
      }
    };
    
    window.addEventListener('online', handleOnlineStatus);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
    };
  }, [userId]);

  const toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setProfileDropdownVisible(!isProfileDropdownVisible);
  };

  const toggleLiveMatchesDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiveMatchesDropdownVisible(!isLiveMatchesDropdownVisible);
  };

  const toggleHighlightDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlightDropdownVisible(!isHighlightDropdownVisible);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close dropdowns when clicking elsewhere
  useEffect(() => {
    const closeDropdowns = (e) => {
      if (!e.target.closest(".nav-dropdown") && !e.target.closest(".profile-container") && !e.target.closest(".hamburger-menu")) {
        setLiveMatchesDropdownVisible(false);
        setHighlightDropdownVisible(false);
        setProfileDropdownVisible(false);
        
        // Only close mobile menu when clicking outside on mobile
        if (window.innerWidth <= 768 && !e.target.closest(".nav-links") && mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("click", closeDropdowns);
    return () => document.removeEventListener("click", closeDropdowns);
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setProfileDropdownVisible(false);
    window.location.reload(); // Refresh page to apply changes
  };

  return (
    <header>
      <div className="navbar">
        <div className="logo">
          Cric<span>Fusion</span>
        </div>
        
        {/* Hamburger Menu Icon (visible only on mobile) */}
        <div className="hamburger-menu" onClick={toggleMobileMenu}>
          <i className={`fa-solid ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
        
        <div className={`nav-links ${mobileMenuOpen ? 'mobile-nav-active' : ''}`}>
          <Link to="/user" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/feature" onClick={() => setMobileMenuOpen(false)}>Features</Link>
          <div className="nav-dropdown">
            <a href="#" className="dropdown-trigger" onClick={toggleLiveMatchesDropdown}>
              Live Matches &nbsp;
              <i className={`fa-solid fa-angle-${isLiveMatchesDropdownVisible ? "up" : "down"}`}></i>
            </a>
            <div className="dropdown-menu" style={{ display: isLiveMatchesDropdownVisible ? "block" : "none" }}>
              <Link to="/tour" onClick={() => setMobileMenuOpen(false)}>Tournaments</Link>
              <Link to="/teams" onClick={() => setMobileMenuOpen(false)}>Teams</Link>
              <Link to="/matches" onClick={() => setMobileMenuOpen(false)}>All Matches</Link>
            </div>
          </div>
          <Link to="/highlights" onClick={() => setMobileMenuOpen(false)}>Highlights</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>

          {/* Show Profile OR Login/Signup Based on Authentication */}
          {isLoggedIn ? (
            <div className="profile-container">
              {roleName === "User" && (
                <div className="profile-icon" onClick={toggleProfileDropdown}>
                 <img src={profilePic || "https://via.placeholder.com/40"} alt="Profile" className="profile-img" />
                </div>
              )}

              <div className="dropdown-content" style={{ display: isProfileDropdownVisible ? "block" : "none" }}>
                <p className="profile-name" style={{color:"black"}}>{firstname}</p>
                <Link to="/userprofile" className="btn" onClick={() => setMobileMenuOpen(false)}>
                  Profile
                </Link>
                <button onClick={handleLogout} className="btn">
                  Logout
                </button>
                {/* <div className="dropdown-divider" />
                <Link to="#" onClick={() => setMobileMenuOpen(false)}>How it works</Link>
                <Link to="#" onClick={() => setMobileMenuOpen(false)}>Support</Link> */}
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" className="btn" onClick={() => setMobileMenuOpen(false)}>
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};