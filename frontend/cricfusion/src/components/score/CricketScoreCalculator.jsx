import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CricketScoreboard = () => {
  const location = useLocation();
  const {
    team1Name: teamAName,
    team2Name: teamBName,
    team1Id: team1Id,
    team2Id: team2Id,
    openingBatsmen,
    openingBowler,
    tournamentId,
    matchId
  } = location.state || {};
  const [tossInfo, setTossInfo] = useState({
    winningTeam: '',
    decision: '' // 'bat' or 'field'
  });
  // Add innings related state
  const [innings, setInnings] = useState(1);
  const [showInningsChangeModal, setShowInningsChangeModal] = useState(false);
  const [secondInningsBatsmen, setSecondInningsBatsmen] = useState([]);
  const [secondInningsBowler, setSecondInningsBowler] = useState('');

  const [totalovers, setTotalOvers] = useState(20); // Default T20 match

  // Mock initial data
  const initialMatchData = {
    teams: [
      {
        id: team1Id || 1,
        name: teamAName || 'Team A',
        isBatting: true,
        players: openingBatsmen ? openingBatsmen.map((batsman, index) => ({
          id: batsman,
          name: `Batsman ${index + 1}`,
          isBatting: index < 2,
          isOut: false
        })) : [
          { id: 1, name: 'Batsman 1', isBatting: true, isOut: false },
          { id: 2, name: 'Batsman 2', isBatting: true, isOut: false }
        ]
      },
      {
        id: team2Id || 2,
        name: teamBName || 'Team B',
        isBatting: false,
        players: openingBowler ? [
          { id: openingBowler, name: 'Bowler 1', isBowling: true },
          { id: 7, name: 'Bowler 2', isBowling: false },
        ] : [
          { id: 6, name: 'Bowler 1', isBowling: true },
          { id: 7, name: 'Bowler 2', isBowling: false },
        ]
      }
    ],
    // venue: 'Cricket Stadium',
    // date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
  };

  const initialScoreData = {
    score: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
    runRate: 0,
    // target: 180,
    batsmen: openingBatsmen ? [
      {
        id: openingBatsmen[0],
        name: 'Batsman 1',
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        onStrike: true
      },
      {
        id: openingBatsmen[1],
        name: 'Batsman 2',
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        onStrike: false
      }
    ] : [
      { id: 1, name: 'Batsman 1', runs: 0, balls: 0, fours: 0, sixes: 0, onStrike: true },
      { id: 2, name: 'Batsman 2', runs: 0, balls: 0, fours: 0, sixes: 0, onStrike: false }
    ],
    currentBowler: {
      id: openingBowler || 6,
      name: 'Bowler 1',
      overs: 0,
      ballsBowled: 0,
      wickets: 0,
      runsConceded: 0,
      economy: 0
    },
    bowlers: openingBowler ? [
      { id: openingBowler, name: 'Bowler 1', overs: 0, ballsBowled: 0, wickets: 0, runsConceded: 0, economy: 0 },
      { id: 7, name: 'Bowler 2', overs: 0, ballsBowled: 0, wickets: 0, runsConceded: 0, economy: 0 }
    ] : [
      { id: 6, name: 'Bowler 1', overs: 0, ballsBowled: 0, wickets: 0, runsConceded: 0, economy: 0 },
      { id: 7, name: 'Bowler 2', overs: 0, ballsBowled: 0, wickets: 0, runsConceded: 0, economy: 0 }
    ],
    recentBalls: []
  };

  const [matchData, setMatchData] = useState(initialMatchData);
  const [scoreData, setScoreData] = useState(initialScoreData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBatsman, setSelectedBatsman] = useState('');
  const [showBatsmanDropdown, setShowBatsmanDropdown] = useState(false);
  const [showNoBallPopup, setShowNoBallPopup] = useState(false);
  const [noBallRuns, setNoBallRuns] = useState(0);
  const [showBowlerDropdown, setShowBowlerDropdown] = useState(false);
  const [selectedBowler, setSelectedBowler] = useState('');
  const [availableBatsmen, setAvailableBatsmen] = useState([]);
  const [availableBowlers, setAvailableBowlers] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [playerNameMap, setPlayerNameMap] = useState({});
  const [showWidePopup, setShowWidePopup] = useState(false);
  const [wideRuns, setWideRuns] = useState(0);
  const [showByePopup, setShowByePopup] = useState(false);
  const [byeRuns, setByeRuns] = useState(0);
  const [matchDetails, setMatchDetails] = useState(totalovers);
  const [showWicketPopup, setShowWicketPopup] = useState(false);
const [dismissalType, setDismissalType] = useState('');
const [fielderId, setFielderId] = useState('');

const [secondavailableBatsmen, setsecondAvailableBatsmen] = useState([]);
const [secondavailableBowlers, setsecondAvailableBowlers] = useState([]);

const [matchCompleted, setMatchCompleted] = useState(false);
const [matchResult, setMatchResult] = useState('');

// const handleWicket = async () => {
//   setShowWicketPopup(true);
// };

// const getTeamPlayers = async (battingTeamId, bowlingTeamId) => {
//   const [battingRes, bowlingRes] = await Promise.all([
//     axios.get(`http://localhost:3002/teamplayer/teamplayer/player/${battingTeamId}`),
//     axios.get(`http://localhost:3002/teamplayer/teamplayer/player/${bowlingTeamId}`)
//   ]);

//   const batsmen = battingRes.data.data.map(p => ({
//     id: p.userId._id,
//     name: `${p.userId.firstname} ${p.userId.lastname || ''}`.trim()
//   }));

//   const bowlers = bowlingRes.data.data.map(p => ({
//     id: p.userId._id,
//     name: `${p.userId.firstname} ${p.userId.lastname || ''}`.trim()
//   }));

//   setAvailableBatsmen(bowlers);
//   setAvailableBowlers(batsmen);
//   console.log("Available batsmen:", batsmen);
//   console.log("Available bowlers:", bowlers);
// };

  // Add function to handle innings change
  const handleInningsChange = async () => {
    // if (!secondInningsBatsmen || secondInningsBatsmen.length < 2 || !secondInningsBowler) {
    //   setError('Please select two batsmen and a bowler for the second innings');
    //   return;
    // }

    try {
      setIsUpdating(true);
      // await new Promise(resolve => setTimeout(resolve, 500));

      // Save first innings score as target
      // const firstInningsScore = scoreData.score;

      
      // Reset score data for second innings
      const newScoreData = {
        ...initialScoreData,
        target: scoreData.score + 1,
        battingTeam: teamBName,
        bowlingTeam: teamAName,
        batsmen: [
          {
            id: secondInningsBatsmen[0].id,
            name: secondInningsBatsmen[0].name,
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            onStrike: true
          },
          {
            id: secondInningsBatsmen[1].id,
            name: secondInningsBatsmen[1].name,
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            onStrike: false
          }
        ],
        bowlers: [
          {
            id: secondInningsBowler.id,
            name: secondInningsBowler.name,
            overs: 0,
            ballsBowled: 0,
            wickets: 0,
            runsConceded: 0,
            economy: 0
          }
        ],
        currentBowler: {
          id: secondInningsBowler.id,
          name: secondInningsBowler.name,
          overs: 0,
          ballsBowled: 0,
          wickets: 0,
          runsConceded: 0,
          economy: 0
        }
      };

      // Update innings state
      setAvailableBatsmen(
        secondavailableBatsmen.filter(p => 
          !secondInningsBatsmen.some(b => String(b.id) === String(p.id))
        )
      );
      
      // Update available bowlers for second innings
      setAvailableBowlers(
        secondavailableBowlers.filter(p => 
          String(p.id) !== String(secondInningsBowler.id)
        )
      );
      
      setScoreData(newScoreData);
      setInnings(2);
      setShowInningsChangeModal(false);
      
      // Reset state for second innings
      setSecondInningsBatsmen([]);
      setSecondInningsBowler(null);
      
    } catch (error) {
      setError('Error starting second innings: ' + error.message);
    } finally {
      setIsUpdating(false);
    }
  };
  

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (isUpdating) return;
      setIsUpdating(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        setIsUpdating(false);
      }, delay);
    };
  };

  const handleWicket = async () => {
    setShowWicketPopup(true);
  };



  const confirmWicket = async () => {
    if (!dismissalType) {
      setError('Please select dismissal type');
      return;
    }
    
    if ((dismissalType === 'catchOut' || dismissalType === 'runOut' || dismissalType === 'stumpedOut') && !fielderId) {
      setError('Please select fielder');
      return;
    }
  
    try {
      setIsUpdating(true);
      
      // Get current batsman who's getting out
      const currentBatsman = scoreData.batsmen.find(b => b.onStrike);
      
      // Create the wicket update with dismissal details
      await handleUpdateScore('wicket', 0, currentBatsman, dismissalType, fielderId);
      
      setShowWicketPopup(false);
      setDismissalType('');
      setFielderId('');
      setShowBatsmanDropdown(true);
    } catch (error) {
      setError('Error recording wicket: ' + error.message);
    } finally {
      setIsUpdating(false);
    }
  };




  const handleNoBall = async () => {
    try {
      await handleUpdateScore('no');
    } catch (error) {
      setError('Error recording no ball: ' + error.message);
    }
  };

  const handleBye = async () => {
    try {
      await handleUpdateScore('bye');
    } catch (error) {
      setError('Error recording bye: ' + error.message);
    }
  };
  const saveMatchScoreToAPI = async (updateType, value, strikerBatsman, dismissalType = '', fielderId = null) => {
    try {
      if (!tournamentId || !matchId) {
        console.warn("Tournament ID or Match ID missing, can't save score data");
        return;
      }

      const currentBatsman = strikerBatsman || scoreData.batsmen.find(b => b.onStrike);
      const currentBowler = scoreData.currentBowler;

      if (!currentBatsman || !currentBowler) {
        console.error("Missing batsman or bowler data");
        return;
      }

      let bowleType = 'normal';
      if (updateType === 'extras') bowleType = 'wide';
      if (updateType === 'no') bowleType = 'no';

      let batType = 0;
      if (updateType === 'runs') batType = value;

      let outType = "not-out";
      let outPlayerId = null;
      let fieldingPlayerId = null;
      if (updateType === 'wicket') {
        outType = dismissalType || "bold";
        outPlayerId = currentBatsman.id;
      }

      if ((dismissalType === 'catchOut' || dismissalType === 'runOut' || dismissalType === 'stumpedOut') && fielderId) {
        fieldingPlayerId = fielderId;
      }

      const scorePayload = {
        matchId: matchId,
        tournamentId: tournamentId,
        inningtype: innings === 1 ? 'first' : 'second',
        bowlenumber: scoreData.balls + (scoreData.overs * 6),
        bowletype: bowleType,
        batType: batType,
        // totalovers:totalOversFromDB,
        bowlerId: currentBowler.id,
        batsmanId: currentBatsman.id,
        outType: outType,
        outPlayerId: outPlayerId,
        fieldingPlayerId: fieldingPlayerId
      };

      console.log("Sending score update:", scorePayload);
      const response = await axios.post('http://localhost:3002/matchscore/creatematchscore', scorePayload);

      if (response.data.data) {
        console.log("Ball recorded successfully:", response.data.data);
      } else {
        console.error("Failed to record ball:", response.data);
      }
    } catch (error) {
      console.error("Error saving ball data:", error);
      setError("Failed to save ball data: " + error.message);
    }
  };

  // Modify handleUpdateScore to check for innings completion
  const handleUpdateScore = async (updateType, value = 1, strikerBatsman = null, dismissalType = '', fielderId = '') => {
    if (isUpdating) return;

    try {
      setIsUpdating(true);
      await new Promise(resolve => setTimeout(resolve, 300));

      const currentStriker = scoreData.batsmen.find(b => b.onStrike);

      setScoreData(prevScore => {
        let newScore = { ...prevScore };
        let batsmenCopy = [...newScore.batsmen];
        let recentBallsCopy = [...newScore.recentBalls];
        let currentBowlerCopy = { ...newScore.currentBowler };
        let bowlersCopy = [...newScore.bowlers];

        
        const strikerIndex = batsmenCopy.findIndex(b => b.onStrike);
        const bowlerIndex = bowlersCopy.findIndex(b => b.id === currentBowlerCopy.id);

        // Create a totalBalls counter if it doesn't exist (to track overall balls bowled)
        if (newScore.totalBalls === undefined) {
          newScore.totalBalls = (newScore.overs * 6) + newScore.balls;
        }

        // Update bowler's balls bowled (except for extras)
        if (updateType !== 'extras' && updateType !== 'bye' && updateType !== 'no') {
          currentBowlerCopy.ballsBowled += 1;
        }

        // Process different ball types and update score
        switch (updateType) {


          case 'no':
            // Handle no ball - value includes the penalty run (1) + any additional runs scored
            newScore.score += value;
            currentBowlerCopy.runsConceded += value;
            
            // If there were additional runs scored by the batsman
            const additionalRuns = value - 1;
            if (additionalRuns > 0 && strikerIndex !== -1) {
              batsmenCopy[strikerIndex].runs += additionalRuns;
              
              if (additionalRuns === 4) batsmenCopy[strikerIndex].fours += 1;
              else if (additionalRuns === 6) batsmenCopy[strikerIndex].sixes += 1;
              
              // Change strike if odd number of additional runs
              if (additionalRuns % 2 === 1) {
                batsmenCopy.forEach(b => b.onStrike = !b.onStrike);
              }
            }
            
            // Don't increment total balls or batsman's balls faced (no ball doesn't count as legal delivery)
            recentBallsCopy.push(`Nb${additionalRuns > 0 ? additionalRuns : ''}`);
            break;
            
          case 'bye':
            newScore.score += 1;
            recentBallsCopy.push('B1');
            newScore.totalBalls += 1;
            
            // Switch strike on bye
            batsmenCopy.forEach(b => b.onStrike = !b.onStrike);
            break;
          case 'runs':
            newScore.score += value;
            if (strikerIndex !== -1) {
              batsmenCopy[strikerIndex].runs += value;
              batsmenCopy[strikerIndex].balls += 1;

              if (value === 4) batsmenCopy[strikerIndex].fours += 1;
              else if (value === 6) batsmenCopy[strikerIndex].sixes += 1;
            }
            newScore.totalBalls += 1; // Increment total balls
            recentBallsCopy.push(value.toString());
            currentBowlerCopy.runsConceded += value;

            if (value % 2 === 1) {
              batsmenCopy.forEach(b => b.onStrike = !b.onStrike);
            }
            break;

          case 'dot':
            if (strikerIndex !== -1) batsmenCopy[strikerIndex].balls += 1;
            newScore.totalBalls += 1; // Increment total balls
            recentBallsCopy.push('0');
            break;

          case 'extras':
            newScore.score += value;
            currentBowlerCopy.runsConceded += value;
            recentBallsCopy.push('Wd');
            break;

          case 'wicket':
            newScore.wickets += 1;
            if (strikerIndex !== -1) batsmenCopy[strikerIndex].balls += 1;
            newScore.totalBalls += 1; // Increment total balls
            recentBallsCopy.push('W');
            currentBowlerCopy.wickets += 1;
            break;

          case 'ball':
            newScore.totalBalls += 1; // Increment total balls
            break;

          case 'over':
            // Complete the current over if needed
            const remainingBalls = 6 - (newScore.totalBalls % 6);
            if (remainingBalls < 6) {
              newScore.totalBalls += remainingBalls;
              currentBowlerCopy.ballsBowled += remainingBalls;
            }

            // Show bowler selection dropdown
            setShowBowlerDropdown(true);

            // Switch striker/non-striker
            batsmenCopy.forEach(b => b.onStrike = !b.onStrike);
            break;

          // Handle other cases...
        }

        // Calculate overs from total balls
        newScore.overs = Math.floor(newScore.totalBalls / 6);
        newScore.balls = newScore.totalBalls % 6;

        // Calculate run rate using the total overs as a decimal
        const totalOversAsDecimal = newScore.overs + (newScore.balls / 6);
        newScore.runRate = totalOversAsDecimal > 0 ? newScore.score / totalOversAsDecimal : 0;

        // Update the bowler's overs display properly
        const bowlerBallsBowled = currentBowlerCopy.ballsBowled;
        currentBowlerCopy.overs = Math.floor(bowlerBallsBowled / 6) + (bowlerBallsBowled % 6) / 10;

        // Calculate economy properly
        const bowlerTotalOversAsDecimal = Math.floor(bowlerBallsBowled / 6) + (bowlerBallsBowled % 6) / 6;
        currentBowlerCopy.economy = bowlerTotalOversAsDecimal > 0
          ? currentBowlerCopy.runsConceded / bowlerTotalOversAsDecimal
          : 0;

        // Update bowler in bowlers array
        if (bowlerIndex !== -1) {
          bowlersCopy[bowlerIndex] = { ...currentBowlerCopy };
        }

        newScore.batsmen = batsmenCopy;
        newScore.bowlers = bowlersCopy;
        newScore.currentBowler = currentBowlerCopy;
        newScore.recentBalls = recentBallsCopy.slice(-10);

        // Check if innings is complete
        const isInningsComplete =
        (newScore.wickets >= 4) || // All out
        (newScore.overs >= matchData.totalover) || // Overs completed
        (innings === 2 && newScore.score >= newScore.target); // Target achieved
  
      if (isInningsComplete) {
        if (innings === 1) {
          setTimeout(() => {
            setShowInningsChangeModal(true);
          }, 1000);
        } else if (innings === 2) {
          // Set match as completed when target is achieved or all wickets down in second innings
          setMatchCompleted(true);
          
          if (newScore.score >= newScore.target) {
            setMatchResult(`${teamBName} won by ${4 - newScore.wickets} wickets with ${(matchData.totalover * 6) - ((newScore.overs * 6) + newScore.balls)} balls remaining`);
          } else {
            setMatchResult(`${teamAName} won by ${newScore.target - newScore.score - 1} runs`);
          }
        }
      }
  
      return newScore;
    });

      // Handle over completion check and bowler change
      setTimeout(() => {
        setScoreData(prev => {
          // Check if we need to change bowler (after 6 balls in an over)
          if (prev.totalBalls % 6 === 0 && prev.totalBalls > 0 && updateType !== 'over') {
            const updatedBatsmen = prev.batsmen.map(b => ({
              ...b,
              onStrike: !b.onStrike
            }));

            setShowBowlerDropdown(true);

            return {
              ...prev,
              batsmen: updatedBatsmen
            };
          }

          return prev;
        });
      }, 400);

      // Save to API after state update
      if (updateType !== 'over') {
        await saveMatchScoreToAPI(updateType, value, currentStriker, dismissalType, fielderId);
      }
    } catch (error) {
      setError(`Error updating ${updateType}: ${error.message}`);
    } finally {
      setIsUpdating(false);
    }
  };
  const handleMatchCompletion = async () => {
    try {
      setIsUpdating(true);
      
      // Here you would typically send a request to your API to mark the match as completed
      // For example:
      // await axios.post(`http://localhost:3002/match/complete/${matchId}`, {
      //   winner: matchResult.includes(teamBName) ? teamBName : teamAName,
      //   margin: matchResult.split('by ')[1],
      //   matchStatus: 'completed'
      // });
      
      // For now, we'll just simulate a success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to match summary or results page
      window.location.href = `/matchsummary/${matchId}`;
    } catch (error) {
      setError('Error completing match: ' + error.message);
    } finally {
      setIsUpdating(false);
    }
  };
  

  const debouncedHandleUpdateScore = debounce(handleUpdateScore, 300);
  const debouncedHandleWicket = debounce(handleWicket, 300);
  const debouncedHandleNoBall = debounce(handleNoBall, 300);
  const debouncedHandleBye = debounce(handleBye, 300);

  const fetchPlayerNames = async () => {
    try {
      const [team1Players, team2Players] = await Promise.all([
        axios.get(`http://localhost:3002/teamplayer/teamplayer/player/${team1Id}`),
        axios.get(`http://localhost:3002/teamplayer/teamplayer/player/${team2Id}`)
      ]);

      const nameMap = {};

      if (team1Players.data.data) {
        team1Players.data.data.forEach(player => {
          nameMap[player.userId._id] = `${player.userId.firstname} ${player.userId.lastname || ''}`;
        });
      }

      if (team2Players.data.data) {
        team2Players.data.data.forEach(player => {
          nameMap[player.userId._id] = `${player.userId.firstname} ${player.userId.lastname || ''}`;
        });
      }

      setPlayerNameMap(nameMap);

      setScoreData(prev => {
        const newBatsmen = prev.batsmen.map(batsman => ({
          ...batsman,
          name: nameMap[batsman.id] || batsman.name
        }));

        const newBowlers = prev.bowlers.map(bowler => ({
          ...bowler,
          name: nameMap[bowler.id] || bowler.name
        }));

        const newCurrentBowler = {
          ...prev.currentBowler,
          name: nameMap[prev.currentBowler.id] || prev.currentBowler.name
        };

        return {
          ...prev,
          batsmen: newBatsmen,
          bowlers: newBowlers,
          currentBowler: newCurrentBowler
        };
      });

      if (team2Players.data.data) {
        const availablePlayer = team2Players.data.data
          .filter(p => !openingBatsmen.includes(p.userId._id))
          .map(p => ({
            id: p.userId._id,
            name: nameMap[p.userId._id] || `Player ${p.userId._id}`
          }));
        setAvailableBatsmen(availablePlayer);
      }

      if (team1Players.data.data) {
        const availableBowler = team1Players.data.data
          .filter(p => p.userId._id !== openingBowler)
          .map(p => ({
            id: p.userId._id,
            name: nameMap[p.userId._id] || `Player ${p.userId._id}`
          }));
        setAvailableBowlers(availableBowler);
      }

    } catch (error) {
      console.error("Error fetching player names:", error);
      setError("Failed to load player names: " + error.message);
    }
  };

  useEffect(() => {
    if (showInningsChangeModal) {
      // Fetch players for second innings when modal opens
      const fetchSecondInningsPlayers = async () => {
        try {
          // For second innings, team2 is batting and team1 is bowling
          const [team1Response1, team2Response2] = await Promise.all([
            axios.get(`http://localhost:3002/teamplayer/teamplayer/player/${team2Id}`),
            axios.get(`http://localhost:3002/teamplayer/teamplayer/player/${team1Id}`)
          ]);
          
          // Set available batsmen from team2 (first innings bowling team)
          if (team2Response2.data.data) {
            const batsmen = team2Response2.data.data.map(p => ({
              id: p.userId._id,
              name: `${p.userId.firstname} ${p.userId.lastname || ''}`
            }));
            setsecondAvailableBatsmen(batsmen);
          }
          
          // Set available bowlers from team1 (first innings batting team)
          if (team1Response1.data.data) {
            const bowlers = team1Response1.data.data.map(p => ({
              id: p.userId._id,
              name: `${p.userId.firstname} ${p.userId.lastname || ''}`
            }));
            setsecondAvailableBowlers(bowlers);
          }
        } catch (error) {
          console.error("Error fetching players for second innings:", error);
          setError("Failed to load players for second innings: " + error.message);
        }
      };
      
      fetchSecondInningsPlayers();
    }
  }, [showInningsChangeModal, team1Id, team2Id]);
  

  const fetchMatchData = async () => {
    try {
      await fetchPlayerNames();

      if (matchId && tournamentId) {
        const matchResponse = await axios.get(`http://localhost:3002/match/match/${matchId}`);
        console.log("total overs...",matchResponse.data.data.totalovers)

        if (matchResponse.data && matchResponse.data.data) {
          const matchDetails = matchResponse.data.data;


          // const totalOversFromDB = matchDetails.totalovers;
          setMatchData(prevData => ({
            ...prevData,
            totalover: matchDetails.totalovers,
            venue: matchDetails.groundname || 'Cricket Stadium',
            date: matchDetails.date ?
              new Date(matchDetails.date).toLocaleDateString('en-US', {
                day: 'numeric', month: 'short', year: 'numeric'
              }) :
              new Date().toLocaleDateString('en-US', {
                day: 'numeric', month: 'short', year: 'numeric'
              })
          }));

          if (matchDetails.tosswinningteam && matchDetails.tosswinningelected) {
            const tossWinningTeamId = matchDetails.tosswinningteam;
            const tossWinningTeamName = tossWinningTeamId === team1Id ? teamAName : teamBName;
            const tossDecision = matchDetails.tosswinningelected;

            setTossInfo({
              winningTeam: tossWinningTeamName,
              decision: tossDecision
            });
          }
        } else {
          setMatchData(initialMatchData);
        }
      } else {
        setMatchData(initialMatchData);
      }
    } catch (error) {
      console.error('Error fetching match data:', error);
      setError('Error fetching match data: ' + error.message);
      setMatchData(initialMatchData);
    }
  };

  const fetchScoreData = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setScoreData(prevScore => prevScore);
      setIsLoading(false);
    } catch (error) {
      setError('Error fetching score data: ' + error.message);
      setIsLoading(false);
    }
  };

  const handleNewBatsman = async () => {
    if (!selectedBatsman) {
      setError('Please select a batsman');
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      setScoreData(prevScore => {
        let newScore = { ...prevScore };
        const outBatsmanIndex = newScore.batsmen.findIndex(b => b.onStrike);
        if (outBatsmanIndex !== -1) {
          const selectedPlayer = availableBatsmen.find(p => p.id.toString() === selectedBatsman.toString());

          if (selectedPlayer) {
            newScore.batsmen[outBatsmanIndex] = {
              id: selectedPlayer.id,
              name: selectedPlayer.name,
              runs: 0,
              balls: 0,
              fours: 0,
              sixes: 0,
              onStrike: true
            };
          }
        }
        return newScore;
      });

      setAvailableBatsmen(prev => prev.filter(p => p.id.toString() !== selectedBatsman.toString()));
      setShowBatsmanDropdown(false);
      setSelectedBatsman('');
    } catch (error) {
      setError('Error adding new batsman: ' + error.message);
    }
  };

  const handleChangeBowler = async () => {
    if (!selectedBowler) {
      setError('Please select a bowler');
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      setScoreData(prevScore => {
        let newScore = { ...prevScore };
        const selectedBowlerObj = newScore.bowlers.find(b => b.id.toString() === selectedBowler.toString());

        if (selectedBowlerObj) {
          newScore.currentBowler = { ...selectedBowlerObj };
        } else {
          const selectedPlayer = availableBowlers.find(p => p.id.toString() === selectedBowler.toString());

          if (selectedPlayer) {
            const newBowlerObj = {
              id: selectedPlayer.id,
              name: selectedPlayer.name,
              overs: 0,
              ballsBowled: 0,
              wickets: 0,
              runsConceded: 0,
              economy: 0
            };

            newScore.bowlers.push(newBowlerObj);
            newScore.currentBowler = newBowlerObj;
          }
        }

        // Reset balls count for new over
        newScore.balls = 0;
        return newScore;
      });

      setShowBowlerDropdown(false);
      setSelectedBowler('');
    } catch (error) {
      setError('Error changing bowler: ' + error.message);
    }
  };

  useEffect(() => {
    fetchMatchData();
    fetchScoreData();
  }, []);

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger text-center" role="alert">
          <i className="bi bi-exclamation-triangle-fill fs-1 mb-3 d-block"></i>
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
          <button
            className="btn btn-primary mt-2"
            onClick={() => {
              setError(null);
              fetchMatchData();
              fetchScoreData();
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading && !scoreData) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading scoreboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        {/* Match Details */}
        <div className="card-header bg-primary text-white">
          <h1 className="h3 mb-1">
            {teamAName || matchData?.teams?.[0]?.name} vs {teamBName || matchData?.teams?.[1]?.name}
          </h1>
          <p className="small mb-0">{matchData?.venue} • {matchData?.date} • {matchData?.totalover} overs match</p>
          <span className="badge bg-warning text-dark">Innings {innings}</span>
          {innings === 2 && scoreData.target && (
            <span className="badge bg-info text-dark ms-2">Target: {scoreData.target}</span>
          )}
          {matchCompleted && (
          <span className="badge bg-success text-white ms-2">Match Completed</span>
        )}

        </div>

        {/* Score Summary */}
        <div className="card-body bg-light">
          <div className="row">
            <div className="col-md-6">
              <h2 className="h1 fw-bold mb-0">
                {scoreData?.score}/{scoreData?.wickets}
              </h2>
              <h5 className="miduam text-muted">
                Overs: {scoreData.overs}.{scoreData.balls % 6} • CRR: {scoreData?.runRate?.toFixed(2)}
              </h5>
            </div>
            <div className="col-md-6 text-md-end">
              <h4 className="mb-0 fw-semibold">
                {tossInfo.winningTeam && (
                  <span className="small text-muted d-block">
                    {tossInfo.winningTeam} won toss and chose to {tossInfo.decision}
                  </span>
                )}
              </h4>
            </div>
          </div>
        </div>
        
        {/* Match Completion Banner */}
        {matchCompleted && (
          <div className="alert alert-success mt-3">
            <h4 className="alert-heading">Match Completed!</h4>
            <p>{matchResult}</p>
            <hr />
            <button 
              className="btn btn-success btn-lg w-100"
              onClick={handleMatchCompletion}
              disabled={isUpdating}
            >
              {isUpdating ? 'Finishing Match...' : 'Finish Match'}
            </button>
          </div>
        )}
    

        {/* Current Batsmen */}
        <div className="card-body border-bottom">
  <h3 className="h5 mb-3">Batsmen</h3>
  <div className="table-responsive">
    <table className="table table-sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Runs</th>
          <th>Balls</th>
          <th>4s</th>
          <th>6s</th>
          <th>SR</th>
        </tr>
      </thead>
      <tbody>
        {scoreData?.batsmen?.map(batsman => (
          <tr key={batsman.id}>
            <td className="fw-bold">{batsman.name} {batsman.onStrike ? '*' : ''}</td>
            <td>{batsman.runs}</td>
            <td>{batsman.balls}</td>
            <td>{batsman.fours}</td>
            <td>{batsman.sixes}</td>
            <td>{batsman.balls ? ((batsman.runs / batsman.balls) * 100).toFixed(1) : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

{/* Current Batsmen */}
{/* ... existing code ... */}
{/* Update Controls */}
<div className="card-body bg-light">
  <h3 className="h5 mb-3">Live Updates</h3>
  {!matchCompleted ? (
    <>
      <div className="alert alert-info mb-3">
        <strong>Mock Mode Active:</strong> Using local state instead of backend API. Updates are simulated locally.
      </div>
      {/* ... existing controls ... */}
    </>
  ) : null}
</div>

        {/* Bowler Information */}
        <div className="card-body border-bottom">
  {/* Team name section added above the current bowler heading */}
  {scoreData?.bowlingTeam && (
    <div className="mb-3">
      <h5 className="text-primary mb-2">Bowling Team</h5>
      <div className="bg-light p-2 rounded">
        <span className="fw-bold">{scoreData.bowlingTeam}</span>
      </div>
    </div>
  )}
  
  <h3 className="h5 mb-3">Current Bowler</h3>
  <div className="table-responsive">
    <table className="table table-sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Overs</th>
          <th>Wickets</th>
          <th>Runs</th>
          <th>Economy</th>
        </tr>
      </thead>
      <tbody>
        {scoreData?.currentBowler && (
          <tr>
            <td className="fw-bold">{scoreData.currentBowler.name}</td>
            <td>{Math.floor(scoreData.currentBowler.ballsBowled / 6)}.{(scoreData.currentBowler.ballsBowled % 6)}</td>
            <td>{scoreData.currentBowler.wickets}</td>
            <td>{scoreData.currentBowler.runsConceded}</td>
            <td>{scoreData.currentBowler.economy?.toFixed(2)}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

        {/* Last Few Balls */}
        <div className="card-body border-bottom">
          <h3 className="h5 mb-3">Last 6 Balls</h3>
          <div className="d-flex gap-2">
            {scoreData?.recentBalls?.slice(-6).map((ball, index) => (
              <div
                key={index}
                className={`rounded-circle d-flex align-items-center justify-content-center fw-bold text-white`}
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor:
                    ball === 'W' ? '#dc3545' :
                      ball === '6' ? '#6f42c1' :
                        ball === '4' ? '#198754' :
                          ball === '0' ? '#6c757d' :
                            ball === 'Wd' ? '#ffc107' :
                              ball.startsWith('B') ? '#17a2b8' :
                                ball === 'Nb' ? '#fd7e14' :
                                  '#0d6efd'
                }}
              >
                {ball}
              </div>
            ))}
          </div>
        </div>

        {/* Update Controls */}
        <div className="card-body bg-light">
          <h3 className="h5 mb-3">Live Updates</h3>

          <div className="alert alert-info mb-3">
            <strong>Mock Mode Active:</strong> Using local state instead of backend API. Updates are simulated locally.
          </div>

          {showBatsmanDropdown ? (
            <div className="alert alert-warning mb-4">
              <label className="form-label fw-bold">Select New Batsman:</label>
              <select
                value={selectedBatsman}
                onChange={(e) => setSelectedBatsman(e.target.value)}
                className="form-select mb-3"
              >
                <option value="">-- Select Batsman --</option>
                {availableBatsmen.map(player => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
              </select>
              <button
                onClick={handleNewBatsman}
                className="btn btn-success"
                disabled={isUpdating}
              >
                Confirm New Batsman
              </button>
            </div>
          ) : showBowlerDropdown ? (
            <div className="alert alert-warning mb-4">
              <label className="form-label fw-bold">Select Next Bowler:</label>
              <select
                value={selectedBowler}
                onChange={(e) => setSelectedBowler(e.target.value)}
                className="form-select mb-3"
              >
                <option value="">-- Select Bowler --</option>
                {scoreData.bowlers
                  .filter(bowler => bowler.id !== scoreData.currentBowler.id)
                  .map(bowler => (
                    <option key={bowler.id} value={bowler.id}>
                      {bowler.name} ({Math.floor(bowler.ballsBowled / 6)}.{(bowler.ballsBowled % 6)}-{bowler.wickets}-{bowler.runsConceded})
                    </option>
                  ))}
                {availableBowlers.map(player => (
                  <option key={player.id} value={player.id}>{player.name} (New)</option>
                ))}
              </select>
              <button
                onClick={handleChangeBowler}
                className="btn btn-success"
                disabled={isUpdating}
              >
                Confirm New Bowler
              </button>
            </div>
          ) : (
            <div className="row g-3">
              {/* Runs Buttons */}
              <div className="col-12">
                <h4 className="h6 mb-2">Add Runs:</h4>
                <div className="d-flex flex-wrap gap-2">
                  {[0, 1, 2, 3, 4, 6].map(run => (
                    <button
                      key={run}
                      onClick={() => debouncedHandleUpdateScore('runs', run)}
                      className={`btn ${run === 0 ? 'btn-outline-secondary' : run === 4 ? 'btn-outline-success' : run === 6 ? 'btn-outline-primary' : 'btn-outline-info'}`}
                      disabled={isUpdating}
                    >
                      {run === 0 ? 'Dot Ball' : run === 4 ? 'Four' : run === 6 ? 'Six' : `${run} Run${run !== 1 ? 's' : ''}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Buttons */}
              <div className="col-12">
                <h4 className="h6 mb-2">Special Events:</h4>
                <div className="d-flex flex-wrap gap-2">
                  <button
                    onClick={debouncedHandleWicket}
                    className="btn btn-outline-danger"
                    disabled={isUpdating}
                  >
                    Wicket
                  </button>
                  <button
                    onClick={() => setShowNoBallPopup(true)}
                    className="btn btn-outline-warning"
                    disabled={isUpdating}
                  >
                    No Ball
                  </button>
                  <button
                    onClick={() => setShowWidePopup(true)}
                    className="btn btn-outline-secondary"
                    disabled={isUpdating}
                  >
                    Wide
                  </button>
                  <button
                    onClick={() => setShowByePopup(true)}
                    className="btn btn-outline-info"
                    disabled={isUpdating}
                  >
                    Bye
                  </button>
                  <button
                    onClick={() => debouncedHandleUpdateScore('over')}
                    className="btn btn-outline-dark"
                    disabled={isUpdating}
                  >
                    Complete Over
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* No Ball Popup */}
      {showNoBallPopup && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">No Ball</h5>
                <button type="button" className="btn-close" onClick={() => {
                  setShowNoBallPopup(false);
                  setNoBallRuns(0);
                }}></button>
              </div>
              <div className="modal-body">
                <p>How many runs were scored off the no ball?</p>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {[0, 1, 2, 3, 4, 6].map(run => (
                    <button
                      key={run}
                      onClick={() => setNoBallRuns(run)}
                      className={`btn ${noBallRuns === run ? 'btn-primary' : 'btn-outline-primary'}`}
                    >
                      {run}
                    </button>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowNoBallPopup(false);
                    setNoBallRuns(0);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    debouncedHandleUpdateScore('no', noBallRuns + 1);
                    setShowNoBallPopup(false);
                    setNoBallRuns(0);
                  }}
                  disabled={isUpdating}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wide Ball Popup */}
{showWidePopup && (
  <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Wide Ball</h5>
          <button type="button" className="btn-close" onClick={() => {
            setShowWidePopup(false);
            setWideRuns(0);
          }}></button>
        </div>
        <div className="modal-body">
          <p>How many extra runs were conceded?</p>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {[0, 1, 2, 3, 4, 6].map(run => (
              <button
                key={run}
                onClick={() => setWideRuns(run)}
                className={`btn ${wideRuns === run ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                {run}
              </button>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setShowWidePopup(false);
              setWideRuns(0);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              debouncedHandleUpdateScore('extras', wideRuns + 1);
              setShowWidePopup(false);
              setWideRuns(0);
            }}
            disabled={isUpdating}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{/* Bye Popup */}
{showByePopup && (
  <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Bye Runs</h5>
          <button type="button" className="btn-close" onClick={() => {
            setShowByePopup(false);
            setByeRuns(0);
          }}></button>
        </div>
        <div className="modal-body">
          <p>How many bye runs were scored?</p>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {[0, 1, 2, 3, 4, 6].map(run => (
              <button
                key={run}
                onClick={() => setByeRuns(run)}
                className={`btn ${byeRuns === run ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                {run}
              </button>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setShowByePopup(false);
              setByeRuns(0);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              debouncedHandleUpdateScore('bye', byeRuns);
              setShowByePopup(false);
              setByeRuns(0);
            }}
            disabled={isUpdating}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Innings Change Modal */}
{/* Innings Change Modal */}


{showInningsChangeModal && (
  <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Innings Break</h5>
        </div>
        <div className="modal-body">
          <p>First innings completed. Please select batsmen and bowler for the second innings.</p>
          <div className="alert alert-info mb-3">
            {teamAName} scored {scoreData.score}/{scoreData.wickets} in {scoreData.overs}.{scoreData.balls} overs
          </div>
          <p className="mb-3 fw-bold">
            {teamBName} needs {scoreData.score + 1} runs to win
          </p>
          
          <div className="mb-3">
            <label className="form-label fw-bold">Select Opening Batsmen from {teamBName}:</label>
            <div className="row g-2">
              {[0, 1].map(index => (
                <div className="col-md-6" key={index}>
                  <select
                    value={secondInningsBatsmen[index]?.id || ''}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      if (!selectedId) return;
                      
                      // Find the selected player
                      const selectedPlayer = secondavailableBatsmen.find(p => 
                        String(p.id) === String(selectedId)
                      );
                      
                      if (selectedPlayer) {
                        // Create a copy of the current batsmen array
                        const newBatsmen = [...secondInningsBatsmen];
                        // Update the batsman at the specified index
                        newBatsmen[index] = {
                          id: selectedPlayer.id,
                          name: selectedPlayer.name
                        };
                        setSecondInningsBatsmen(newBatsmen);
                      }
                    }}
                    className="form-select"
                  >
                    <option value="">-- Select Batsman {index + 1} --</option>
                    {Array.isArray(secondavailableBatsmen) && secondavailableBatsmen.length > 0 ? (
                      secondavailableBatsmen
                        .filter(p => 
                          !secondInningsBatsmen.some(b => b && String(b.id) === String(p.id)) || 
                          (secondInningsBatsmen[index] && String(secondInningsBatsmen[index].id) === String(p.id))
                        )
                        .map(player => (
                          <option key={player.id} value={player.id}>
                            {player.name || `Player ${player.id}`}
                          </option>
                        ))
                    ) : (
                      <option value="">Loading players...</option>
                    )}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Select Opening Bowler from {teamAName}:</label>
            <select
              value={secondInningsBowler?.id || ''}
              onChange={(e) => {
                const selectedId = e.target.value;
                if (!selectedId) return;
                
                // Find the selected player
                const selectedPlayer = secondavailableBowlers.find(p => 
                  String(p.id) === String(selectedId)
                );
                
                if (selectedPlayer) {
                  setSecondInningsBowler({
                    id: selectedPlayer.id,
                    name: selectedPlayer.name
                  });
                }
              }}
              className="form-select"
            >
              <option value="">-- Select Bowler --</option>
              {Array.isArray(secondavailableBowlers) && secondavailableBowlers.length > 0 ? (
                secondavailableBowlers.map(player => (
                  <option key={player.id} value={player.id}>
                    {player.name || `Player ${player.id}`}
                  </option>
                ))
              ) : (
                <option value="">Loading bowlers...</option>
              )}
            </select>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleInningsChange}
            disabled={
              isUpdating || 
              !secondInningsBatsmen || 
              secondInningsBatsmen.length < 2 || 
              !secondInningsBatsmen[0] || 
              !secondInningsBatsmen[1] || 
              !secondInningsBowler
            }
          >
            {isUpdating ? 'Starting Innings...' : 'Start Second Innings'}
          </button>
        </div>
      </div>
    </div>
  </div>
)}



{/* wicketPopup */}
{showWicketPopup && (
  <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Wicket - Dismissal Details</h5>
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => {
              setShowWicketPopup(false);
              setDismissalType('');
              setFielderId('');
            }}
          ></button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label fw-bold">Dismissal Type:</label>
            <select
              value={dismissalType}
              onChange={(e) => setDismissalType(e.target.value)}
              className="form-select mb-3"
            >
              <option value="">-- Select Dismissal Type --</option>
              <option value="bold">Bowled</option>
              <option value="catchOut">Caught</option>
              <option value="runOut">Run Out</option>
              <option value="LBW">LBW</option>
              <option value="stumpedOut">Stumped</option>
              <option value="HeadWicket">Hit Wicket</option>
            </select>
          </div>
          
          {(dismissalType === 'catchOut' || dismissalType === 'runOut' || dismissalType === 'stumpedOut') && (
            <div className="mb-3">
              <label className="form-label fw-bold">
                {dismissalType === 'catchOut' ? 'Caught by:' : 
                 dismissalType === 'runOut' ? 'Run out by:' : 'Stumped by:'}
              </label>
              <select
                value={fielderId}
                onChange={(e) => setFielderId(e.target.value)}
                className="form-select mb-3"
              >
                <option value="">-- Select Fielder --</option>
                {/* Show all players from the bowling team */}
                {availableBowlers.map(player => (
                  <option key={player.id} value={player.id}>{player.name}</option>
                ))}
                {scoreData.bowlers.map(bowler => (
                  <option key={bowler.id} value={bowler.id}>{bowler.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setShowWicketPopup(false);
              setDismissalType('');
              setFielderId('');
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={confirmWicket}
            disabled={!dismissalType || ((dismissalType === 'catchOut' || dismissalType === 'runOut' || dismissalType === 'stumpedOut') && !fielderId)}
          >
            Confirm Wicket
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default CricketScoreboard;