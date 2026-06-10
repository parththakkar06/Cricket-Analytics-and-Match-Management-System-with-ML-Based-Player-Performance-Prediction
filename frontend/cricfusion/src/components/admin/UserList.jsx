import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AdminSidedbar } from './AdminSidedbar';
import '../../assets/UserList.css';
import { Link } from 'react-router-dom';

export const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    const getApiCall = async () => {
        try {
            const res = await axios.get("http://localhost:3002/user/getuser");
            setUsers(res.data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        getApiCall();
    }, []);

    // Filter users based on search term
    const filteredUsers = users.filter(user => {
        return (
            user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // Get current users for pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePerPageChange = (e) => {
        setUsersPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const deleteUser = async (userId) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this user?");
            if (confirmed) {
                await axios.delete(`http://localhost:3002/user/user/${userId}`);
                // Refresh the user list after deletion
                getApiCall();
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user");
        }
    };

    return (
        <div>
            <AdminSidedbar />
            <div className="datatable-container">
                <div className="datatable-header">
                    <h2>DataTable Example</h2>
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
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Gender</th>
                                <th>DOB</th>
                                <th>ID</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.contact}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.DOB}</td>
                                    <td>{user._id}</td>
                                    <td>
                                        <button
                                            onClick={() => deleteUser(user._id)}
                                            className="btn btn-danger"
                                        >
                                            DELETE
                                        </button>
                                  
                                        <Link to={`/updateuser/${user._id}`}
                                            className="btn btn-primary"
                                            style={{ marginLeft: "2px" }}>UPDATE</Link>
                                             
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="datatable-footer">
                    <div className="datatable-info">
                        Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} entries
                    </div>
                    <div className="pagination">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="page-nav"
                        >
                            &lt;
                        </button>

                        {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }).map((_, index) => {
                            // Show limited page numbers with ellipsis
                            if (
                                index === 0 ||
                                index === Math.ceil(filteredUsers.length / usersPerPage) - 1 ||
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
                            disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
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