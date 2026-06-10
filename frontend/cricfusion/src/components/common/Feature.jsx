import React from 'react'
import { UserHeader } from '../user/UserHeader'
import { UserFooter } from '../user/UserFooter'
import { FaUsers, FaChartLine, FaShieldAlt, FaSync, FaRocket, FaGlobe } from "react-icons/fa";
import '../common/feature.css' // Import your CSS file for styling

export const Feature = () => {
  const features = [
    {
      icon: <FaUsers />,
      title: "Player Management",
      description: "Easily manage player profiles, stats, and performance records."
    },
    {
      icon: <FaChartLine />,
      title: "Match Analytics",
      description: "Track and analyze match performance with detailed insights."
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Transactions",
      description: "Ensure safe and reliable financial transactions for players and teams."
    },
    {
      icon: <FaSync />,
      title: "Live Score Updates",
      description: "Real-time score updates and live match tracking."
    },
    {
      icon: <FaRocket />,
      title: "Automated Scheduling",
      description: "Automatically schedule fixtures and manage team availability."
    },
    {
      icon: <FaGlobe />,
      title: "Global Reach",
      description: "Connect with players and fans worldwide through the platform."
    }
  ];
  return (

    <>
    <div>

{/*----------------------------------------------------- header section------------------------------------------- */}

        <UserHeader/>

{/*----------------------------------------------------- main section------------------------------------------- */}



  

<div className="feature-container">
      <h1 className="section-title">Explore Our Features</h1>
      <div className="feature-list">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>




{/*----------------------------------------------------- footer section------------------------------------------- */}
           {/* <UserFooter/> */}
        </div>
        <UserFooter/> 
        </>

  )
}