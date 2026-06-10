import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../tournaments/teamlist.css';
import { Bounce, toast, ToastContainer } from 'react-toastify';

export const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { touranmentId } = useParams();
  const navigate = useNavigate();

  // Function to handle team click and navigate to player page
  const handleTeamClick = (team) => {
    navigate(`/players/${team._id}`, {
      state: {
        teamId: team._id,
        teamName: team.teamName
      }
    });
  };

  // Function to go back to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  const removeteam = async (teamId) => {
    try {
      await axios.delete(`http://localhost:3002/team/team/${teamId}`);
      // Update local state to remove player immediately
      setTeams(prev => prev.filter(team => team._id !== teamId));

      toast.info('Team removed', {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error removing team:", error);
      toast.error('Failed to remove team', {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3002/team/tour/team/${touranmentId}`);
        console.log('Full API Response:', response);
        console.log('Response Data:', response.data);

        // Handle different possible response structures
        let teamsData = [];
        if (Array.isArray(response.data)) {
          teamsData = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          teamsData = response.data.data;
        } else if (response.data && typeof response.data === 'object') {
          teamsData = Object.values(response.data);
        }
        // Ensure teamsData is an array
        teamsData = Array.isArray(teamsData) ? teamsData : [];
        setTeams(teamsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);

        setError(error.response?.data?.message || 'Failed to fetch teams');
        setLoading(false);
        setTeams([]);
      }
    };

    if (touranmentId) {
      fetchTeams();
    }
  }, [touranmentId]);

  return (
    <div className="teamlist-container">
      <ToastContainer />
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h1>Tournament Teams</h1>
          </div>
          <div className="card-body">
            {loading && (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading teams...</p>
              </div>
            )}

            {error && (
              <div className="error-message">
                <p>Error: {error}</p>
              </div>
            )}

            {!loading && !error && teams.length === 0 && (
              <div className="no-teams-message">
                <p>No teams found for this tournament.</p>
              </div>
            )}

            {!loading && !error && teams.length > 0 && (
              <div className="list-group">
                {teams.map((team, index) => (
                  <div
                    key={team._id || team.teamname || `team-${index}`}
                    className="list-group-item"
                    onClick={() => handleTeamClick(team)}
                  >
                    <div className="team-name">{team.teamname || 'Unnamed Team'}</div>
                    <span className="team-badge">
                      Team {index + 1}
                    </span>
                    <button
                      className="remove-team-button"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent click event
                        removeteam(team._id);
                      }}
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Back button placed below the team list */}
            <div className="back-button-container">
              <button onClick={handleGoBack} className="back-button">
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};