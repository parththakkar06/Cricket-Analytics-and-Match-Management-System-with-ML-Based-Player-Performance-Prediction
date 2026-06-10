import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../UserData/UserTournament.css';

const UserTournament = () => {
  const [tournaments, setTournaments] = useState([]);  // Initialize as empty array
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.userId || user._id : null;

  useEffect(() => {
    const fetchTournaments = async () => {
      if (!userId) {
        console.error('User ID not found');
        return;
      }
      
      try {
        const response = await axios.get(`http://localhost:3002/matchscore/getusertournament/${userId}`);
        console.log('API Response:', response.data); // Debug log
        
        // Correctly access the tournaments data from response
        const tournamentsData = response.data.data.tournaments || [];
        setTournaments(tournamentsData);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
        setTournaments([]);
      }
    };

    fetchTournaments();
  }, [userId]);

  return (
    <div className="tournament1-wrapper">
      <h2 className="tournament1-heading">My Tournaments</h2>
      
      <div className="tournament1-grid">
        {Array.isArray(tournaments) && tournaments.length > 0 ? (
          tournaments.map((tournament) => (
            <div 
              key={tournament._id} 
              className="tournament1-card"
              onClick={() => openModal(tournament)}
            >
              <div className="tournament1-icon">🏆</div>
              <h3 className="tournament1-name">{tournament.tournamentname}</h3>
              <div className="tournament-info">
                <p className="info-item"><span>Ball Type:</span> {tournament.balltype}</p>
                <p className="info-item"><span>Category:</span> {tournament.category}</p>
                <p className="info-item"><span>Organizer:</span> {tournament.orgnaizername}</p>
                <p className="info-item"><span>Pitch:</span> {tournament.pithchtype}</p>
                <p className="info-item"><span>City:</span> {tournament.city}</p>
                <p className="tournament1-date">
                  {new Date(tournament.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-tournaments">No tournaments found</p>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-header">
              <h2 className="modal-title">{selectedTournament.tournamentName}</h2>
            </div>
            <div className="modal-body">
              <div className="tournament1-detail">
                <span className="detail-label">Date:</span>
                <span className="detail-value">
                  {new Date(selectedTournament.date).toLocaleDateString()}
                </span>
              </div>
              <div className="tournament1-detail">
                <span className="detail-label">Venue:</span>
                <span className="detail-value">{selectedTournament.venue}</span>
              </div>
              <div className="tournament1-detail">
                <span className="detail-label">Score:</span>
                <span className="detail-value">{selectedTournament.score}</span>
              </div>
              <div className="tournament1-detail">
                <span className="detail-label">Result:</span>
                <span className="detail-value">{selectedTournament.result}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTournament;