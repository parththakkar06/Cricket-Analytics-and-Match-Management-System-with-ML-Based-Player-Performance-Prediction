import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../tournaments/player.css';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

export const PlayerList = () => {
    const { register, handleSubmit, reset } = useForm();
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { teamId } = useParams();
    const navigate = useNavigate();
    console.log(teamId);

    // Fetch all players
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:3002/user/getuser");
                setPlayers(res.data.data);
            } catch (error) {
                console.error("Error fetching players:", error);
            } finally {
                setLoading(false);
            }
        };

        // Fetch selected players for the team
        const fetchSelectedPlayers = async () => {
            try {
                const res = await axios.get(`http://localhost:3002/teamplayer/teamplayer/player/${teamId}`);
                console.log(res.data.data);
                setSelectedPlayers(res.data.data);
            } catch (error) {
                console.error("Error fetching selected players:", error);
            }
        };

        fetchPlayers();
        fetchSelectedPlayers();
    }, [teamId]);

    // Add player to team
    const submitHandler = async (data) => {
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:3002/teamplayer/teamplayer", data);

            // After successful API call, fetch updated selected players
            const updatedPlayersRes = await axios.get(`http://localhost:3002/teamplayer/teamplayer/player/${teamId}`);
            setSelectedPlayers(updatedPlayersRes.data.data);

            toast.success('Player added successfully!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                theme: "dark",
                transition: Bounce,
            });
            reset();
        } catch (error) {
            console.error("Error adding player:", error);
            toast.error('Failed to add player to team', {
                position: "top-right",
                autoClose: 2000,
                theme: "dark",
                transition: Bounce,
            });
        } finally {
            setLoading(false);
        }
    };

    // Remove player from team
    const removePlayer = async (playerId) => {
        try {
            await axios.delete(`http://localhost:3002/teamplayer/teamplayer/${playerId}`);
            // Update local state to remove player immediately
            setSelectedPlayers(prev => prev.filter(player => player._id !== playerId));

            toast.info('Player removed', {
                position: "top-right",
                autoClose: 1000,
                theme: "dark",
                transition: Bounce,
            });
        } catch (error) {
            console.error("Error removing player:", error);
            toast.error('Failed to remove player', {
                position: "top-right",
                autoClose: 2000,
                theme: "dark",
                transition: Bounce,
            });
        }
    };

    // Helper function to safely get initials
    const getInitials = (player) => {
        if (!player || !player.userId) {
            return '??';
        }
        
        const firstInitial = player.userId.firstname ? player.userId.firstname.charAt(0).toUpperCase() : '';
        const lastInitial = player.userId.lastname ? player.userId.lastname.charAt(0).toUpperCase() : '';
        
        return firstInitial + lastInitial || '??';
    };

    // Helper function to safely get full name for unselected players (in dropdown)
    const getFullName = (player) => {
        if (!player) {
            return "Unknown Player";
        }
        return `${player.firstname || ''} ${player.lastname || ''}`.trim() || "Unknown Player";
    };
    
    // Helper function to safely get full name for selected players (with userId nesting)
    const getSelectedPlayerName = (player) => {
        if (!player || !player.userId) {
            return "Unknown Player";
        }
        return `${player.userId.firstname || ''} ${player.userId.lastname || ''}`.trim() || "Unknown Player";
    };

    // Go back to the previous page
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="player-list-container">
            <ToastContainer />
            <div className="player-form-section">
                <h1 className="player-list-title">Add Players</h1>
                <form onSubmit={handleSubmit(submitHandler)} className="player-form">
                    <div className="form-group">
                        <label htmlFor="playerId" className="form-label">PLAYER NAME</label>
                        <select id="playerId" {...register("userId")} className="form-select" required>
                            <option value="">Select player</option>
                            {players.map((player) => (
                                <option key={player._id} value={player._id}>
                                    {getFullName(player)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input
                        type="hidden"
                        id="teamId"
                        value={teamId}
                        {...register("teamId", { required: true })}
                    />
                    <div className="form-actions">
                        <button type="submit" className="submit-button" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Player'}
                        </button>
                    </div>
                </form>
                
                {/* Back button placed below the Add Player section */}
                <div className="back-button-container">
                    <button onClick={handleGoBack} className="back-button">
                        ← Back
                    </button>
                </div>
            </div>

            <div className="selected-players-section">
                <h2 className="selected-players-title">Selected Players</h2>
                {selectedPlayers.length === 0 ? (
                    <div className="no-players-message">No players selected yet</div>
                ) : (
                    <div className="player-cards-container">
                        {selectedPlayers.map((player) => (
                            <div key={player._id} className="player-card">
                                <div className="player-avatar">
                                    {getInitials(player)}
                                </div>
                                <div className="player-info">
                                    <h3 className="player-name">{getSelectedPlayerName(player)}</h3>
                                    {player.userId && player.userId.email && (
                                        <p className="player-email">{player.userId.email}</p>
                                    )}
                                </div>
                                <button 
                                    className="remove-player-button" 
                                    onClick={() => removePlayer(player._id)} 
                                    aria-label="Remove player"
                                >
                                    ❌
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};