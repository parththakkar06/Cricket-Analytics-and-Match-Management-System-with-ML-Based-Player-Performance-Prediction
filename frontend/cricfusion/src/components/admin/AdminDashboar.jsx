import React, { useEffect, useState } from 'react';
import '../admin/admindashboard.css'; // Import the external CSS file
import { Link } from 'react-router-dom';

import axios from 'axios';
import { AdminSidedbar } from './AdminSidedbar';

export const AdminDashboar = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTeams, setTotalTeams] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const userResponse = await axios.get("http://localhost:3002/user/getuser");
        if (userResponse.data && userResponse.data.data) {
          setTotalUsers(userResponse.data.data.length);
        }

        // Fetch teams
        const teamResponse = await axios.get("http://localhost:3002/team/team");
        if (teamResponse.data && teamResponse.data.data) {
          setTotalTeams(teamResponse.data.data.length);
        }

        // Fetch matches
        const matchResponse = await axios.get("http://localhost:3002/match/matchs");
        if (matchResponse.data && matchResponse.data.data) {
          setTotalMatches(matchResponse.data.data.length);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update in the stats cards section
  return (
    <>
      <AdminSidedbar/>

      {/* Main Content */}
      <div className="main-content">
        <div className="header d-flex justify-content-between align-items-center">
          <div>
            <h2 className="mb-1">Welcome, Admin</h2>
            <p className="text-secondary mb-0">
              Here's what's happening with CricFusion today.
            </p>
          </div>
          <div className="time-filter btn-group">
            <button className="btn btn-outline-primary active">Today</button>
            <button className="btn btn-outline-primary">Week</button>
            <button className="btn btn-outline-primary">Month</button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row flex-nowrap overflow-hidden">
          <div className="col-md-3">
            <div className="stat-card">
              <div className="d-flex">
                <div className="icon bg-primary-subtle">
                  <i className="bi bi-clipboard-check text-primary" />
                </div>
                <div>
                  <div className="label" style={{color: "black"}}>Total Matches</div>
                  <div className="number" style={{color: "black"}}>
                    {loading ? "Loading..." : totalMatches}
                  </div>
                  <div className="change"style={{color: "black"}}>Updated just now</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card">
              <div className="d-flex">
                <div className="icon bg-danger-subtle">
                  <i className="bi bi-lightning-charge-fill text-danger" />
                </div>
                <div>
                  <div className="label"style={{color: "black"}}>Live Matches</div>
                  <div className="number" style={{color: "black"}}>3</div>
                  <div className="change" style={{color: "black"}}>Updated just now</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card">
              <div className="d-flex">
                <div className="icon bg-primary-subtle">
                  <i className="bi bi-people-fill text-primary" />
                </div>
                <div>
                  <div className="label" style={{color: "black"}}>Total Teams</div>
                  <div className="number" style={{color: "black"}}>
                    {loading ? "Loading..." : totalTeams}
                  </div>
                  <div className="change" style={{color: "black"}}>Updated just now</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card">
              <div className="d-flex">
                <div className="icon bg-success-subtle">
                  <i className="bi bi-person-fill text-success" />
                </div>
                <div>
                  <div className="label" style={{color: "black"}}>Registered Users</div>
                  <div className="number" style={{color: "black"}}>
                    {loading ? "Loading..." : totalUsers}
                  </div>
                  <div className="change" style={{color: "black"}}>Updated just now</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Matches Section */}
        <div className="row">
          <div className="col-lg-8">
            <div className="match-card">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Live Matches</h5>
              </div>
              <div className="match-list">
                {/* Match 1 */}
                <div className="match-item">
                  <div className="live-badge">LIVE</div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                      <div className="team-badge team-i me-2">I</div>
                      <span>India</span>
                    </div>
                    <div>
                      <span className="score">156/4</span>
                      <span className="overs">(18.2 ov)</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                      <div className="team-badge team-a me-2">A</div>
                      <span>Australia</span>
                    </div>
                    <div>
                      <span className="score">132/7</span>
                      <span className="overs">(20 ov)</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="text-secondary">
                      India needs 24 runs in 10 balls to win
                    </div>
                    <a href="#" className="text-primary">
                      View Details
                    </a>
                  </div>
                </div>
                {/* Match 2 */}
                <div className="match-item">
                  <div className="live-badge">LIVE</div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                      <div className="team-badge team-e me-2">E</div>
                      <span>England</span>
                    </div>
                    <div>
                      <span className="score">245/3</span>
                      <span className="overs">(42.1 ov)</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                      <div className="team-badge team-s me-2">S</div>
                      <span>South Africa</span>
                    </div>
                    <div>
                      <span className="score">-/-</span>
                      <span className="overs">(- ov)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Upcoming Matches Section */}
          <div className="col-lg-4">
            <div className="match-card">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Upcoming Matches</h5>
                <a href="#" className="text-primary">
                  View All
                </a>
              </div>
              <div className="match-list">
                {/* Upcoming Match 1 */}
                <div className="match-item">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-secondary">June 15, 2023</span>
                    <span className="badge bg-light text-dark">T20</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="team-badge team-i me-2">I</div>
                      <span>India</span>
                    </div>
                    <span>vs</span>
                    <div className="d-flex align-items-center">
                      <span>Australia</span>
                      <div className="team-badge team-a ms-2">A</div>
                    </div>
                  </div>
                </div>
                {/* Upcoming Match 2 */}
                <div className="match-item">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-secondary">June 18, 2023</span>
                    <span className="badge bg-light text-dark">ODI</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="team-badge team-e me-2">E</div>
                      <span>England</span>
                    </div>
                    <span>vs</span>
                    <div className="d-flex align-items-center">
                      <span>Pakistan</span>
                      <div className="team-badge team-p ms-2">P</div>
                    </div>
                  </div>
                </div>
                {/* Upcoming Match 3 */}
                <div className="match-item">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-secondary">June 20, 2023</span>
                    <span className="badge bg-light text-dark">T20</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="team-badge team-s me-2">S</div>
                      <span>Sri Lanka</span>
                    </div>
                    <span>vs</span>
                    <div className="d-flex align-items-center">
                      <span>Bangladesh</span>
                      <div className="team-badge team-b ms-2">B</div>
                    </div>
                  </div>
                </div>
                {/* Upcoming Match 4 */}
                <div className="match-item">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-secondary">June 25, 2023</span>
                    <span className="badge bg-light text-dark">Test</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="team-badge team-s me-2">S</div>
                      <span>South Africa</span>
                    </div>
                    <span>vs</span>
                    <div className="d-flex align-items-center">
                      <span>New Zealand</span>
                      <div className="team-badge team-n ms-2">N</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="match-card">
              <h5 className="mb-3">User Activity</h5>
              {/* Add user activity content here if needed */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};