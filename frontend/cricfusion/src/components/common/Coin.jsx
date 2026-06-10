import React, { useState, useCallback, useEffect } from 'react';
import { Coins } from 'lucide-react';
import '../common/coin.css';
import { UserHeader } from '../user/UserHeader';
import { UserFooter } from '../user/UserFooter';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function CricketToss() {
  const location = useLocation();
  const { team1Name, team2Name, team1Id, team2Id, tournamentId, matchId } = location.state || {};
  const [stage, setStage] = useState('team-selection');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [tossWinner, setTossWinner] = useState(null);
  const [decision, setDecision] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState(null);
  const [rotations, setRotations] = useState(0);
  const [showCrackAnimation, setShowCrackAnimation] = useState(false);
  const [battingTeamPlayers, setBattingTeamPlayers] = useState([]);
  const [bowlingTeamPlayers, setBowlingTeamPlayers] = useState([]);
  const [openingBatsmen, setOpeningBatsmen] = useState([null, null]);
  const [openingBowler, setOpeningBowler] = useState(null);
  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchPlayers = async () => {
    if (!team1Id || !team2Id) {
      setError('Team information is missing');
      return;
    }
    
    setLoadingPlayers(true);
    setError(null);
    try {
      const [team1Response, team2Response] = await Promise.all([
        axios.get(`http://localhost:3002/teamplayer/teamplayer/player/${team1Id}`),
        axios.get(`http://localhost:3002/teamplayer/teamplayer/player/${team2Id}`)
      ]);
      
      setBattingTeamPlayers(team1Response.data.data);
      setBowlingTeamPlayers(team2Response.data.data);
      
      if (!team1Response.data.data.length || !team2Response.data.data.length) {
        setError('Could not load players for one or both teams');
      }
    } catch (error) {
      console.error("Error fetching players:", error);
      setError('Failed to load players. Please try again.');
      setBattingTeamPlayers([]);
      setBowlingTeamPlayers([]);
    } finally {
      setLoadingPlayers(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [team1Id, team2Id]);

  const flipCoin = useCallback(() => {
    if (!selectedChoice || isFlipping) return;
    setIsFlipping(true);
    setResult(null);

    const randomResult = Math.random() < 0.5 ? 'heads' : 'tails';
    const baseRotations = rotations + 1800;
    const finalRotation = baseRotations + (randomResult === 'tails' ? 180 : 0);

    setRotations(finalRotation);
    setTimeout(() => {
      setResult(randomResult);
      setIsFlipping(false);

      const winner = randomResult === selectedChoice ? selectedTeam : (selectedTeam === 'team1' ? 'team2' : 'team1');
      setTossWinner(winner);
      setStage('decision');
    }, 2000);
  }, [selectedChoice, isFlipping, rotations, selectedTeam]);

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    setStage('coin-toss');
  };

  const handleDecision = async (choice) => {
    const selectedDecision = choice;
    const winningTeam = tossWinner;
    setDecision(selectedDecision);
    setStage('player-selection');
    setShowCrackAnimation(true);
    setTimeout(() => setShowCrackAnimation(false), 1500);

    if (choice === 'batting') {
      setBattingTeamPlayers(winningTeam === 'team1' ? battingTeamPlayers : bowlingTeamPlayers);
      setBowlingTeamPlayers(winningTeam === 'team1' ? bowlingTeamPlayers : battingTeamPlayers);
    } else {
      setBattingTeamPlayers(winningTeam === 'team1' ? bowlingTeamPlayers : battingTeamPlayers);
      setBowlingTeamPlayers(winningTeam === 'team1' ? battingTeamPlayers : bowlingTeamPlayers);
    }
  };

  const handleBatsmanSelect = (index, playerId) => {
    const newOpeningBatsmen = [...openingBatsmen];
    newOpeningBatsmen[index] = playerId;
    setOpeningBatsmen(newOpeningBatsmen);
  };

  const handleBowlerSelect = (playerId) => {
    setOpeningBowler(playerId);
  };

  const confirmPlayerSelection = async () => {
    if (!Array.isArray(openingBatsmen)) {
      setError('Invalid batsmen selection');
      return;
    }
    
    if (openingBatsmen.some(b => b === null) || openingBowler === null) {
      setError('Please select both opening batsmen and the opening bowler');
      return;
    }

    const tossWinningTeamId = tossWinner === 'team1' ? team1Id : team2Id;
    const battingTeamId = decision === 'batting' ? tossWinningTeamId : (tossWinner === 'team1' ? team2Id : team1Id);
    const bowlingTeamId = decision === 'bowling' ? tossWinningTeamId : (tossWinner === 'team1' ? team2Id : team1Id);

    try {
      await axios.put(`http://localhost:3002/match/match/${matchId}`, {
        tosswinningteam: tossWinningTeamId,
        tosswinningelected: decision,
        battingTeamId,
        bowlingTeamId,
        openingBatsmen,
        openingBowler
      });

      setError(null);
      setStage('result');
    } catch (error) {
      console.error("Failed to update match info:", error);
      setError("Failed to update match info: " + (error.response?.data?.message || error.message));
    }
  };

  const navigateToMatch = () => {
    const battingTeamId = decision === 'batting' ? (tossWinner === 'team1' ? team1Id : team2Id) : 
                                                (tossWinner === 'team1' ? team2Id : team1Id);
    const bowlingTeamId = decision === 'bowling' ? (tossWinner === 'team1' ? team1Id : team2Id) : 
                                                (tossWinner === 'team1' ? team2Id : team1Id);

    navigate(`/score/${matchId}`, {
      state: {
        matchId,
        tournamentId,
        battingTeamId,
        bowlingTeamId,
        tossWinner: tossWinner === 'team1' ? team1Name : team2Name,
        tossDecision: decision,
        team1Name,
        team2Name,
        team1Id,
        team2Id,
        openingBatsmen,
        openingBowler
      }
    });
  };

  const currentSideUp = rotations % 360 === 0 ? 'heads' : 'tails';

  const renderPlayerOptions = (players, excludePlayerId = null) => {
    if (!Array.isArray(players)) return null;
    
    return players
      .filter(player => player.userId._id !== excludePlayerId)
      .map(player => (
        <option key={player.userId._id} value={player.userId._id}>
          {`${player.userId.firstname} ${player.userId.lastname || ''}`}
        </option>
      ));
  };

  const renderOpeningBatsmen = () => {
    if (!Array.isArray(openingBatsmen)) return null;
    
    return openingBatsmen.map((playerId, index) => {
      const player = Array.isArray(battingTeamPlayers) 
        ? battingTeamPlayers.find(p => p.userId._id === playerId)
        : null;
      return (
        <li key={index}>
          {player ? `${player.userId.firstname} ${player.userId.lastname || ''}` : 'Player not found'} 
          ({index === 0 ? 'Striker' : 'Non-striker'})
        </li>
      );
    });
  };

  return (
    <div className='coin-page'>
      <UserHeader />
      <div className="min-vh-100 bg-light py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-12">
              <div className="card shadow-lg">
                <div className="card-body text-center">
                  <h1 className="display-4 mb-4 d-flex align-items-center justify-content-center">
                    <Coins className="me-2" size={40} />
                    Cricket Toss 
                  </h1>

                  {error && (
                    <div className="alert alert-danger mb-4">
                      {error}
                      <button 
                        className="btn btn-sm btn-outline-danger ms-3"
                        onClick={() => setError(null)}
                      >
                        Dismiss
                      </button>
                    </div>
                  )}

                  {/* Team Selection */}
                  {stage === 'team-selection' && (
                    <div className="mb-4">
                      <h5 className="mb-3">Who's Calling:</h5>
                      <div className="d-flex justify-content-center gap-3">
                        <button
                          className={`btn btn-lg ${selectedTeam === 'team1' ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => handleTeamSelect('team1')}
                        >
                          Team {team1Name}
                        </button>
                        <button
                          className={`btn btn-lg ${selectedTeam === 'team2' ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => handleTeamSelect('team2')}
                        >
                          Team {team2Name}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Coin Toss */}
                  {stage === 'coin-toss' && (
                    <>
                      <div className="mb-4">
                        <h5 className="mb-3">{selectedTeam === 'team1' ? `Team ${team1Name}` : `Team ${team2Name}`} is Calling</h5>
                        <h5 className="mb-3">Make your call:</h5>
                        <div className="d-flex justify-content-center gap-3 mb-4">
                          <button
                            className={`btn btn-lg ${selectedChoice === 'heads' ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={() => setSelectedChoice('heads')}
                            disabled={isFlipping}
                          >
                            Heads
                          </button>
                          <button
                            className={`btn btn-lg ${selectedChoice === 'tails' ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={() => setSelectedChoice('tails')}
                            disabled={isFlipping}
                          >
                            Tails
                          </button>
                        </div>
                      </div>

                      <div className="coin-container mb-4">
                        <div className="coin">
                          <div
                            className="coin-inner"
                            style={{
                              transform: `rotateY(${rotations}deg)`,
                              transition: isFlipping ? 'transform 2s ease-out' : 'none'
                            }}
                          >
                            <div className="side heads">HEADS</div>
                            <div className="side tails">TAILS</div>
                          </div>
                        </div>
                      </div>

                      <button
                        className="btn btn-primary btn-lg"
                        onClick={flipCoin}
                        disabled={!selectedChoice || isFlipping}
                      >
                        {isFlipping ? 'Flipping...' : 'Flip Coin!'}
                      </button>
                    </>
                  )}

                  {/* Decision */}
                  {stage === 'decision' && (
                    <div className="mb-4">
                      <div className="alert alert-info mt-4">
                        <h4>It landed on {currentSideUp}!</h4>
                        <h4 className="mt-2">
                          <strong>{tossWinner === 'team1' ? `Team ${team1Name}` : `Team ${team2Name}`} won the toss!</strong>
                        </h4>
                      </div>

                      <h5 className="mb-3">{tossWinner === 'team1' ? `Team ${team1Name}` : `Team ${team2Name}`}, choose:</h5>
                      <div className="d-flex justify-content-center gap-3">
                        <button
                          className="btn btn-success btn-lg"
                          onClick={() => handleDecision('batting')}
                        >
                          Bat First
                        </button>
                        <button
                          className="btn btn-info btn-lg"
                          onClick={() => handleDecision('bowling')}
                        >
                          Bowl First
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Player Selection */}
                  {stage === 'player-selection' && (
                    <div className="player-selection">
                      <div className="alert alert-success mb-4">
                        <h4>
                          {tossWinner === 'team1' ? `Team ${team1Name}` : `Team ${team2Name}`} chose to {decision} first!
                        </h4>
                      </div>

                      {loadingPlayers ? (
                        <div className="text-center py-4">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          <p>Loading players...</p>
                        </div>
                      ) : (
                        <>
                          <div className="row mb-4">
                            <div className="col-md-6">
                              <h5>Select Opening Batsmen:</h5>
                              <div className="mb-3">
                                <label className="form-label">Striker:</label>
                                <select 
                                  className="form-select form-select-lg mb-3"
                                  value={openingBatsmen[0] || ''}
                                  onChange={(e) => handleBatsmanSelect(0, e.target.value)}
                                >
                                  <option value="">Select Player</option>
                                  {renderPlayerOptions(battingTeamPlayers)}
                                </select>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Non-striker:</label>
                                <select 
                                  className="form-select form-select-lg"
                                  value={openingBatsmen[1] || ''}
                                  onChange={(e) => handleBatsmanSelect(1, e.target.value)}
                                  disabled={!openingBatsmen[0]}
                                >
                                  <option value="">Select Player</option>
                                  {openingBatsmen[0] ? 
                                    renderPlayerOptions(battingTeamPlayers, openingBatsmen[0]) : 
                                    renderPlayerOptions(battingTeamPlayers)}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <h5>Select Opening Bowler:</h5>
                              <select 
                                className="form-select form-select-lg"
                                value={openingBowler || ''}
                                onChange={(e) => handleBowlerSelect(e.target.value)}
                              >
                                <option value="">Select Player</option>
                                {renderPlayerOptions(bowlingTeamPlayers)}
                              </select>
                            </div>
                          </div>

                          <button
                            className="btn btn-primary btn-lg"
                            onClick={confirmPlayerSelection}
                            disabled={!Array.isArray(openingBatsmen) || openingBatsmen.some(b => b === null) || openingBowler === null}
                          >
                            Confirm Selection
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {/* Final Result */}
                  {stage === 'result' && (
                    <div className="position-relative">
                      {showCrackAnimation && (
                        <div className="crack-animation">
                          <svg viewBox="0 0 500 500" width="100%" height="200">
                            <path className="crack" d="M250,0 L230,120 L280,150 L240,220 L270,250 L220,300 L250,500" 
                                  stroke="#ffcc00" strokeWidth="10" fill="none" />
                            <path className="crack" d="M250,0 L190,100 L220,180 L170,220 L200,280 L150,350 L100,500" 
                                  stroke="#ffcc00" strokeWidth="8" fill="none" />
                            <path className="crack" d="M250,0 L300,80 L270,140 L320,200 L280,260 L330,320 L400,500" 
                                  stroke="#ffcc00" strokeWidth="8" fill="none" />
                          </svg>
                        </div>
                      )}

                      <div className="alert alert-success mt-4 final-result">
                        <h4 className="mb-0">
                          <strong>{tossWinner === 'team1' ? `Team ${team1Name}` : `Team ${team2Name}`}</strong> won the toss and chose to <strong>{decision}</strong> first!
                        </h4>
                        <div className="mt-3">
                          <p><strong>Opening Batsmen:</strong></p>
                          <ul className="list-unstyled">
                            {renderOpeningBatsmen()}
                          </ul>
                          <p className="mt-2">
                            <strong>Opening Bowler:</strong> {
                              Array.isArray(bowlingTeamPlayers) 
                                ? bowlingTeamPlayers.find(p => p.userId._id === openingBowler)?.userId?.firstname || 'Unknown'
                                : 'Unknown'
                            }
                          </p>
                        </div>
                      </div>

                      <button
                        className="btn btn-primary btn-lg mt-4"
                        onClick={navigateToMatch}
                      >
                        Start Match
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserFooter />
    </div>
  );
}

export default CricketToss;