import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../teams/squad.css';

export const SquadList = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { teamId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const teamName = location.state?.teamName || 'Team';

  // Function to go back to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const getplayer = await axios.get(`http://localhost:3002/teamplayer/teamplayer/player/${teamId}`);
        
        console.log('Players Response ,,,,..:', getplayer.data.data);
        
        // Handle different response structures
        let playersData = [];
        if (Array.isArray(getplayer.data.data)) {
          playersData = getplayer.data.data;
        } else if (getplayer.data.data && Array.isArray(getplayer.data.data)) {
          playersData = getplayer.data.data;
        } else if (getplayer.data.data && typeof getplayer.data.data === 'object') {
          playersData = Object.values(getplayer.data.data);
        }
        
        // Ensure playersData is an array of valid player objects
        playersData = Array.isArray(playersData) ? playersData : [];
        
        // Log the player data to inspect its structure
        console.log('Processed player data:', playersData);
        
        setPlayers(playersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching players:', error);
        setError(error.response?.data?.message || 'Failed to fetch players');
        setLoading(false);
      }
    };

    if (teamId) {
      fetchPlayers();
    }
  }, [teamId]);

  const removePlayer = async (playerId) => {
    try {
      await axios.delete(`http://localhost:3002/teamplayer/teamplayer/${playerId}`);
      // Update local state to remove player immediately
      setPlayers(prev => prev.filter(player => player._id !== playerId));
    } catch (error) {
      console.error("Error removing player:", error);
    }
  };

  // Helper function to get player initials from first and last name
  const getPlayerInitials = (player) => {
    if (!player) return "?";
    
    // Handle both camelCase and lowercase property names
    const firstName = player.firstname || player.firstname || "";
    const lastName = player.lastname || player.lastname || "";
    
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`;
    } else if (firstName) {
      return firstName[0];
    } else if (lastName) {
      return lastName[0];
    } else {
      return "?";
    }
  };

  // Helper function to get full player name
  const getPlayerFullName = (player) => {
    console.log(player);
    
    if (!player) return "Unknown Player wwww";
    
    // Handle both camelCase and lowercase property names
    const firstName = player.userId.firstName || player.userId.firstname || "";
    const lastName = player.userId.lastName || player.userId.lastname || "";
    
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    } else if (lastName) {
      return lastName;
    } else {
      return "Unknown Player eeeeyyyy";
    }
  };

  return (
    <div className="squad-container">
      <div className="squad-card">
        <div className="squad-header">
          <h1>{teamName} Squad</h1>
        </div>
        <div className="squad-body">
          {loading && (
            <div className="squad-loading">
              <div className="squad-spinner"></div>
              <p>Loading players...</p>
            </div>
          )}

          {error && (
            <div className="squad-error">
              <p>Error: {error}</p>
            </div>
          )}

          {!loading && !error && players.length === 0 && (
            <div className="no-players">
              <p>No players found for this team.</p>
            </div>
          )}

          {!loading && !error && players.length > 0 && (
            <div className="player-list">
              {players.map((player, index) => (
                <div
                  key={player._id || `player-${index}`}
                  className="player-item"
                >
                  <div className="player-details">
                    <div className="player-avatar">{getPlayerInitials(player)}</div>
                    <div className="player-info">
                      <div className="player-name">{getPlayerFullName(player)}</div>
                      <div className="player-position">
                        {typeof player.position === 'string' ? player.position : 'Position not specified'}
                      </div>
                      <div className="player-userid">
                        ID: {typeof player.userId === 'string' ? player.userId : 
                            typeof player._id === 'string' ? player._id : 'Unknown'}
                      </div>
                    </div>
                  </div>
                  <div className="player-actions">
                    <span className="player-number">
                      #{typeof player.jerseyNumber === 'string' || typeof player.jerseyNumber === 'number' 
                        ? player.jerseyNumber : '00'}
                    </span>
                    <button 
                      className="remove-player" 
                      onClick={() => removePlayer(player._id)}
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Back button placed at the bottom */}
          <div className="back-button-container">
            <button onClick={handleGoBack} className="back-button">
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};