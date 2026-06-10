import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../match/listmatch.css';
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const ListMatch = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { tournamentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3002/match/match/tour/${tournamentId}`);

        console.log("API Response:", response.data.data);

        //here i want match id which is coming in response as_ _id 
        // and also need to store it in usestate
        let matchData = response.data.data;
        console.log("Match Data:", matchData);

        if (!Array.isArray(matchData)) {
          matchData = matchData.matches || [];
        }

        setMatches(matchData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching matches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [tournamentId]);

  const handleStartMatch = (matchId, team1, team2) => {
    navigate(`/coin/${tournamentId}`, {
      state: {
        matchId,
        team1Name: team1 ? team1.teamname : "TBD",
        team2Name: team2 ? team2.teamname : "TBD",
        tournamentId,
        team1Id:team1._id,
        team2Id:team2._id
        
      }
    });
  };


  const removeMatch = async (matchId) => {
    if (!window.confirm("Are you sure you want to delete this match?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3002/match/match/${matchId}`);
      toast.success('🦄 delete  league succefully..!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      // Remove match from state
      setMatches((prevMatches) => prevMatches.filter((match) => match._id !== matchId));
    } catch (err) {
      console.error("Error deleting match:", err);
      alert("Failed to delete match.");
    }
  };

  if (loading) return <p>Loading matches...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="list-match-container">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <h2 className="tournament-title">League Matches</h2>

      {matches.length === 0 ? (
        <p className="no-matches">No matches scheduled yet</p>
      ) : (
        matches.map((match) => (
          <div key={match._id || match.id} className="match-card">
            <div className="match-venue">
              <div className="venue-name">{match.ground}, {match.city}</div>
              <div className="match-specs">
                {match.date ? new Date(match.date).toLocaleDateString('en-GB') : 'TBD'} |
                {match.totalovers} Ov. | {match.balltype}
              </div>
            </div>

            <div className="match-type">{match.matchtype}</div>

            <div className="teams-container">
              <div className="team team1">
                {match.team1Id ? match.team1Id.teamname : "TBD"}
              </div>
              <div className="vs">vs</div>
              <div className="team team2">
                {match.team2Id ? match.team2Id.teamname : "TBD"}
              </div>
            </div>

            <div className="match-time">
              Match at {match.date && match.startTime ?
                new Date(`${match.date}T${match.startTime}`).toLocaleString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                }) : 'Time TBD'}
            </div>

            <div className="match-actions">
              <Link
                to={`/match/match/tour/${tournamentId}/match/${match._id || match.id}`}
                className="match-link"
              >
                {match.status || 'UPCOMING'}
              </Link>

              <button
                onClick={() => handleStartMatch(match._id, match.team1Id, match.team2Id)}
                className="start-match-btn"
                disabled={match.status && match.status !== 'UPCOMING'}
              >
                Start Match
              </button>


              <button
                className="remove-match-button"
                onClick={() => removeMatch(match._id || match.id)}
                aria-label="Remove match"
              >
                ❌
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ListMatch;
