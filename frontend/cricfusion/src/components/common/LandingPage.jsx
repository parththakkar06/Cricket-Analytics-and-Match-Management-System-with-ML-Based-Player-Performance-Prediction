import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../common/LandingPage.css';
import cricFusionLogo from '../../assets/logo.png';

const LandingPage = () => {
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const backgroundImages = [
    'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80',
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
    'https://images.unsplash.com/photo-1624526267942-ab0c0e53d0e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Features data
  const features = [
    {
      icon: 'fas fa-chart-line',
      title: 'Live Scores',
      description: 'Get real-time updates from matches around the world with ball-by-ball commentary.'
    },
    {
      icon: 'fas fa-trophy',
      title: 'Tournament Management',
      description: 'Create and manage cricket tournaments with ease. Track teams, players, and matches.'
    },
    {
      icon: 'fas fa-users',
      title: 'Team Analytics',
      description: 'Comprehensive statistics and performance insights for players and teams.'
    },
    {
      icon: 'fas fa-video',
      title: 'Match Highlights',
      description: 'Watch key moments from your favorite matches with our curated highlights.'
    }
  ];
  
  useEffect(() => {
    // Logo emergence animation timing
    setTimeout(() => {
      setLogoAnimationComplete(true);
      
      // Show description after logo animation completes
      setTimeout(() => {
        setShowDescription(true);
      }, 500);
    }, 2000);
    
    // Set up background image carousel
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    
    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [backgroundImages.length]);
  
  // Function to scroll to features section
  const scrollToFeatures = () => {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="landing-page">
      {/* Background carousel */}
      {logoAnimationComplete && (
        <div className="background-carousel">
          {backgroundImages.map((image, index) => (
            <div 
              key={index} 
              className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
      )}
      
      {/* Header with logo and buttons */}
      <header className={`landing-header ${logoAnimationComplete ? 'show' : ''}`}>
        <div className="logo-container">
          <img src={cricFusionLogo} alt="CricFusion Logo" className="header-logo" />
        </div>
        <div className="auth-buttons">
          <Link to="/login" className="auth-button login-button">Login</Link>
          <Link to="/signup" className="auth-button signup-button">Sign Up</Link>
        </div>
      </header>
      
      {/* Main content with animated logo */}
      <main className="landing-main">
        <div className="main-logo-container">
          <img 
            src={cricFusionLogo} 
            alt="CricFusion Logo" 
            className={`main-logo ${logoAnimationComplete ? 'emerged' : ''}`} 
          />
        </div>
        
        {showDescription && (
          <div className="description-container">
            <h1>Welcome to CricFusion</h1>
            <p>Your ultimate cricket companion for live scores, match analytics, and team management. Experience the game like never before with our comprehensive cricket platform.</p>
            <button className="cta-button bounce-animation" onClick={scrollToFeatures}>
              Explore Features
            </button>
          </div>
        )}
        
        {/* Scroll indicator */}
        {showDescription && (
          <div className="scroll-indicator">
            <div className="mouse">
              <div className="wheel"></div>
            </div>
          </div>
        )}
      </main>
      
      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="cricket-ball"></div>
        <h2 className="section-title">Our Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <i className={`feature-icon ${feature.icon}`}></i>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Experience Cricket Like Never Before?</h2>
          <p className="cta-description">Join thousands of cricket enthusiasts on CricFusion and elevate your cricket experience today.</p>
          <Link to="/signup" className="cta-button">Get Started Now</Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;