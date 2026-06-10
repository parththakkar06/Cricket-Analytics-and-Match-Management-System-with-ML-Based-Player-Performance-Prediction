import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AdminSidedbar } from './AdminSidedbar';
import '../../assets/UserList.css';
import { Link } from 'react-router-dom';

export const UserStatsList = () => {
    const [userStats, setUserStats] = useState([]);
    const [users, setUsers] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [statsPerPage, setStatsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const getUsersData = async () => {
        try {
            const res = await axios.get("http://localhost:3002/user/getuser");
            // Create a map of userId to user data for quick lookup
            const usersMap = {};
            res.data.data.forEach(user => {
                usersMap[user._id] = user;
            });
            setUsers(usersMap);
            return usersMap;
        } catch (error) {
            console.error("Error fetching users:", error);
            return {};
        }
    };

    const getStatsData = async (usersMap) => {
        try {
            const res = await axios.get("http://localhost:3002/userscore/userscore");
            // Enhance user stats with user name information
            const enhancedStats = res.data.data.map(stat => {
                const user = usersMap[stat.userId] || {};
                return {
                    ...stat,
                    firstname: user.firstname || 'Unknown',
                    lastname: user.lastname || ''
                };
            });
            setUserStats(enhancedStats);
        } catch (error) {
            console.error("Error fetching user stats:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const usersMap = await getUsersData();
            await getStatsData(usersMap);
        };
        
        fetchData();
    }, []);

    // Filter user stats based on search term
    const filteredStats = userStats.filter(stat => {
        return (
            stat.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stat.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(stat.totalmatchplayed).includes(searchTerm) ||
            String(stat.totalplayedscores).includes(searchTerm)
        );
    });

    // Get current stats for pagination
    const indexOfLastStat = currentPage * statsPerPage;
    const indexOfFirstStat = indexOfLastStat - statsPerPage;
    const currentStats = filteredStats.slice(indexOfFirstStat, indexOfLastStat);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePerPageChange = (e) => {
        setStatsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    // Delete handler
    const deleteUserStat = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/userscore/deleteuserscore/${id}`);
            // Refresh data after deletion
            const usersMap = await getUsersData();
            await getStatsData(usersMap);
        } catch (error) {
            console.error("Error deleting user stat:", error);
        }
    };

    if (loading) {
        return (
            <div>
                <AdminSidedbar />
                <div className="datatable-container">
                    <div className="loading">Loading user statistics...</div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <AdminSidedbar />
            <div className="datatable-container">
                <div className="datatable-header">
                    <h2>Player Statistics</h2>
                    <button className="add-btn">+</button>
                </div>

                <div className="datatable-controls">
                    <div className="entries-per-page">
                        <select value={statsPerPage} onChange={handlePerPageChange}>
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
                            placeholder="Search by name or stats..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="datatable">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Matches</th>
                                <th>Runs</th>
                                <th>Innings</th>
                                <th>Average</th>
                                <th>Run Rate</th>
                                <th>50s</th>
                                <th>100s</th>
                                <th>6s</th>
                                <th>4s</th>
                                <th>Wickets</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentStats.map((stat) => (
                                <tr key={stat._id}>
                                    <td>{stat.firstname}</td>
                                    <td>{stat.lastname}</td>
                                    <td>{stat.totalmatchplayed}</td>
                                    <td>{stat.totalplayedscores}</td>
                                    <td>{stat.totalinnings}</td>
                                    <td>{stat.avg}</td>
                                    <td>{stat.scorerunrate}</td>
                                    <td>{stat.total50a}</td>
                                    <td>{stat.total100s}</td>
                                    <td>{stat.total6s}</td>
                                    <td>{stat.total4s}</td>
                                    <td>{stat.bowlerwick}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                deleteUserStat(stat._id);
                                            }}
                                            className="btn btn-danger"
                                        >
                                            DELETE
                                        </button>
                                        
                                        <Link to={`/updateuserstat/${stat._id}`}
                                            className="btn btn-primary"
                                            style={{ marginLeft: "2px" }}>UPDATE</Link>
                                        <Link to={`/viewuserstat/${stat._id}`}
                                            className="btn btn-info"
                                            style={{ marginLeft: "2px" }}>VIEW</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="datatable-footer">
                    <div className="datatable-info">
                        Showing {indexOfFirstStat + 1} to {Math.min(indexOfLastStat, filteredStats.length)} of {filteredStats.length} entries
                    </div>
                    <div className="pagination">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="page-nav"
                        >
                            &lt;
                        </button>

                        {Array.from({ length: Math.ceil(filteredStats.length / statsPerPage) }).map((_, index) => {
                            // Show limited page numbers with ellipsis
                            if (
                                index === 0 ||
                                index === Math.ceil(filteredStats.length / statsPerPage) - 1 ||
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
                            disabled={currentPage === Math.ceil(filteredStats.length / statsPerPage)}
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