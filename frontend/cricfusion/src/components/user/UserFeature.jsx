import React, { useState } from 'react';
// import '/src/assets/usefeture.css';
import { Link } from 'react-router-dom';
import { UserHeader } from './UserHeader';
import { UserFooter } from './UserFooter';
import Start from '../layouts/Start';

export const UserFeature = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>CricketPro - Cricket Score Management System</title>

{/*----------------------------------------------------- header section------------------------------------------- */}
      {/* <header>
        <div className="navbar">
          <div className="logo">
            Cric<span>Fusion</span>
          </div>
          <div className="nav-links">
            <Link  to="/">Home</Link>
            <Link  to="#">Features</Link>
            <Link  to="/livescore">Live Matches</Link>
            <Link  to="#">Downloads</Link>
            <Link  to="#">About Us</Link>
            <Link  to="#">Contact</Link>
            <div className="profile-container">
              <div className="profile-icon" onClick={toggleDropdown}>
                P
              </div>
              <div className="dropdown-content" style={{ display: isDropdownVisible ? 'block' : 'none' }}>
                <Link to="/signup" className="btn">
                  Sign Up
                </Link>
                <Link to="/login" className="btn">
                  Login
                </Link>
                <div className="dropdown-divider" />
                <Link to="#">How it works</Link>
                <Link to="#">Support</Link>
              </div>
            </div>
          </div>
        </div>
      </header> */}
      <UserHeader></UserHeader>

