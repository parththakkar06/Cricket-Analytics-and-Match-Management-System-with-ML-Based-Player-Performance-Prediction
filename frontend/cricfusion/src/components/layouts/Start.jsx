import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import '../../assets/start.css'

// Import images
import cricketImage from "../../assets/cricket.png";
import cupImage from "../../assets/cup.png";
import aobe from '../../assets/Aobe.jpg';
import playerMatch from '../../assets/playerMatch.png';

import winning from '/src/assets/winning.png';

// Import CSS (you'll need to create this file using the CSS provided separately)

import { UserHeader } from "../user/UserHeader";
import { UserFooter } from "../user/UserFooter";

function Start() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [currentUserId, setCurrentUserId] = useState(userId || "");
  
  useEffect(() => {
    // Get user ID from token if not available in URL params
    if (!currentUserId) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setCurrentUserId(decodedToken._id);
          console.log("User ID from token:", decodedToken._id);
        } catch (error) {
          console.error("Invalid token", error);
        }
      }
    }
  }, [currentUserId]);

  console.log("start user....", currentUserId);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>CricFusion - Cricket Score Management System</title>

      {/* <UserHeader/> */}

      {/* <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Your Cricket. Your Way.</h1>
            <p>
              Record scores, track statistics, and share your cricket moments with
              the world's best cricket score management platform.
            </p>
          </div>
          <div className="hero-image"></div>
        </div>
      </section> */}

      <section className="feature">
        <div className="section1-title">
          <h2>Let's Begin</h2>
          <p>
            Discover why thousands of cricket clubs and players choose CricFusion
          </p>
        </div>
        <div className="grid-container">
          {/* Start Match Card */}
          <div className="feature-card" onClick={() => navigate("/start-match")}>
            <div className="feature-icon">
              <img src={cricketImage} alt="Start Match" />
            </div>
            <h3>Start Match</h3>
            <p>Start Match</p>
          </div>
          
          {/* Create Tournament Card */}
          <div className="feature-card" onClick={() => navigate("/createtournament")}>
            <div className="feature-icon">
              <img src={cupImage} alt="Create Tournament" />
            </div>
            <h3>Create Tournament</h3>
            <p>Create Tournament</p>
          </div>
        </div>
      </section>
      
      <section className="Mycricket">
        <div className="section-title">
          <h2>My Cricket</h2>
        </div>
        <div className="grid-container">
          {/* My Match Card */}
          <div className="feature-card" onClick={() => navigate('/userplayermatch')}>
            <div className="feature-icon">
              <img src={aobe} alt="My Match" />
            </div>
            <h3>My Match</h3>
            <p>my matches</p>
          </div>

          {/* My Tournament Card */}
          <div className="feature-card" onClick={() => navigate(`/usertournament/${userId}`)}>
            <div className="feature-icon">
              <img src={playerMatch} alt="My Tournament" />
            </div>
            <h3>My Tournament</h3>
            <p>my Tournament</p>
          </div>

          {/* My Team Card */}
          <div className="feature-card" onClick={() => navigate(`/userteams/${userId}`)}>
            <div className="feature-icon">
              <img src={winning} alt="My Team" />
            </div>
            <h3>My Team</h3>
            <p>my Team</p>
          </div>

          {/* My Stats Card */}
          <div className="feature-card" onClick={() => navigate(currentUserId ? `/mystats/${currentUserId}` : "/mystats")}>
            <div className="feature-icon">
              <img src={cricketImage} alt="My Stats" />
            </div>
            <h3>My Stats</h3>
            <p>my Stats</p>
          </div>
        </div>
      </section>
      
      <br />
      {/* <UserFooter/> */}
    </>
  );
}

export default Start;