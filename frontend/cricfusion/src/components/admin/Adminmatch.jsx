import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AdminSidedbar } from './AdminSidedbar';
import '../../assets/UserList.css';
import { Link } from 'react-router-dom';

export const Adminmatch = () => {
    const [matches, setmatch] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [teams, setTeams] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    
    const getApiCall = async () => {
        try {
            // Get matches data
            const matchRes = await axios.get("http://localhost:3002/match/matchs");
            setmatch(matchRes.data.data);

            // Get tournaments data
            const tournamentRes = await axios.get("http://localhost:3002/tournament/tournament");
            setTournaments(tournamentRes.data.data);

            // Get teams data
            const teamsRes = await axios.get("http://localhost:3002/team/team");
            setTeams(teamsRes.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const deleteMatch = async (matchId) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this match?");
            if (confirmed) {
                await axios.delete(`http://localhost:3002/match/match/${matchId}`);
                getApiCall(); // Refresh the list after deletion
                alert("Match deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting match:", error);
            alert("Failed to delete match");
        }
    };

    useEffect(() => {
        getApiCall();
    }, []);

 // Updated helper functions
// First, define the helper functions
    const getTournamentName = (tournamentId) => {
        if (!tournaments || !Array.isArray(tournaments)) return 'N/A';
        const tournament = tournaments.find(t => t._id === tournamentId);
        return tournament?.tournamentname || 'N/A';
    };

    const getTeamName = (teamId) => {
        if (!teams || !Array.isArray(teams)) return 'N/A';
        const team = teams.find(t => t._id === teamId);
        return team?.teamname || 'N/A';
    };

    // Then, define the filtered matches
    const filteredMatches = matches.filter(m => {
        const team1Name = getTeamName(m.team1Id).toLowerCase();
        const team2Name = getTeamName(m.team2Id).toLowerCase();
        const tournamentName = getTournamentName(m.tournamentId).toLowerCase();

        return (
            team1Name.includes(searchTerm.toLowerCase()) ||
            team2Name.includes(searchTerm.toLowerCase()) ||
            tournamentName.includes(searchTerm.toLowerCase()) ||
            (m.city?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
            (m.groundname?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
        );
    });

    // Finally, get current matches for pagination
    const indexOfLastMatch = currentPage * usersPerPage;
    const indexOfFirstMatch = indexOfLastMatch - usersPerPage;
    const currentMatches = filteredMatches.slice(indexOfFirstMatch, indexOfLastMatch);
    
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePerPageChange = (e) => {
        setUsersPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    return (
        <div>
            <AdminSidedbar />
            <div className="datatable-container">
                <div className="datatable-header">
                    <h2>Matches Data</h2>
                    <button className="add-btn">+</button>
                </div>
                
                <div className="datatable-controls">
                    <div className="entries-per-page">
                        <select value={usersPerPage} onChange={handlePerPageChange}>
                        <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <span>entries per page</span>
                    </div>
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className="table-responsive">
                    <table className="datatable">
                        <thead>
                            <tr>
                                <th>Match ID</th>
                                <th>Tournament</th>
                                <th>Team 1</th>
                                <th>Team 2</th>
                                <th>Match Type</th>
                                <th>Total Overs</th>
                                <th>Overs/Bowler</th>
                                <th>Powerplay Overs</th>
                                <th>City</th>
                                <th>Ground</th>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>Ball Type</th>
                                <th>Pitch Type</th>
                                <th>Toss Winner</th>
                                <th>Toss Decision</th>
                                <th>1st Innings</th>
                                <th>2nd Innings</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMatches.map((m) => (
                                <tr key={m._id}>
                                    <td>{m._id}</td>
                                    <td>{getTournamentName(m.tournamentId)}</td>
                                    <td>{getTeamName(m.team1Id)}</td>
                                    <td>{getTeamName(m.team2Id)}</td>
                                    <td>{m.matchtype}</td>
                                    <td>{m.totalovers}</td>
                                    <td>{m.overperbowler}</td>
                                    <td>{m.totalpowerplayovers}</td>
                                    <td>{m.city}</td>
                                    <td>{m.groundname}</td>
                                    <td>{m.date}</td>
                                    <td>{m.stateTime}</td>
                                    <td>{m.balltype}</td>
                                    <td>{m.pithchtype}</td>
                                    <td>{getTeamName(m.tosswinningteam)}</td>
                                    <td>{m.tosswinningelected}</td>
                                    <td>{m.firstInningStatus}</td>
                                    <td>{m.secondInningStatus}</td>
                                    <button
                                            onClick={() => deleteMatch(matches._id)}
                                            className="btn btn-danger"
                                        >
                                            DELETE
                                        </button>
                                  
                                        <Link
                                            to={`/updatetournament/${matches._id}`}
                                            className="btn btn-primary"
                                            style={{ marginLeft: "1px" }}
                                        >
                                            UPDATE
                                        </Link>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="datatable-footer">
                    <div className="datatable-info">
                        Showing {indexOfFirstMatch + 1} to {Math.min(indexOfLastMatch, filteredMatches.length)} of {filteredMatches.length} entries
                    </div>
                    <div className="pagination">
                        <button 
                            onClick={() => paginate(currentPage - 1)} 
                            disabled={currentPage === 1}
                            className="page-nav"
                        >
                            &lt;
                        </button>
                        
                        {Array.from({ length: Math.ceil(filteredMatches.length / usersPerPage) }).map((_, index) => {
                            // Show limited page numbers with ellipsis
                            if (
                                index === 0 || 
                                index === Math.ceil(filteredMatches.length / usersPerPage) - 1 ||
                                (index >= currentPage - 2 && index <= currentPage + 2)
                            ) {
                                return (
                                    <button
                                        key={index}
                                        onClick={() => paginate(index + 1)}
                                        className={currentPage === index + 1 ? 'active' : ''}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            }
                            return null;
                        })}
                        
                        <button 
                            onClick={() => paginate(currentPage + 1)} 
                            disabled={currentPage === Math.ceil(filteredMatches.length / usersPerPage)}
                            className="page-nav"
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};