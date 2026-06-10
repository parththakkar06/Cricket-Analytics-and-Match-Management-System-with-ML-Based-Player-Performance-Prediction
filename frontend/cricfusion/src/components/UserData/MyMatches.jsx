import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { UserHeader } from "../user/UserHeader";
import { UserFooter } from "../user/UserFooter";
import "../UserData/mymatch.css";

const MyMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Get user ID from token
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken._id);
      } catch (error) {
        console.error("Invalid token", error);
        setError("Authentication error. Please login again.");
        setLoading(false);
      }
    } else {
      setError("You must be logged in to view your matches.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch user's matches when userId is available
    const fetchUserMatches = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3002/match/match/user/${userId}`);
        
        console.log("Matches response:,,,,,", response.data);
        
        if (response.data && response.data.success) {
          setMatches(response.data.data);
        } else {
          setError("Failed to fetch matches data.");
        }
      } catch (err) {
        console.error("Error fetching matches:", err);
        setError("Error connecting to server. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserMatches();
    }
  }, [userId]);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <UserHeader />
      <div className="my-matches-container">
        <h1 className="page-title">My Matches</h1>
        
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading your matches...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            <p>{error}</p>
          </div>
        ) : matches.length === 0 ? (
          <div className="no-matches">
            <i className="fas fa-cricket"></i>
            <h2>No matches found</h2>
            <p>You haven't created or participated in any matches yet.</p>
            <Link to="/start-match" className="create-match-btn">
              Create Your First Match
            </Link>
          </div>
        ) : (
          <div className="matches1-grid">
            {matches.map((match) => (
              <div key={match._id} className="match1-card">
                <div className="match1-header">
                  <span className="match-date">{formatDate(match.date || match.createdAt)}</span>
                  <span className={`match-status ${match.status.toLowerCase()}`}>
                    {match.status}
                  </span>
                </div>
                
                <div className="teams1-container">
                  <div className="team3">
                    <h3>{match.teamA}</h3>
                    <span className="score">{match.teamAScore || '0'}/{match.teamAWickets || '0'}</span>
                  </div>
                  <div className="vs1">VS</div>
                  <div className="team3">
                    <h3>{match.teamB}</h3>
                    <span className="score">{match.teamBScore || '0'}/{match.teamBWickets || '0'}</span>
                  </div>
                </div>
                
                <div className="match1-footer">
                  <div className="match1-venue">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{match.venue || 'No venue specified'}</span>
                  </div>
                  
                  <div className="match1-actions">
                    <Link to={`/match-details/${match._id}`} className="view-btn">
                      View Details
                    </Link>
                    {match.status === 'UPCOMING' && (
                      <Link to={`/score/${match._id}`} className="score-btn">
                        Start Scoring
                      </Link>
                    )}
                    {match.status === 'LIVE' && (
                      <Link to={`/score/${match._id}`} className="score-btn live">
                        Continue Scoring
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <UserFooter />
    </>
  );
};

export default MyMatches;