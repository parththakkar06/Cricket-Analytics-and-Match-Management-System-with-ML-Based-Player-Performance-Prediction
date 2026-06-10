import React, { useEffect, useState } from 'react';
import { FaEdit, FaCalendar, FaMapMarkerAlt, FaUsers, FaIdBadge, FaTableTennis, FaPlus, FaList } from 'react-icons/fa';
import '../tournaments/tour.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const TournamentDetails = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [tournamentData, setTournamentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { tournamentId } = useParams();
  
  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/tournament/tournament/${tournamentId}`);
        console.log('origa.....',response.data.data.orgnaizername);
        setTournamentData(response.data?.data || response.data || {});
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTournamentData();
  }, [tournamentId]); // Add tournamentId as dependency

  const handleCardClick = (type) => {
    setActivePopup(type);
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  const handleScheduleMatches = () => {
    navigate(`/selectteam/${tournamentId}`);
  };

  const handlelistmatches = () => {
    navigate(`/listmatches/${tournamentId}`);
  };
  
  const handleStartMatches = () => {
    alert('Start Matches functionality to be implemented');
  };
  
  const handleAddTeam = () => {
    navigate(`/team/add/${tournamentId}`);
  };

  if (loading) {
    return <p>Loading tournament data...</p>;
  }

  if (!tournamentData || Object.keys(tournamentData).length === 0) {
    return <p>No tournament data found.</p>;
  }

  return (
    <div className="tournament-details-fullpage">
      <div className="tournament-sidebar-fullpage">
        <div className="organizer-profile-fullpage">
          <div className="profile-icon-fullpage">
            <img src="/api/placeholder/100/100" alt="Organizer" />
           
          </div>
          <div className="organizer-info-fullpage">
            <h5>{tournamentData.orgnaizername || "Organizer Name Not Available"}</h5>
            <p>{tournamentData.city || "City Not Available"}</p>
          </div>
        </div>
        <div className="tournament-info-section-fullpage">
          <h4>{tournamentData.tournamentname || "Tournament Name Not Available"}</h4>

          <div className="info-item-fullpage">
            <FaMapMarkerAlt className="info-icon-fullpage" />
            <div>
              <strong>Category</strong>
              <p>{tournamentData.category || "N/A"}</p>
            </div>
          </div>
          <div className="info-item-fullpage">
            <FaTableTennis className="info-icon-fullpage" />
            <div>
              <strong>Ball Type</strong>
              <p>{tournamentData.balltype || "N/A"}</p>
            </div>
          </div>
          <div className="info-item-fullpage">
            <FaIdBadge className="info-icon-fullpage" />
            <div>
              <strong>Pitch Type</strong>
              <p>{tournamentData.pithchtype || "N/A"}</p>
            </div>
          </div>

          <button className="edit-btn-fullpage">
            <FaEdit /> Edit Tournament
          </button>
          
         
        </div>
      </div>
      <div className="tournament-nav-cards-fullpage">
        <div className="nav-card-fullpage matches-card-fullpage" onClick={() => handleCardClick('matches')}>
          <h3>Matches</h3>
        </div>
        <div className="nav-card-fullpage tournament-card-fullpage">
          <Link to={`/team/tour/team/${tournamentId}`} className="btn-team-link"><h4>Teams</h4></Link>
        </div>
        <div className="nav-card-fullpage tournament-card-fullpage">
          <Link to={`/team/${tournamentId}`} className="btn-team-link"><h4>add team</h4></Link>
        </div>
        <div className="nav-card-fullpage tournament-card-fullpage">
          <Link to={`/match/match/tour/${tournamentId}`} className="btn-team-link"><h4>list match</h4></Link>
        </div>
      </div>
      {activePopup && (
        <div className="popup-overlay-fullpage" onClick={closePopup}>
          <div className="popup-content-fullpage" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup-fullpage" onClick={closePopup}>×</button>
            <h2>Tournament Matches</h2>
            <div className="match-action-buttons">
              <button className="schedule-matches-btn" onClick={handleScheduleMatches}>Schedule Matches</button>
              <button className="start-matches-btn" onClick={handleStartMatches}>Start Matches</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentDetails;