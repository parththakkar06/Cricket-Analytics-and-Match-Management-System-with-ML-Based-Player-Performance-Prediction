import React from "react";
import { Link } from "react-router-dom";
// Assuming you have these assets in your project
import heroImage from "../../assets/bodybck.jpg";
import featureImage from "../../assets/cricket.png";
import logo from "../../assets/cup.png";

const CricFusionLanding = () => {
  return (
    <div className="hero_area bg-light">
      {/* Header/Navbar Section */}
      <header className="header_section sticky-top shadow-sm bg-white">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light py-3">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img src={logo} alt="CricFusion Logo" height="40" className="me-2" />
              <span className="fw-bold text-primary fs-4">CricFusion</span>
            </Link>
            
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarContent">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active fw-medium mx-2" href="#home">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fw-medium mx-2" href="#features">Features</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fw-medium mx-2" href="#about">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fw-medium mx-2" href="#contact">Contact</a>
                </li>
              </ul>
              
              <div className="d-flex">
                <Link to="/login" className="btn btn-outline-primary me-2 px-4 rounded-pill">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary px-4 rounded-pill">
                  Sign Up
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="text-center text-lg-start">
                <h1 className="display-4 fw-bold text-primary mb-3">
                  Cricket Like Never Before
                </h1>
                <p className="lead mb-4 text-secondary">
                  Experience cricket matches, stats, and analysis with CricFusion's cutting-edge platform. 
                  Stay updated with live scores, player performance, and exclusive cricket content.
                </p>
                <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3">
                  <a href="#features" className="btn btn-primary btn-lg px-4 rounded-pill">
                    Explore Features
                  </a>
                  <a href="#contact" className="btn btn-outline-primary btn-lg px-4 rounded-pill">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <img 
                  src={heroImage} 
                  alt="Cricket Visualization" 
                  className="img-fluid rounded-4 shadow-lg" 
                  style={{ maxHeight: "500px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5 bg-white">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary">Key Features</h2>
            <p className="lead text-secondary">Discover what makes CricFusion the ultimate cricket platform</p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon bg-primary bg-opacity-10 p-3 rounded-circle mb-3 mx-auto" style={{ width: "80px", height: "80px" }}>
                    <i className="bi bi-lightning-charge-fill text-primary fs-2"></i>
                  </div>
                  <h4 className="card-title mb-3">Live Scores</h4>
                  <p className="card-text text-secondary">
                    Real-time match updates with ball-by-ball commentary and instant notifications.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon bg-primary bg-opacity-10 p-3 rounded-circle mb-3 mx-auto" style={{ width: "80px", height: "80px" }}>
                    <i className="bi bi-bar-chart-fill text-primary fs-2"></i>
                  </div>
                  <h4 className="card-title mb-3">Advanced Stats</h4>
                  <p className="card-text text-secondary">
                    Comprehensive statistics and analytics for teams, players, and tournaments.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon bg-primary bg-opacity-10 p-3 rounded-circle mb-3 mx-auto" style={{ width: "80px", height: "80px" }}>
                    <i className="bi bi-people-fill text-primary fs-2"></i>
                  </div>
                  <h4 className="card-title mb-3">Fantasy League</h4>
                  <p className="card-text text-secondary">
                    Create your dream team and compete with friends in our interactive fantasy league.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5 bg-light">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img 
                src={featureImage} 
                alt="About CricFusion" 
                className="img-fluid rounded-4 shadow"
              />
            </div>
            <div className="col-lg-6">
              <div className="ms-lg-4">
                <h2 className="display-5 fw-bold text-primary mb-4">About CricFusion</h2>
                <p className="lead mb-4 text-secondary">
                  CricFusion was founded by cricket enthusiasts who wanted to create the ultimate platform for fans around the world.
                </p>
                <p className="mb-4 text-secondary">
                  Our mission is to bring cricket analytics, news, and entertainment together in one seamless experience. With cutting-edge technology and passionate experts, we deliver the most comprehensive cricket platform available.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <div className="border rounded p-3 text-center" style={{ minWidth: "100px" }}>
                    <h3 className="fw-bold text-primary mb-0">5M+</h3>
                    <p className="small mb-0">Users</p>
                  </div>
                  <div className="border rounded p-3 text-center" style={{ minWidth: "100px" }}>
                    <h3 className="fw-bold text-primary mb-0">150+</h3>
                    <p className="small mb-0">Countries</p>
                  </div>
                  <div className="border rounded p-3 text-center" style={{ minWidth: "100px" }}>
                    <h3 className="fw-bold text-primary mb-0">10K+</h3>
                    <p className="small mb-0">Matches</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-5 bg-primary text-white">
        <div className="container py-5 text-center">
          <h2 className="display-5 fw-bold mb-4">Ready to Join CricFusion?</h2>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: "700px" }}>
            Sign up today and get exclusive access to premium features, match predictions, and personalized content.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/signup" className="btn btn-light btn-lg px-5 py-3 rounded-pill text-primary fw-bold">
              Sign Up Now
            </Link>
            <Link to="/contact" className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <h5 className="fw-bold mb-3">CricFusion</h5>
              <p className="text-white-50">
                The ultimate cricket platform for fans, players, and analysts.
              </p>
              <div className="d-flex gap-3 mt-3">
                <a href="#" className="text-white-50 fs-5"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-white-50 fs-5"><i className="bi bi-twitter"></i></a>
                <a href="#" className="text-white-50 fs-5"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-white-50 fs-5"><i className="bi bi-youtube"></i></a>
              </div>
            </div>
            
            <div className="col-lg-2 col-6">
              <h6 className="fw-bold mb-3">Quick Links</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#home" className="text-white-50 text-decoration-none">Home</a></li>
                <li className="mb-2"><a href="#features" className="text-white-50 text-decoration-none">Features</a></li>
                <li className="mb-2"><a href="#about" className="text-white-50 text-decoration-none">About</a></li>
                <li className="mb-2"><a href="#contact" className="text-white-50 text-decoration-none">Contact</a></li>
              </ul>
            </div>
            
            <div className="col-lg-2 col-6">
              <h6 className="fw-bold mb-3">Resources</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Blog</a></li>
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Tutorials</a></li>
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">FAQ</a></li>
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Support</a></li>
              </ul>
            </div>
            
            <div className="col-lg-4">
              <h6 className="fw-bold mb-3">Subscribe</h6>
              <p className="text-white-50">Stay updated with our latest news and updates</p>
              <form className="d-flex gap-2">
                <input type="email" className="form-control rounded-pill" placeholder="Your Email" />
                <button type="submit" className="btn btn-primary rounded-pill">Subscribe</button>
              </form>
            </div>
          </div>
          
          <hr className="my-4 border-secondary" />
          
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <p className="text-white-50 mb-2 mb-md-0">© 2025 CricFusion. All rights reserved.</p>
            <div>
              <a href="#" className="text-white-50 text-decoration-none me-3">Privacy Policy</a>
              <a href="#" className="text-white-50 text-decoration-none">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CricFusionLanding;