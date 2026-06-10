import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../UserData/UserTeams.css';

const UserTeams = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.userId || user._id : null;

  useEffect(() => {
    const fetchTeams = async () => {
      if (!userId) {
        console.error('User ID not found');
        return;
      }
      
      try {
        const response = await axios.get(`http://localhost:3002/matchscore/getUserTeams/${userId}`);
        console.log('Teams Response:', response.data); // Debug log
        // Update this line to correctly access the teams data
        const teamsData = response.data.data.teams || [];
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setTeams([]);
      }
    };

    fetchTeams();
  }, [userId]);

  return (
    <div className="teams5-container">
      <h2 className="teams5-title">My Teams</h2>
      
      <div className="teams5-grid">
        {Array.isArray(teams) && teams.length > 0 ? (
          teams.map((team) => (
            <div 
              key={team._id} 
              className="team5-box"
              onClick={() => showTeamDetails(team)}
            >
              <div className="team5-icon">⚾</div>
              <h3 className="team5-title">{team.teamname}</h3>
              <div className="team5-details">
                {/* <p className="team-info"><span>Captain:</span> {team.captainName}</p> */}
                {/* <p className="team-info"><span>Players:</span> {team.totalPlayers}</p> */}
                <p className="team5-info"><span>City:</span> {team.city}</p>
                {/* <p className="team-info"><span>Category:</span> {team.category}</p> */}
                <p className="team5-date">
                  Created: {new Date(team.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-teams-message">No teams found</p>
        )}
      </div>

      {isModalVisible && selectedTeam && (
        <div className="team5-modal-overlay" onClick={() => setIsModalVisible(false)}>
          <div className="team5-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-dismiss" onClick={() => setIsModalVisible(false)}>×</button>
            <div className="modal-inner">
              <h2 className="modal-team-name">{selectedTeam.teamname}</h2>
              <div className="modal-team-info">
                <div className="info-row">
                  <span>Captain:</span> {selectedTeam.captainname}
                </div>
                <div className="info-row">
                  <span>Total Players:</span> {selectedTeam.totalplayers}
                </div>
                <div className="info-row">
                  <span>City:</span> {selectedTeam.city}
                </div>
                <div className="info-row">
                  <span>Category:</span> {selectedTeam.category}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTeams;