import React, { useState, useEffect } from 'react';
import '../common/highlight.css';

const Highlights = () => {
  const [highlights, setHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    // Simulating API fetch with a timeout
    setTimeout(() => {
      // Add image URLs to each highlight item
      const highlightsWithImages = highlightData.map((highlight, index) => ({
        ...highlight,
        imageUrl: getCricketImageForCategory(highlight.category, index)
      }));
      setHighlights(highlightsWithImages);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Function to get cricket images based on category
  const getCricketImageForCategory = (category, index) => {
    // Define specific cricket images for all categories
    const cricketImages = [
      "/images/cricket1.jpg",  // Replace with your actual cricket image paths
      "/images/cricket2.jpg",
      "/images/cricket3.jpg",
      "/images/cricket4.jpg",
      "/images/cricket5.jpg",
      "/images/cricket6.jpg",
      "/images/cricket7.jpg",
      "/images/cricket8.jpg",
      "/images/cricket9.jpg",
      "/images/cricket10.jpg",
      "/images/cricket11.jpg",
      "/images/cricket12.jpg",
    ];
    
    // Use modulo to cycle through available images
    return cricketImages[index % cricketImages.length];
  };

  const filterHighlights = (category) => {
    setActiveFilter(category);
  };

  const filteredHighlights = activeFilter === 'all' 
    ? highlights 
    : highlights.filter(highlight => highlight.category === activeFilter);

  const handleCardClick = (videoUrl) => {
    window.open(videoUrl, '_blank');
  };

  // CSS style for background image
  const containerStyle = {
    backgroundImage: "url('/images/cricket-stadium-background.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  };

  return (
    <div className="highlights-container" style={containerStyle}>
      <div className="background-overlay"></div>
      
      <div className="highlights-hero">
        <h1>Cricket Highlights</h1>
        <div className="underline"></div>
        <p>Relive the most exciting moments from cricket matches around the world</p>
      </div>

      <div className="highlights-filter">
        <button 
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} 
          onClick={() => filterHighlights('all')}
        >
          All Highlights
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'topPlays' ? 'active' : ''}`} 
          onClick={() => filterHighlights('topPlays')}
        >
          Top Plays
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'international' ? 'active' : ''}`} 
          onClick={() => filterHighlights('international')}
        >
          International
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'ipl' ? 'active' : ''}`} 
          onClick={() => filterHighlights('ipl')}
        >
          IPL
        </button>
      </div>

      {isLoading ? (
        <div className="loading-spinner">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="highlights-grid">
          {filteredHighlights.map((highlight, index) => (
            <div 
              className="highlight-card" 
              key={index}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleCardClick(highlight.videoUrl)}
            >
              <div className="card-inner">
                <div 
                  className="card-image" 
                  style={{ 
                    backgroundImage: `url('${highlight.imageUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="card-image-overlay"></div>
                  <div className="highlight-tag">{highlight.category}</div>
                </div>
                <div className="card-content">
                  <h3>{highlight.title}</h3>
                  <p className="highlight-date">{highlight.date}</p>
                  <div className="watch-now">
                    <span>Watch Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Sample highlight data with actual cricket match names
const highlightData = [
  {
    title: "England vs Australia - Test Match Day 5",
    description: "The dramatic conclusion to the riveting test match between England and Australia.",
    date: "April 7, 2025",
    category: "international",
    videoUrl: "https://www.youtube.com/watch?v=XqZsoesa55w"
  },
  {
    title: "India vs South Africa - T20 Series Finale",
    description: "Highlights from the deciding match of the T20 series between India and South Africa.",
    date: "April 5, 2025",
    category: "international",
    videoUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk"
  },
  {
    title: "Sri Lanka vs Bangladesh - ODI Series Highlights",
    description: "Key moments from the ODI series between Sri Lanka and Bangladesh.",
    date: "April 2, 2025",
    category: "international",
    videoUrl: "https://www.youtube.com/watch?v=JGwWNGJdvx8"
  },
  {
    title: "New Zealand vs Pakistan - World Cup Match",
    description: "Highlights from the critical World Cup match between New Zealand and Pakistan.",
    date: "March 30, 2025",
    category: "international",
    videoUrl: "https://www.youtube.com/watch?v=RgKAFK5djSk"
  },
  {
    title: "West Indies vs Australia - T20 Thriller",
    description: "The exciting T20 match between West Indies and Australia that went down to the last ball.",
    date: "March 27, 2025",
    category: "international",
    videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0"
  },
  {
    title: "England vs India - Test Match Special Moments",
    description: "The special moments from the test match between England and India that fans will remember.",
    date: "March 24, 2025",
    category: "international",
    videoUrl: "https://www.youtube.com/watch?v=QK8mJJJvaes"
  },
  {
    title: "Top 10 Catches of the Season",
    description: "A compilation of the most spectacular catches from this cricket season that left fans in awe.",
    date: "April 8, 2025",
    category: "topPlays",
    videoUrl: "https://www.youtube.com/watch?v=OPf0YbXqDm0"
  },
  {
    title: "Hat-trick by Patel in the Death Overs",
    description: "Watch Patel's incredible hat-trick in the final overs that changed the game completely.",
    date: "April 4, 2025",
    category: "topPlays",
    videoUrl: "https://www.youtube.com/watch?v=YqeW9_5kURI"
  },
  {
    title: "Century by Smith in Just 52 Balls",
    description: "Watch Smith's explosive century that included 8 sixes and 9 fours in just 52 balls.",
    date: "April 1, 2025",
    category: "topPlays",
    videoUrl: "https://www.youtube.com/watch?v=fHI8X4OXluQ"
  },
  {
    title: "Best Bowling Spells of March 2025",
    description: "A compilation of the most devastating bowling spells that left batsmen clueless.",
    date: "March 29, 2025",
    category: "topPlays",
    videoUrl: "https://www.youtube.com/watch?v=J3UjJ4wKLkg"
  },
  {
    title: "Spectacular Boundary Saves Compilation",
    description: "Amazing boundary line saves that demonstrate the athleticism of modern cricketers.",
    date: "March 26, 2025",
    category: "topPlays",
    videoUrl: "https://www.youtube.com/watch?v=PT2_F-1esPk"
  },
  {
    title: "Most Innovative Shots of the Season",
    description: "A compilation of the most creative and innovative cricket shots played this season.",
    date: "March 23, 2025",
    category: "topPlays",
    videoUrl: "https://www.youtube.com/watch?v=6Dh-RL__uN4"
  },
  {
    title: "Royal Tigers vs Mumbai Premier - Final Match",
    description: "Watch the thrilling final between Royal Tigers and Mumbai Premier that crowned the champions.",
    date: "April 9, 2025",
    category: "ipl",
    videoUrl: "https://www.youtube.com/watch?v=CevxZvSJLk8"
  },
  {
    title: "Delhi Capitals vs Chennai Kings - Match Highlights",
    description: "The exciting clash between Delhi Capitals and Chennai Kings in the playoff race.",
    date: "April 6, 2025",
    category: "ipl",
    videoUrl: "https://www.youtube.com/watch?v=papuvlVeZg8"
  },
  {
    title: "Rajasthan Royals vs Punjab Kings - Last Over Drama",
    description: "The nail-biting last over between Rajasthan Royals and Punjab Kings that went down to the wire.",
    date: "April 3, 2025",
    category: "ipl",
    videoUrl: "https://www.youtube.com/watch?v=Bg59q4puhmg"
  },
  {
    title: "Kolkata Knights vs Hyderabad Sunrisers - Super Over",
    description: "The intense super over that decided the winner between Kolkata Knights and Hyderabad Sunrisers.",
    date: "March 31, 2025",
    category: "ipl",
    videoUrl: "https://www.youtube.com/watch?v=aJOTlE1K90k"
  },
  {
    title: "Mumbai Premier vs Gujarat Titans - Record Chase",
    description: "Mumbai Premier's record-breaking chase against Gujarat Titans' imposing total.",
    date: "March 28, 2025",
    category: "ipl",
    videoUrl: "https://www.youtube.com/watch?v=1w7OgIMMRc4"
  },
  {
    title: "Chennai Kings vs Royal Tigers - Chennai's Comeback",
    description: "Chennai Kings' spectacular comeback victory against Royal Tigers after a poor start.",
    date: "March 25, 2025",
    category: "ipl",
    videoUrl: "https://www.youtube.com/watch?v=RBumgq5yVrA"
  }
];

export default Highlights;