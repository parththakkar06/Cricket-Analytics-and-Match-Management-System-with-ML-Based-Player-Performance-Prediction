import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../score/summary.css';

const Summary = () => {
  const { matchId } = useParams();
  const location = useLocation();
  const [matchData, setMatchData] = useState(null);
  const [firstInnings, setFirstInnings] = useState(null);
  const [secondInnings, setSecondInnings] = useState(null);
  const [playersData, setPlayersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('scorecard');
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');
  const [matchInfo, setMatchInfo] = useState({});

  useEffect(() => {
    const fetchMatchSummary = async () => {
      try {
        setLoading(true);
        
        // Fetch match details
        const matchRes = await axios.get(`http://localhost:3002/match/match/${matchId}`);
        setMatchInfo(matchRes.data.data);
        setTeam1Name(matchRes.data.data.team1Id?.teamname || 'Team 1');
        setTeam2Name(matchRes.data.data.team2Id?.teamname || 'Team 2');
        
        // Fetch both innings data
        const [firstInnRes, secondInnRes] = await Promise.all([
          axios.get(`http://localhost:3002/matchscore/getmatchsummary/${matchId}`),
          axios.get(`http://localhost:3002/matchscore/getmatchsummary/${matchId}`)
        ]);
        
        setFirstInnings(firstInnRes.data.data);
        setSecondInnings(secondInnRes.data.data);
        
        // Fetch players data for both teams
        const [team1Res, team2Res] = await Promise.all([
          axios.get(`http://localhost:3002/teamplayer/teamplayer/player/${matchRes.data.data.team1Id._id}`),
          axios.get(`http://localhost:3002/teamplayer/teamplayer/player/${matchRes.data.data.team2Id._id}`)
        ]);
        
        setTeam1Players(team1Res.data.data);
        setTeam2Players(team2Res.data.data);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching match summary:', err);
        setError('Failed to load match summary');
        setLoading(false);
      }
    };

    fetchMatchSummary();
  }, [matchId]);

  const processPlayerStats = (inningsData, isBattingTeam) => {
    if (!inningsData || !inningsData.length) return [];
    
    const playerStats = {};
    
    inningsData.forEach(ball => {
      // Process batsman stats
      if (isBattingTeam) {
        if (!playerStats[ball.batsmanId._id]) {  // Changed from batsmanId to batsmanId._id
          playerStats[ball.batsmanId._id] = {     // Changed from batsmanId to batsmanId._id
            id: ball.batsmanId._id,               // Added ._id
            name: `${ball.batsmanId.firstname} ${ball.batsmanId.lastname || ''}`.trim(),
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            out: false,
            dismissal: '',
            bowler: '',
            fielder: ''
          };
        }
        
        const batsman = playerStats[ball.batsmanId._id];  // Changed from batsmanId to batsmanId._id
        batsman.runs += ball.batType || 0;
        batsman.balls += (ball.bowletype === 'wide' || ball.bowletype === 'no') ? 0 : 1;
        if (ball.batType === 4) batsman.fours += 1;
        if (ball.batType === 6) batsman.sixes += 1;
        
        if (ball.outType !== 'not-out') {
          batsman.out = true;
          batsman.dismissal = ball.outType;
          batsman.bowler = `${ball.bowlerId.firstname} ${ball.bowlerId.lastname || ''}`.trim();
          if (ball.fieldingPlayerId) {
            batsman.fielder = `${ball.fieldingPlayerId.firstname} ${ball.fieldingPlayerId.lastname || ''}`.trim();
          }
        }
      }
      
      // Process bowler stats
      if (!isBattingTeam) {
        if (!playerStats[ball.bowlerId._id]) {
          playerStats[ball.bowlerId._id] = {
            id: ball.bowlerId._id,
            name: `${ball.bowlerId.firstname} ${ball.bowlerId.lastname || ''}`.trim(),
            overs: 0,
            balls: 0,
            maidens: 0,
            runs: 0,
            wickets: 0,
            economy: 0
          };
        }
        
        const bowler = playerStats[ball.bowlerId._id];
        bowler.balls += (ball.bowletype === 'wide') ? 0 : 1;
        bowler.runs += ball.batType || 0;
        if (ball.bowletype === 'wide') bowler.runs += 1;
        if (ball.bowletype === 'no') bowler.runs += 1;
        if (ball.outType !== 'not-out') bowler.wickets += 1;
      }
    });
    
    // Calculate overs and economy for bowlers
    Object.values(playerStats).forEach(player => {
      if (player.balls) {
        player.overs = Math.floor(player.balls / 6) + (player.balls % 6) / 10;
        const totalOvers = player.balls / 6;
        player.economy = totalOvers > 0 ? player.runs / totalOvers : 0;
      }
    });
    
    return Object.values(playerStats);
  };

  const firstInningsBatting = firstInnings ? processPlayerStats(firstInnings, true) : [];
  const firstInningsBowling = firstInnings ? processPlayerStats(firstInnings, false) : [];
  const secondInningsBatting = secondInnings ? processPlayerStats(secondInnings, true) : [];
  const secondInningsBowling = secondInnings ? processPlayerStats(secondInnings, false) : [];

  const getDismissalText = (player) => {
    if (!player.out) return 'not out';
    
    switch(player.dismissal) {
      case 'bold': return `b ${player.bowler}`;
      case 'catchOut': return `c ${player.fielder} b ${player.bowler}`;
      case 'runOut': return `run out (${player.fielder})`;
      case 'LBW': return `lbw b ${player.bowler}`;
      case 'stumpedOut': return `st ${player.fielder} b ${player.bowler}`;
      case 'HeadWicket': return `hit wicket b ${player.bowler}`;
      default: return player.dismissal;
    }
  };

  const getMatchResult = () => {
    if (!firstInnings || !secondInnings) return '';
    
    const firstInnScore = firstInnings.reduce((acc, ball) => acc + (ball.batType || 0), 0);
    const firstInnWickets = firstInnings.filter(ball => ball.outType !== 'not-out').length;
    
    const secondInnScore = secondInnings.reduce((acc, ball) => acc + (ball.batType || 0), 0);
    const secondInnWickets = secondInnings.filter(ball => ball.outType !== 'not-out').length;
    
    const totalBalls = secondInnings.length;
    const totalOvers = Math.floor(totalBalls / 6);
    const remainingBalls = totalBalls % 6;
    
    if (secondInnScore > firstInnScore) {
      return `${team2Name} won by ${10 - secondInnWickets} wickets with ${(matchInfo.totalovers * 6 - totalBalls)} balls remaining`;
    } else if (secondInnScore < firstInnScore) {
      return `${team1Name} won by ${firstInnScore - secondInnScore} runs`;
    } else {
      return 'Match tied';
    }
  };

  if (loading) {
    return (
      <div className="summarys-loading">
        <div className="spinners"></div>
        <p>Loading match summary...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="summarys-error">
        <div className="errors-icon">⚠️</div>
        <h3>{error}</h3>
        <p>Please try again later</p>
      </div>
    );
  }

  return (
    <div className="summarys-container">
      {/* Match Header */}
      <div className="match7-header">
        <div className="teams7">
          <div className="team7">
            <div className="team7-name">{team1Name}</div>
            <div className="team7-score">
              {firstInnings ? firstInnings.reduce((acc, ball) => acc + (ball.batType || 0), 0) : '-'}/
              {firstInnings ? firstInnings.filter(ball => ball.outType !== 'not-out').length : '-'}
            </div>
          </div>
          <div className="vs7">vs</div>
          <div className="team7">
            <div className="team7-name">{team2Name}</div>
            <div className="team7-score">
              {secondInnings ? secondInnings.reduce((acc, ball) => acc + (ball.batType || 0), 0) : '-'}/
              {secondInnings ? secondInnings.filter(ball => ball.outType !== 'not-out').length : '-'}
            </div>
          </div>
        </div>
        
        <div className="match7-info">
          <div className="match7-result">{getMatchResult()}</div>
          <div className="match7-details">
            {matchInfo.tournamentId?.tournamentname} • {matchInfo.groundname} • 
            {matchInfo.date ? new Date(matchInfo.date).toLocaleDateString() : ''} • 
            {matchInfo.totalovers} overs match
          </div>
          {matchInfo.tosswinningteam && (
            <div className="toss7-info">
              Toss: {matchInfo.tosswinningteam.teamname} won toss and chose to {matchInfo.tosswinningelected}
            </div>
          )}
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="summarys-tabs">
        <button 
          className={`tab8-btn ${activeTab === 'scorecard' ? 'active' : ''}`}
          onClick={() => setActiveTab('scorecard')}
        >
          Scorecard
        </button>
        <button 
          className={`tab8-btn ${activeTab === 'batting' ? 'active' : ''}`}
          onClick={() => setActiveTab('batting')}
        >
          Batting
        </button>
        <button 
          className={`tab8-btn ${activeTab === 'bowling' ? 'active' : ''}`}
          onClick={() => setActiveTab('bowling')}
        >
          Bowling
        </button>
        <button 
          className={`tab8-btn ${activeTab === 'partnerships' ? 'active' : ''}`}
          onClick={() => setActiveTab('partnerships')}
        >
          Partnerships
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="tab8-content">
        {activeTab === 'scorecard' && (
          <div className="scorecard4-tab">
            {/* First Innings */}
            <div className="innings6-card slide5-in">
              <h3>First Innings: {team1Name}</h3>
              <div className="batting9-table">
                <h4>Batting</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Batsman</th>
                      <th>R</th>
                      <th>B</th>
                      <th>4s</th>
                      <th>6s</th>
                      <th>SR</th>
                      <th>Dismissal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {firstInningsBatting.map((player, index) => (
                      <tr key={`fi-bat-${index}`} className="player9-row">
                        <td>{player.name} {!player.out && '*'}</td>
                        <td>{player.runs}</td>
                        <td>{player.balls}</td>
                        <td>{player.fours}</td>
                        <td>{player.sixes}</td>
                        <td>{player.balls > 0 ? ((player.runs / player.balls) * 100).toFixed(2) : '-'}</td>
                        <td>{getDismissalText(player)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="bowling6-table">
                <h4>Bowling</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Bowler</th>
                      <th>O</th>
                      <th>M</th>
                      <th>R</th>
                      <th>W</th>
                      <th>Econ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {firstInningsBowling.map((player, index) => (
                      <tr key={`fi-bowl-${index}`} className="player6-row">
                        <td>{player.name}</td>
                        <td>{player.overs.toFixed(1)}</td>
                        <td>{player.maidens}</td>
                        <td>{player.runs}</td>
                        <td>{player.wickets}</td>
                        <td>{player.economy.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Second Innings */}
            <div className="innings6-card slide-in">
              <h3>Second Innings: {team2Name}</h3>
              <div className="batting6-table">
                <h4>Batting</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Batsman</th>
                      <th>R</th>
                      <th>B</th>
                      <th>4s</th>
                      <th>6s</th>
                      <th>SR</th>
                      <th>Dismissal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {secondInningsBatting.map((player, index) => (
                      <tr key={`si-bat-${index}`} className="player6-row">
                        <td>{player.name} {!player.out && '*'}</td>
                        <td>{player.runs}</td>
                        <td>{player.balls}</td>
                        <td>{player.fours}</td>
                        <td>{player.sixes}</td>
                        <td>{player.balls > 0 ? ((player.runs / player.balls) * 100).toFixed(2) : '-'}</td>
                        <td>{getDismissalText(player)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="bowling6-table">
                <h4>Bowling</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Bowler</th>
                      <th>O</th>
                      <th>M</th>
                      <th>R</th>
                      <th>W</th>
                      <th>Econ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {secondInningsBowling.map((player, index) => (
                      <tr key={`si-bowl-${index}`} className="player6-row">
                        <td>{player.name}</td>
                        <td>{player.overs.toFixed(1)}</td>
                        <td>{player.maidens}</td>
                        <td>{player.runs}</td>
                        <td>{player.wickets}</td>
                        <td>{player.economy.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'batting6' && (
          <div className="batting6-tab">
            <div className="batting6-stats">
              <h3>Top Batsmen</h3>
              <div className="stats6-grid">
                {[...firstInningsBatting, ...secondInningsBatting]
                  .sort((a, b) => b.runs - a.runs)
                  .slice(0, 5)
                  .map((player, index) => (
                    <div key={`top-bat-${index}`} className="stat6-card">
                      <div className="stat6-value">{player.runs}</div>
                      <div className="stat6-label">runs</div>
                      <div className="stat6-name">{player.name}</div>
                      <div className="stat6-detail">{player.balls} balls • SR: {player.balls > 0 ? ((player.runs / player.balls) * 100).toFixed(2) : '-'}</div>
                    </div>
                  ))}
              </div>
              
              <h3>Most Boundaries</h3>
              <div className="stats6-grid">
                {[...firstInningsBatting, ...secondInningsBatting]
                  .sort((a, b) => (b.fours + b.sixes) - (a.fours + a.sixes))
                  .slice(0, 3)
                  .map((player, index) => (
                    <div key={`boundary-${index}`} className="stat6-card">
                      <div className="stat6-value">{player.fours + player.sixes}</div>
                      <div className="stat6-label">boundaries</div>
                      <div className="stat6-name">{player.name}</div>
                      <div className="stat6-detail">{player.fours} fours • {player.sixes} sixes</div>
                    </div>
                  ))}
              </div>
              
              <h3>Best Strike Rates</h3>
              <div className="stats6-grid">
                {[...firstInningsBatting, ...secondInningsBatting]
                  .filter(p => p.balls >= 10)
                  .sort((a, b) => ((b.runs / b.balls) - (a.runs / a.balls)))
                  .slice(0, 3)
                  .map((player, index) => (
                    <div key={`sr-${index}`} className="stat-card">
                      <div className="stat6-value">{player.balls > 0 ? ((player.runs / player.balls) * 100).toFixed(2) : '-'}</div>
                      <div className="stat6-label">strike rate</div>
                      <div className="stat6-name">{player.name}</div>
                      <div className="stat6-detail">{player.runs} runs • {player.balls} balls</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'bowling7' && (
          <div className="bowling7-tab">
            <div className="bowling7-stats">
              <h3>Top Bowlers</h3>
              <div className="stats6-grid">
                {[...firstInningsBowling, ...secondInningsBowling]
                  .sort((a, b) => b.wickets - a.wickets || a.runs - b.runs)
                  .slice(0, 5)
                  .map((player, index) => (
                    <div key={`top-bowl-${index}`} className="stat6-card">
                      <div className="stat6-value">{player.wickets}</div>
                      <div className="stat6-label">wickets</div>
                      <div className="stat6-name">{player.name}</div>
                      <div className="stat6-detail">{player.overs.toFixed(1)} overs • {player.runs} runs</div>
                    </div>
                  ))}
              </div>
              
              <h3>Best Economy</h3>
              <div className="stats6-grid">
                {[...firstInningsBowling, ...secondInningsBowling]
                  .filter(p => p.balls >= 12)
                  .sort((a, b) => a.economy - b.economy)
                  .slice(0, 3)
                  .map((player, index) => (
                    <div key={`econ-${index}`} className="stat6-card">
                      <div className="stat6-value">{player.economy.toFixed(2)}</div>
                      <div className="stat6-label">economy</div>
                      <div className="stat6-name">{player.name}</div>
                      <div className="stat6-detail">{player.overs.toFixed(1)} overs • {player.runs} runs</div>
                    </div>
                  ))}
              </div>
              
              <h3>Most Dot Balls</h3>
              <div className="stats6-grid">
                {[...firstInningsBowling, ...secondInningsBowling]
                  .sort((a, b) => (b.balls - b.runs) - (a.balls - a.runs))
                  .slice(0, 3)
                  .map((player, index) => (
                    <div key={`dots-${index}`} className="stat6-card">
                      <div className="stat6-value">{player.balls - player.runs}</div>
                      <div className="stat6-label">dot balls</div>
                      <div className="stat6-name">{player.name}</div>
                      <div className="stat6-detail">{player.overs.toFixed(1)} overs • {player.runs} runs</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'partnerships8' && (
          <div className="partnerships8-tab">
            <h3>Key Partnerships</h3>
            <div className="partnership8-chart">
              {/* This would be more complex with actual partnership data */}
              <div className="partnership8-notice">
                Partnership data analysis would be displayed here with interactive charts.
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Match Timeline */}
      <div className="match7-timeline">
        <h3>Match Timeline</h3>
        <div className="timeline">
          {firstInnings && (
            <div className="timeline-event">
              <div className="event-time">1st Innings</div>
              <div className="event-dot"></div>
              <div className="event-details">
                <strong>{team1Name}</strong> scored {firstInnings.reduce((acc, ball) => acc + (ball.batType || 0), 0)}/
                {firstInnings.filter(ball => ball.outType !== 'not-out').length} in {Math.floor(firstInnings.length / 6)}.
                {firstInnings.length % 6} overs
              </div>
            </div>
          )}
          
          {secondInnings && (
            <div className="timeline-event">
              <div className="event-time">2nd Innings</div>
              <div className="event-dot"></div>
              <div className="event-details">
                <strong>{team2Name}</strong> scored {secondInnings.reduce((acc, ball) => acc + (ball.batType || 0), 0)}/
                {secondInnings.filter(ball => ball.outType !== 'not-out').length} in {Math.floor(secondInnings.length / 6)}.
                {secondInnings.length % 6} overs
              </div>
            </div>
          )}
          
          <div className="timeline-event">
            <div className="event-time">Result</div>
            <div className="event-dot"></div>
            <div className="event-details">
              <strong>{getMatchResult()}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;