import React, { useState } from 'react';
import '../../assets/score.css';

const CricketMatchInterface = () => {
  const [currentBall, setCurrentBall] = useState(2);
  const [wicket, setWicket] = useState(false);
  const [wide, setWide] = useState(false);
  const [noBall, setNoBall] = useState(false);
  const [bye, setBye] = useState(false);
  const [nextBall, setNextBall] = useState(false);

  // Ball button options
  const ballOptions = [0, 1, 2, 3, 4, 6];

  const handleBallClick = (runs) => {
    // Handle ball selection
    setCurrentBall(runs);
    console.log(`${runs} runs scored`);
  };

  const handleWicketClick = () => {
    setWicket(!wicket);
    setWide(false);
    setNoBall(false);
    setBye(false);
  };

  const handleWideClick = () => {
    setWide(!wide);
    setWicket(false);
    setNoBall(false);
    setBye(false);
  };

  const handleNoBallClick = () => {
    setNoBall(!noBall);
    setWicket(false);
    setWide(false);
    setBye(false);
  };

  const handleByeClick = () => {
    setBye(!bye);
    setWicket(false);
    setWide(false);
    setNoBall(false);
  };

  const handleNextBallClick = () => {
    setNextBall(true);
    // Reset states
    setWicket(false);
    setWide(false);
    setNoBall(false);
    setBye(false);
    setNextBall(false);
    // Increment current ball
    setCurrentBall((prev) => (prev < 6 ? prev + 1 : 1));
  };

  return (
    <div className="cricket-container">
      {/* Match Header */}
      <div className="match-header">
        <div className="toss-info">India won the toss</div>
        <div className="teams-container">
          <div className="teams">
            <div className="team-flag india-flag">🇮🇳</div>
            <span>India vs</span>
            <div className="team-flag australia-flag">🇦🇺</div>
            <span>Australia</span>
          </div>
          <div className="match-time">
            <span className="timer">⏱ 30:15 min</span>
            <button className="next-btn">Up next</button>
          </div>
        </div>
      </div>

      {/* Cricket Field Visualization */}
      <div className="cricket-field-container">
        <div className="cricket-field">
          <div className="inner-field"></div>
          <div className="cricket-pitch"></div>
          
          <div className="player batsman-1">
            <div className="player-avatar">👤</div>
            <div className="player-name">Rohit Sharma</div>
          </div>
          
          <div className="player batsman-2">
            <div className="player-avatar">👤</div>
            <div className="player-name">Shikhar Dhawan</div>
          </div>
          
          <div className="ball"></div>
          <svg className="ball-trajectory" viewBox="0 0 256 256">
            <path d="M128,128 Q170,100 220,40" fill="none" stroke="red" strokeWidth="1" strokeDasharray="3" />
          </svg>
        </div>
      </div>

      {/* Player Stats */}
      <div className="stats-section">
        {/* Left team stats */}
        <div className="batting-stats">
          <div className="stats-header">
            <div className="player-name-stats"></div>
            <div className="stat">R</div>
            <div className="stat">B</div>
            <div className="stat">4's</div>
            <div className="stat">6's</div>
          </div>
          
          <div className="player-stats">
            <div className="player-avatar-small">👤</div>
            <div className="player-name-stats">Rohit Sharma</div>
            <div className="stat">54</div>
            <div className="stat">72</div>
            <div className="stat">8</div>
            <div className="stat">3</div>
          </div>
          
          <div className="player-stats">
            <div className="player-avatar-small">👤</div>
            <div className="player-name-stats">Shikhar Dhawan</div>
            <div className="stat">68</div>
            <div className="stat">57</div>
            <div className="stat">4</div>
            <div className="stat">1</div>
          </div>
        </div>
        
        {/* Right team stats */}
        <div className="bowling-stats">
          <div className="partnership-container">
            <div className="partnership-label">Partnership</div>
            <div className="partnership-value">150</div>
            <div className="extras">Extras <span className="extras-value">3</span></div>
          </div>
          
          <div className="stats-header">
            <div className="player-name-stats"></div>
            <div className="stat">O</div>
            <div className="stat">R</div>
            <div className="stat">W</div>
          </div>
          
          <div className="player-stats">
            <div className="player-avatar-small bowler-avatar">👤</div>
            <div className="player-name-stats">Michel Stark</div>
            <div className="stat">3.4</div>
            <div className="stat">24</div>
            <div className="stat">0</div>
          </div>
          
          <div className="player-stats">
            <div className="player-avatar-small bowler-avatar">👤</div>
            <div className="player-name-stats">Pat Cummins</div>
            <div className="stat">3</div>
            <div className="stat">16</div>
            <div className="stat">0</div>
          </div>
        </div>
      </div>

      {/* Ball Controls */}
      <div className="controls-section">
        <div className="ball-controls">
          {ballOptions.map((runs) => (
            <button
              key={runs}
              onClick={() => handleBallClick(runs)}
              className={`ball-btn ${runs === currentBall ? 'active' : ''}`}
            >
              {runs}
            </button>
          ))}
          
          <button
            onClick={handleWicketClick}
            className={`special-btn wicket-btn ${wicket ? 'active' : ''}`}
          >
            Wicket
          </button>
          
          <button
            onClick={handleWideClick}
            className={`special-btn wide-btn ${wide ? 'active' : ''}`}
          >
            Wide
          </button>
          
          <button
            onClick={handleNoBallClick}
            className={`special-btn noball-btn ${noBall ? 'active' : ''}`}
          >
            no-ball
          </button>
          
          <button
            onClick={handleByeClick}
            className={`special-btn bye-btn ${bye ? 'active' : ''}`}
          >
            BYE
          </button>
          
          <button
            onClick={handleNextBallClick}
            className="special-btn"
          >
            Next ball
          </button>
        </div>
        
        {/* Ball Tracker */}
        <div className="ball-tracker">
          <div className="ball-dots">
            {[1, 2, 3, 4, 5, 6].map((ball) => (
              <div key={ball} className="ball-dot-container">
                <div className={`ball-dot ${ball <= currentBall ? 'active' : ''}`}></div>
                <div className="ball-number">{ball}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CricketMatchInterface;