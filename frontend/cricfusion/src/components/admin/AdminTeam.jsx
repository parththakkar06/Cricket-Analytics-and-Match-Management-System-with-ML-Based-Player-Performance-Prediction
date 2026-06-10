import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AdminSidedbar } from './AdminSidedbar';
import '../../assets/UserList.css';
import { Link } from 'react-router-dom';

export const AdminTeam = () => {
    const [teams, setTeams] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    
    const getApiCall = async () => {
        try {
            // Get teams data
            const teamsRes = await axios.get("http://localhost:3002/team/team");
            setTeams(teamsRes.data.data);

            // Get tournaments data
            const tournamentRes = await axios.get("http://localhost:3002/tournament/tournament");
            console.log('Tournament Response:', tournamentRes.data);
            setTournaments(tournamentRes.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const deleteTeam = async (teamId) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this team?");
            if (confirmed) {
                await axios.delete(`http://localhost:3002/team/team/${teamId}`);
                getApiCall(); // Refresh the list after deletion
                alert("Team deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting team:", error);
            alert("Failed to delete team");
        }
    };
    useEffect(() => {
        getApiCall();
    }, []);

    // Helper function to get tournament name from ID
    const getTournamentName = (tournamentId) => {
        if (!tournaments || !Array.isArray(tournaments)) return 'N/A';
        const tournament = tournaments.find(t => t._id === tournamentId);
        return tournament?.tournamentname || 'N/A';
    };

    // Remove this line as it's causing the error
    // <td>{team.tournamentname || getTournamentName(team.tournamentId)}</td>
    useEffect(() => {
        getApiCall();
    }, []);

    // Helper function to get tournament name from ID
    // const getTournamentName = (tournamentId) => {
    //     const tournament = tournaments.find(t => t._id === tournamentId);
    //     return tournament ? tournament.tournamentname : 'N/A';
    // };

    // Filter teams based on search term
    const filteredTeams = teams.filter(team => {
        const tournamentName = getTournamentName(team.tournamentId)?.toLowerCase() || '';
        
        return (
            team.teamname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            team.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tournamentName.includes(searchTerm.toLowerCase())
        );
    });

    // Get current teams for pagination
    const indexOfLastTeam = currentPage * usersPerPage;
    const indexOfFirstTeam = indexOfLastTeam - usersPerPage;
    const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);
    
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
                    <h2>Teams Data</h2>
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
                                <th>Team ID</th>
                                <th>Team Name</th>
                                <th>City</th>
                                <th>Tournament</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTeams.map((team) => (
                                <tr key={team._id}>
                                    <td>{team._id}</td>
                                    <td>{team.teamname}</td>
                                    <td>{team.city}</td>
                                    <td>{getTournamentName(team.tournamentId)}</td>  {/* Changed from team.tournamentname to team.tournamentId */}
                                    <td>
                                        <button
                                            onClick={() => deleteTeam(team._id)}
                                            className="btn btn-danger"
                                        >
                                            DELETE
                                        </button>
                                  
                                        <Link
                                            to={`/updatetournament/${team._id}`}
                                            className="btn btn-primary"
                                            style={{ marginLeft: "2px" }}
                                        >
                                            UPDATE
                                        </Link>
                                       
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="datatable-footer">
                    <div className="datatable-info">
                        Showing {indexOfFirstTeam + 1} to {Math.min(indexOfLastTeam, filteredTeams.length)} of {filteredTeams.length} entries
                    </div>
                    <div className="pagination">
                        <button 
                            onClick={() => paginate(currentPage - 1)} 
                            disabled={currentPage === 1}
                            className="page-nav"
                        >
                            &lt;
                        </button>
                        
                        {Array.from({ length: Math.ceil(filteredTeams.length / usersPerPage) }).map((_, index) => {
                            // Show limited page numbers with ellipsis
                            if (
                                index === 0 || 
                                index === Math.ceil(filteredTeams.length / usersPerPage) - 1 ||
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
                            disabled={currentPage === Math.ceil(filteredTeams.length / usersPerPage)}
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