{/* ----------------------------------------------- news ticker ------------------------------------------------------------------ */}
      <div className="news-ticker">
        <div className="ticker-content">
          <marquee behavior="scroll" direction="left" scrollamount={6}>
            <div className="ticker-item">
              🏏 BREAKING: <span>Royal Tigers win the Mumbai Premier League!</span>
            </div>
            <div className="ticker-item">
              🏆 TOURNAMENT:{" "}
              <span>Registration for Summer Cricket League closes in 2 days</span>
            </div>
            <div className="ticker-item">
              📊 STATS:{" "}
              <span>
                Rohit Sharma becomes fastest batsman to reach 5000 runs in T20
              </span>
            </div>
            <div className="ticker-item">
              🎁 OFFER:{" "}
              <span>Use code CRICKET25 for 25% off on annual subscription</span>
            </div>
            <div className="ticker-item">
              📱 UPDATE:{" "}
              <span>CricketPro app v3.2 released with new scoring features</span>
            </div>
          </marquee>
        </div>
      </div>
      <section className="hero" style={{
        backgroundImage: 'linear-gradient(rgba(12, 60, 96, 0.72), rgba(12, 60, 96, 0.73)), url("/src/assets/homepageback.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>

{/* -------------------------------------------------------------hero section --------------------------------------- */}
        <div className="hero-container">
          <div className="hero-content">
            <h1>Your Cricket. Your Way.</h1>
            <p>
              Record scores, track statistics, and share your cricket moments with
              the world's best cricket score management platform.
            </p>
            <div>
              <Link to="#" className="cta-button">
                Get Started
              </Link>  
              <Link to="#" className="cta-button">
                Watch Demo
              </Link>
            </div>
          </div>

          <div className="hero-image">
            {/* <div className="hero-image-right" style={{backgroundImage: `url('/src/assets/rightsideimag.jpg')`}} /> */}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------feature section--------------------------------------------------------- */}
      <section className="features">
        <div className="section-title">
          <h2>Features That Make Us Special</h2>
          <p>
            Discover why thousands of cricket clubs and players choose CricketPro
          </p>
        </div>
        <div className="feature-grid">  
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Score Anywhere</h3>
            <p>Score matches offline, and sync later when you're back online.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Detailed Stats</h3>
            <p>Track player performances with advanced statistics and analytics.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Tournament Management</h3>
            <p>
              Create and manage tournaments with automatic fixtures and points
              tables.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📺</div>
            <h3>Live Streaming</h3>
            <p>Stream your matches live with integrated scoreboard overlay.</p>
          </div>
        </div>
      </section>


{/* -------------------------------------------------------------live match section --------------------------------------- */}
      {/* <section className="live-matches">
        <div className="live-container">
          <div className="section-title">
            <h2>Live Matches</h2>
            <p>Watch exciting matches happening right now</p>
          </div>
          <div className="match-grid">
            <div className="match-card">
              <div className="match-header">
                <span>T20 Match</span>
                <span>Mumbai</span>
              </div>
              <div className="match-content">
                <div className="team">
                  <span className="team-name">Royal Tigers</span>
                  <span className="team-score">186/4 (20)</span>
                </div>
                <div className="team">
                  <span className="team-name">Super Kings</span>
                  <span className="team-score">142/7 (16.2)</span>
                </div>
                <div className="match-status">
                  LIVE: Super Kings need 45 runs in 22 balls
                </div>
              </div>
            </div>
            <div className="match-card">
              <div className="match-header">
                <span>Club Match</span>
                <span>Delhi</span>
              </div>
              <div className="match-content">
                <div className="team">
                  <span className="team-name">Delhi Stars</span>
                  <span className="team-score">210/6 (20)</span>
                </div>
                <div className="team">
                  <span className="team-name">Panthers</span>
                  <span className="team-score">76/2 (8.3)</span>
                </div>
                <div className="match-status">
                  LIVE: Panthers need 135 runs in 69 balls
                </div>
              </div>
            </div>
            <div className="match-card">
              <div className="match-header">
                <span>Club Match</span>
                <span>Bangalore</span>
              </div>
              <div className="match-content">
                <div className="team">
                  <span className="team-name">Bangalore Royals</span>
                  <span className="team-score">176/8 (20)</span>
                </div>
                <div className="team">
                  <span className="team-name">Chennai Warriors</span>
                  <span className="team-score">178/4 (19.2)</span>
                </div>
                <div className="match-status">
                  COMPLETED: Chennai Warriors won by 6 wickets
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <Start/>


{/* -------------------------------------------------------------testimonial section --------------------------------------- */}
      <section className="testimonials">
        <div className="testimonial-container">
          <div className="section-title">
            <h2>What Our Users Say</h2>
            <p>Join thousands of satisfied users who love CricketPro</p>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="testimonial-text">
                "CricketPro has revolutionized how we manage our club matches. From
                scoring to stats, everything is so seamless!"
              </div>
              <div className="testimonial-author">
                <div className="author-image" />
                <div>
                  <h4>Virat Singh</h4>
                  <p>Club Captain, Delhi Stars</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-text">
                "The analytics and performance tracking have helped me improve my
                game tremendously. I can see where I need to work on."
              </div>
              <div className="testimonial-author">
                <div className="author-image" />
                <div>
                  <h4>Rohit Patel</h4>
                  <p>Opening Batsman, Mumbai Royals</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-text">
                "Organizing tournaments used to be a nightmare. With CricketPro, I
                can manage 10+ teams with just a few clicks!"
              </div>
              <div className="testimonial-author">
                <div className="author-image" />
                <div>
                  <h4>Sanjay Kumar</h4>
                  <p>Tournament Organizer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* ----------------------------------------------------------Download App Section-------------------------------------------- */}
      <section className="download-app">
        <div className="app-container">
          <h2>Download The App</h2>
          <p>Get the full CricketPro experience on your mobile device</p>
          <div className="app-stores">
            <Link to="#" className="app-store-button">
              <div style={{ marginRight: 10, fontSize: 24 }}>📱</div>
              <div>
                <small>Download on the</small>
                <div>
                  <strong>App Store</strong>
                </div>
              </div>
            </Link>
            <Link to="#" className="app-store-button">
              <div style={{ marginRight: 10, fontSize: 24 }}>📱</div>
              <div>
                <small>Get it on</small>
                <div>
                  <strong>Google Play</strong>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
  {/*---------------------------------------------------- footer section--------------------------------------------------- */}
      {/* <footer>
        <div className="footer-content">
          <div className="footer-about">
            <div className="footer-logo">
              Cric<span style={{ color: "#f8c300" }}>Fusion</span>
            </div>
            <p>
              The most comprehensive cricket scoring and management platform for
              players, clubs, and leagues worldwide.
            </p>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="#">Home</Link>
              </li>
              <li>
                <Link to="#">Features</Link>
              </li>
              <li>
                <Link to="#">Pricing</Link>
              </li>
              <li>
                <Link to="#">Blog</Link>
              </li>
              <li>
                <Link href="#">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="footer-links">
            <h3>Resources</h3>
            <ul>
              <li>
                <Link to="#">Help Center</Link>
              </li>
              <li>
                <Link to="#">Video Tutorials</Link>
              </li>
              <li>
                <Link to="#">API Documentation</Link>
              </li>
              <li>
                <Link to="#">Community Forum</Link>
              </li>
            </ul>
          </div>
          <div className="footer-links">
            <h3>Legal</h3>
            <ul>
              <li>
                <Link to="#">Terms of Service</Link>
              </li>
              <li>
                <Link to="#">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#">Cookie Policy</Link>
              </li>
              <li>
                <Link to="#">Data Processing</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 CricketPro. All rights reserved.</p>
        </div>
      </footer> */}
      <UserFooter></UserFooter>
     
    </>
  );
};