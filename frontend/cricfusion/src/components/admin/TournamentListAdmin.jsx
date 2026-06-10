import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AdminSidedbar } from './AdminSidedbar';
import '../../assets/UserList.css';
import { Link } from 'react-router-dom';

export const TournamentListAdmin = () => {
    const [tournaments, setTournaments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [tournamentsPerPage, setTournamentsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    const getApiCall = async () => {
        try {
            const res = await axios.get("http://localhost:3002/tournament/tournament");
            setTournaments(res.data.data);
        } catch (error) {
            console.error("Error fetching tournaments:", error);
        }
    };

    useEffect(() => {
        getApiCall();
    }, []);

    // Filter tournaments based on search term
    const filteredTournaments = tournaments.filter(tournament => {
        return (
            tournament.tournamentname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tournament.orgnaizername?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tournament.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tournament.category?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // Get current tournaments for pagination
    const indexOfLastTournament = currentPage * tournamentsPerPage;
    const indexOfFirstTournament = indexOfLastTournament - tournamentsPerPage;
    const currentTournaments = filteredTournaments.slice(indexOfFirstTournament, indexOfLastTournament);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePerPageChange = (e) => {
        setTournamentsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const deleteTournament = async (id) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this tournament?");
            if (confirmed) {
                await axios.delete(`http://localhost:3002/tournament/tournament/${id}`);
                getApiCall(); // Refresh the list after deletion
                alert("Tournament deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting tournament:", error);
            alert("Failed to delete tournament");
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div>
            <AdminSidedbar />
            <div className="datatable-container">
                <div className="datatable-header">
                    <h2>Tournament DataTable</h2>
                    <Link to="/addtournament" className="add-btn">+</Link>
                </div>

                <div className="datatable-controls">
                    <div className="entries-per-page">
                        <select value={tournamentsPerPage} onChange={handlePerPageChange}>
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
                                <th>Tournament Name</th>
                                <th>Organizer</th>
                                <th>Contact</th>
                                <th>City</th>
                                <th>Category</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Max Teams</th>
                                <th>Ball Type</th>
                                <th>Overs</th>
                                <th>Pitch Type</th>
                                <th>Match Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTournaments.map((tournament) => (
                                <tr key={tournament._id}>
                                    <td>{tournament.tournamentname}</td>
                                    <td>{tournament.orgnaizername}</td>
                                    <td>{tournament.orgnaizercontact}</td>
                                    <td>{tournament.city}</td>
                                    <td>{tournament.category}</td>
                                    <td>{formatDate(tournament.startdate)}</td>
                                    <td>{formatDate(tournament.enddate)}</td>
                                    <td>{tournament.maxteam}</td>
                                    <td>{tournament.balltype}</td>
                                    <td>{tournament.overs}</td>
                                    <td>{tournament.pithchtype}</td>
                                    <td>{tournament.matchtype}</td>
                                    <td>
                                        <button
                                            onClick={() => deleteTournament(tournament._id)}
                                            className="btn btn-danger"
                                        >
                                            DELETE
                                        </button>
                                  
                                        <Link 
                                            to={`/updatetournament/${tournament._id}`}
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
                        Showing {indexOfFirstTournament + 1} to {Math.min(indexOfLastTournament, filteredTournaments.length)} of {filteredTournaments.length} entries
                    </div>
                    <div className="pagination">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="page-nav"
                        >
                            &lt;
                        </button>

                        {Array.from({ length: Math.ceil(filteredTournaments.length / tournamentsPerPage) }).map((_, index) => {
                            // Show limited page numbers with ellipsis
                            if (
                                index === 0 ||
                                index === Math.ceil(filteredTournaments.length / tournamentsPerPage) - 1 ||
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
                            disabled={currentPage === Math.ceil(filteredTournaments.length / tournamentsPerPage)}
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