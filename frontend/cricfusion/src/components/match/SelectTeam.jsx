import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaUsers, FaCheckCircle, FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../match/selectteam.css"; // Assuming you have a CSS file for styling

const SelectTeam = () => {
  const navigate = useNavigate();
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTeamList, setShowTeamList] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // Add state to track player counts for each team
  const [playerCounts, setPlayerCounts] = useState({});

  const { tournamentId } = useParams();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/team/tour/team/${tournamentId}`);
        console.log('API Response:', response.data.data);
        
        let teamData = [];
        
        if (Array.isArray(response.data)) {
          teamData = response.data;
        } else if (response.data?.teams) {
          teamData = response.data.teams;
        } else if (response.data?.data) {
          teamData = Array.isArray(response.data.data) 
            ? response.data.data 
            : [response.data.data];
        } else {
          throw new Error('Unexpected response format');
        }

        const validatedTeams = teamData
          .filter(team => team)
          .map(team => ({
            id: team._id || team.id || team.Team_Id || Math.random().toString(36).substr(2, 9),
            originalId: team._id || null,
            teamname: team.teamname || team.name || team.team_name || team.teamName || 'Unnamed Team',
            players: Array.isArray(team.players) ? team.players : [],
            logoChar: (team.teamname || '?').charAt(0).toUpperCase()
          }));

        if (validatedTeams.length === 0) {
          throw new Error('No teams found');
        }

        setTeams(validatedTeams);
        
        // Fetch player counts for each team
        fetchPlayerCounts(validatedTeams);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
        toast.error(`Failed to load teams: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    // New function to fetch player counts
    const fetchPlayerCounts = async (teamsList) => {
      const counts = {};
      
      for (const team of teamsList) {
        try {
          const response = await axios.get(`http://localhost:3002/teamplayer/teamplayer/player/${team.originalId || team.id}`);
          
          let playersData = [];
          if (Array.isArray(response.data.data)) {
            playersData = response.data.data;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            playersData = response.data.data;
          } else if (response.data.data && typeof response.data.data === 'object') {
            playersData = Object.values(response.data.data);
          }
          
          counts[team.id] = Array.isArray(playersData) ? playersData.length : 0;
        } catch (error) {
          console.error(`Error fetching players for team ${team.id}:`, error);
          counts[team.id] = 0;
        }
      }
      
      setPlayerCounts(counts);
    };

    fetchTeams();
  }, [tournamentId]);

  const handleSelectTeam = (team, type) => {
    if (type === "A") {
      setTeamA(team);
    } else {
      setTeamB(team);
    }
    setShowTeamList(null);
    setSearchTerm("");
  };

  const viewSquad = (team) => {
    // Updated to use URL parameters for teamId
    navigate(`/squad/${team.originalId || team.id}`, {
      state: {
        teamName: team.teamname,
        players: team.players,
        tournamentId: tournamentId
      }
    });
  };

  const clearSelection = (type) => {
    if (type === "A") {
      setTeamA(null);
    } else {
      setTeamB(null);
    }
  };

  const proceedToNextStep = () => {
    if (!teamA || !teamB) {
      toast.error("Please select both teams");
      return;
    }
    
    if (teamA.id === teamB.id) {
      toast.error("Cannot select the same team for both sides");
      return;
    }

    navigate('/matchsetup', { 
      state: { 
        tournamentId: tournamentId,
        team1Id: teamA.originalId || teamA.id,
        teamAName: teamA.teamname,
        team2Id: teamB.originalId || teamB.id,
        teamBName: teamB.teamname
      } 
    });
  };

  const filteredTeams = teams.filter(team => 
    team.teamname.toLowerCase().includes(searchTerm.toLowerCase()) &&
    team.id !== (showTeamList === "A" ? teamB?.id : teamA?.id)
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading teams...</p>
      </div>
    );
  }

  return (
    <div className="select-team-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2 className="title">Select Playing Teams</h2>
      <p className="sub-title">Create a new match by selecting two teams</p>

      <div className="team-selection-area">
        {/* Team A Selection */}
        <div className={`team-card ${teamA ? "selected" : ""}`}>
          {teamA ? (
            <div className="team-details">
              <div className="team-header">
                <div className="team-logo">{teamA.logoChar}</div>
                <h3>{teamA.teamname}</h3>
                <button 
                  className="clear-btn"
                  onClick={() => clearSelection("A")}
                >
                  <FaTimes />
                </button>
              </div>
              <button 
                className="squad-btn"
                onClick={() => viewSquad(teamA)}
              >
                View Squad ({playerCounts[teamA.id] || 0} players)
              </button>
            </div>
          ) : (
            <button 
              className="select-team-btn"
              onClick={() => setShowTeamList("A")}
            >
              <FaUsers className="icon" />
              <span>Select Team A</span>
            </button>
          )}
        </div>

        <div className="vs-divider">
          <span>VS</span>
        </div>

        {/* Team B Selection */}
        <div className={`team-card ${teamB ? "selected" : ""}`}>
          {teamB ? (
            <div className="team-details">
              <div className="team-header">
                <div className="team-logo">{teamB.logoChar}</div>
                <h3>{teamB.teamname}</h3>
                <button 
                  className="clear-btn"
                  onClick={() => clearSelection("B")}
                >
                  <FaTimes />
                </button>
              </div>
              <button 
                className="squad-btn"
                onClick={() => viewSquad(teamB)}
              >
                View Squad ({playerCounts[teamB.id] || 0} players)
              </button>
            </div>
          ) : (
            <button 
              className="select-team-btn"
              onClick={() => setShowTeamList("B")}
            >
              <FaPlus className="icon" />
              <span>Select Team B</span>
            </button>
          )}
        </div>
      </div>

      {teamA && teamB && (
        <div className="proceed-section">
          <button 
            className="proceed-btn"
            onClick={proceedToNextStep}
          >
            Continue to Match Setup
          </button>
        </div>
      )}

      {/* Team Selection Modal */}
      {showTeamList && (
        <div className="team-selection-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Select {showTeamList === 'A' ? 'Team A' : 'Team B'}</h3>
              <button 
                className="close-modal"
                onClick={() => {
                  setShowTeamList(null);
                  setSearchTerm("");
                }}
              >
                <FaTimes />
              </button>
            </div>

            <div className="search-box">
              <input
                type="text"
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>

            <div className="team-list">
              {filteredTeams.length > 0 ? (
                filteredTeams.map((team) => (
                  <div 
                    key={team.id}
                    className={`team-item ${
                      (showTeamList === "A" ? teamA : teamB)?.id === team.id ? "selected" : ""
                    }`}
                    onClick={() => handleSelectTeam(team, showTeamList)}
                  >
                    <div className="team-logo">{team.logoChar}</div>
                    <div className="team-info">
                      <h4>{team.teamname}</h4>
                      <p>{playerCounts[team.id] || 0} players</p>
                    </div>
                    {(showTeamList === "A" ? teamA : teamB)?.id === team.id && (
                      <FaCheckCircle className="selected-icon" />
                    )}
                  </div>
                ))
              ) : (
                <div className="no-results">
                  No teams found matching your search
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectTeam;