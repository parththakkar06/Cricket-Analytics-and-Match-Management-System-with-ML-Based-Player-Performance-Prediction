import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../UserData/mystats.css';
import { UserHeader } from '../user/UserHeader';

const MyStats = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('batting');
  const [userId, setUserId] = useState('');

  // GET USER ID
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You must be logged in');
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUserId(decoded._id);
    } catch {
      setError('Invalid token');
      setLoading(false);
    }
  }, []);

  // FETCH DATA
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [profileRes, statsRes] = await Promise.all([
          axios.get(`http://localhost:3002/userprofile/userprofile/${userId}`),
          axios.get(`http://localhost:3002/matchscore/getmatchscorebyuserid/${userId}`)
        ]);

        const profile = profileRes.data?.data?.[0] || {};
        const stats = statsRes.data?.data || statsRes.data || {};

        setUserData({ profile, stats });
        setError(null);

      } catch (err) {
        console.error(err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <div className="loader-container"><div className="loader"></div></div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!userData) return null;

  const { profile, stats } = userData;
  const hasData = stats.totalmatchplayed > 0;

  return (
    <div>
      <UserHeader/>
    <div className="stats-container">

      {/* PROFILE */}
      <section className="profile2-section">
        <div className="profile2-content container">
          <div className="profile2-card">

            {/* 🔥 FIX: HEADER CLASS ADDED */}
            <div className="profile2-header">
              <h1>{profile.name || 'Cricket Player'}</h1>
            </div>

            <div className="profile2-body">

              {/* 🔥 FIX: AVATAR CONTAINER */}
              <div className="profile2-avatar-container">
                <div className="profile2-avatar">
                  <img src={profile.profilePicPath || '/default.png'} alt="Player" />
                </div>
              </div>

              {/* 🔥 FIX: DETAILS WRAPPER */}
              <div className="profile2-details">
                <div className="profile2-details-grid">

                  <div className="detail-item">
                    <h3>Role</h3>
                    <p>{profile.playingRole || 'N/A'}</p>
                  </div>

                  <div className="detail-item">
                    <h3>Batting</h3>
                    <p>{profile.battingStyle || 'N/A'}</p>
                  </div>

                  <div className="detail-item">
                    <h3>Bowling</h3>
                    <p>{profile.bowlingStyle || 'N/A'}</p>
                  </div>

                  <div className="detail-item">
                    <h3>Location</h3>
                    <p>{profile.location || 'N/A'}</p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SUMMARY */}
      <div className="summary-row">
        <div className="summary-card">🏏 Runs: {stats.totalplayedscores ?? 0}</div>
        <div className="summary-card">📈 Avg: {stats.avg?.toFixed(2) || '0.00'}</div>
        <div className="summary-card">🔥 SR: {stats.scorerunrate?.toFixed(2) || '0.00'}</div>
      </div>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-content container">
          <div className="stats-card">

            <div className="tabs">
              <button onClick={() => setActiveTab('batting')} className={`tab-button ${activeTab === 'batting' ? 'active' : ''}`}>
                Batting
              </button>
              <button onClick={() => setActiveTab('bowling')} className={`tab-button ${activeTab === 'bowling' ? 'active' : ''}`}>
                Bowling
              </button>
              <button onClick={() => setActiveTab('fielding')} className={`tab-button ${activeTab === 'fielding' ? 'active' : ''}`}>
                Fielding
              </button>
            </div>

            {!hasData && <p style={{ textAlign: "center" }}>No match data available</p>}

            {activeTab === 'batting' && hasData && (
              <div className="tab-content">
                <div className="stats-grid">
                  <Stat label="Matches" value={stats.totalmatchplayed} type="batting" />
                  <Stat label="Innings" value={stats.totalinnings} type="batting" />
                  <Stat label="Runs" value={stats.totalplayedscores} type="batting" />
                  <Stat label="Average" value={stats.avg?.toFixed(2)} type="batting" />
                  <Stat label="Strike Rate" value={stats.scorerunrate?.toFixed(2)} type="batting" />
                  <Stat label="50s" value={stats.total50a} type="batting" />
                  <Stat label="100s" value={stats.total100s} type="batting" />
                  <Stat label="Ducks" value={stats.totalducks} type="batting" />
                  <Stat label="Sixes" value={stats.total6s} type="batting" />
                  <Stat label="Fours" value={stats.total4s} type="batting" />
                </div>
              </div>
            )}

            {activeTab === 'bowling' && hasData && (
              <div className="tab-content">
                <div className="stats-grid">
                  <Stat label="Overs" value={stats.totalovers} type="bowling" />
                  <Stat label="Wickets" value={stats.bowlerwick} type="bowling" />
                  <Stat label="Runs Given" value={stats.totaloverscore} type="bowling" />
                  <Stat label="Economy" value={stats.totalovers ? (stats.totaloverscore / stats.totalovers).toFixed(2) : '0.00'} type="bowling" />
                  <Stat label="Maidens" value={stats.maidens} type="bowling" />
                  <Stat label="Wides" value={stats.bowlerwides} type="bowling" />
                  <Stat label="No Balls" value={stats.bowlernoballs} type="bowling" />
                </div>
              </div>
            )}

            {activeTab === 'fielding' && hasData && (
              <div className="tab-content">
                <div className="stats-grid">
                  <Stat label="Catches" value={stats.totalcatches} type="fielding" />
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
    </div>
  );
};

const Stat = ({ label, value, type }) => (
  <div className={`stat-item ${type}-stat`}>
    <h4>{label}</h4>
    <p>{value ?? 0}</p>
  </div>
);

export default MyStats;