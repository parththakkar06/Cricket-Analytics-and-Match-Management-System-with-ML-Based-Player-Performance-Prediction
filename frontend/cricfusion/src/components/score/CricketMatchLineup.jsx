import React from 'react';
import '../../assets/matchlineup.css';
import { Link } from 'react-router-dom';

const CricketMatchLineup = () => {
  // Static data matching the image
  const matchData = {
    team1: {
      name: "INDIA",
      players: [
        { name: "Rohit Sharma", role: "", isBatsman: true },
        { name: "Shikhar Dhawan", role: "", isBatsman: true },
        { name: "Virat Kohli", role: "(C)", isBatsman: true },
        { name: "Rishabh Pant", role: "(W)", isBatsman: true },
        { name: "Shreyas Iyer", role: "", isBatsman: true },
        { name: "Ravindra Jadeja", role: "", isBatsman: true, isBowler: true },
        { name: "Hardik Pandya", role: "", isBatsman: true, isBowler: true },
        { name: "Krunal Pandya", role: "", isBatsman: true, isBowler: true },
        { name: "Axar Patel", role: "", isBatsman: true, isBowler: true },
        { name: "Mohammed Shami", role: "", isBowler: true },
        { name: "Jasprit Bumrah", role: "", isBowler: true }
      ]
    },
    team2: {
      name: "AUSTRALIA",
      players: [
        { name: "Aaron Finch", role: "(C)", isBatsman: true },
        { name: "David Warner", role: "", isBatsman: true },
        { name: "Steve Smith", role: "", isBatsman: true },
        { name: "Glenn Maxwell", role: "", isBatsman: true, isBowler: true },
        { name: "Matthew Wade", role: "(W)", isBatsman: true },
        { name: "Marcus Stoinis", role: "", isBatsman: true, isBowler: true },
        { name: "Nathan Lyon", role: "", isBowler: true },
        { name: "Pat Cummins", role: "", isBowler: true },
        { name: "Adam Zampa", role: "", isBowler: true },
        { name: "Coulter-Nile", role: "", isBowler: true },
        { name: "Mitchell Starc", role: "", isBowler: true }
      ]
    },
    matchInfo: {
      type: "WORLD CUP",
      stage: "SEMIFINAL",
      tossResult: "India won the toss and choose to bat first"
    }
  };

  return (
    <div className="match-container">
      <div className="match-card">
        {/* Match Header */}
        <div className="match-header">
          <div className="team team-left">
            <div className="team-logo">
              <img src="/img/india-logo.png" alt="India" />
            </div>
            <div className="team-name">{matchData.team1.name}</div>
          </div>
          
          <div className="match-info">
            <div className="match-type">{matchData.matchInfo.type}</div>
            <div className="match-stage">{matchData.matchInfo.stage}</div>
          </div>
          
          <div className="team team-right">
            <div className="team-name">{matchData.team2.name}</div>
            <div className="team-logo">
              <img src="/img/australia-logo.png" alt="Australia" />
            </div>
          </div>
        </div>
        
        {/* Player Lineups */}
        <div className="lineups-container">
          {/* Team 1 Lineup */}
          <div className="team-lineup">
            {matchData.team1.players.map((player, index) => (
              <div key={`team1-${index}`} className="player-row">
                <div className="player-photo">
                  <img src={`/img/india-player-${index+1}.png`} alt={player.name} />
                </div>
                <div className="player-name">
                  {player.name} {player.role}
                </div>
                <div className="player-icons">
                  {player.isBatsman && <span className="bat-icon">🏏</span>}
                  {player.isBowler && <span className="ball-icon">🔴</span>}
                </div>
              </div>
            ))}
          </div>
          
          {/* Team 2 Lineup */}
          <div className="team-lineup">
            {matchData.team2.players.map((player, index) => (
              <div key={`team2-${index}`} className="player-row">
                <div className="player-photo">
                  <img src={`/img/australia-player-${index+1}.png`} alt={player.name} />
                </div>
                <div className="player-name">
                  {player.name} {player.role}
                </div>
                <div className="player-icons">
                  {player.isBatsman && <span className="bat-icon">🏏</span>}
                  {player.isBowler && <span className="ball-icon">🔴</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Toss Result */}
        <div className="toss-result">
          {matchData.matchInfo.tossResult}
        </div>
        
        {/* Start Match Button */}
        <div className="start-match-container">
          <Link to="/score" className="start-match-btn">Start match</Link>
        </div>
      </div>
    </div>
  );
};

export default CricketMatchLineup;