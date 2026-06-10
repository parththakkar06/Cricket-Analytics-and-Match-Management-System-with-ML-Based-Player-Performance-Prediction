import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/Alltounament.css'; // Import custom CSS
import { UserHeader } from '../user/UserHeader';
import { UserFooter } from '../user/UserFooter';

export const AllTournament = () => {
  const navigate = useNavigate(); // Add this hook for navigation
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    status: 'all',
    ballType: '',
    category: ''
  });

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      status: 'all',
      ballType: '',
      category: ''
    }
  });

  // Watch form values for preview filtering
  const currentValues = watch();

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3002/tournament/tournament');
        const tournamentsData = response.data;

        if (Array.isArray(tournamentsData)) {
          setTournaments(tournamentsData);
        } else if (tournamentsData && typeof tournamentsData === 'object') {
          if (Array.isArray(tournamentsData.data)) {
            setTournaments(tournamentsData.data);
          } else {
            const possibleArrays = Object.values(tournamentsData).filter(val => Array.isArray(val));
            if (possibleArrays.length > 0) {
              setTournaments(possibleArrays[0]);
            } else {
              console.error('API response does not contain an array:', tournamentsData);
              setTournaments([]);
              setError('Unexpected data format from API');
            }
          }
        } else {
          console.error('Unexpected response format:', tournamentsData);
          setTournaments([]);
          setError('Unexpected data format from API');
        }

        setLoading(false);
      } catch (err) {
        console.error('API fetch error:', err);
        setError('Failed to fetch tournaments');
        setTournaments([]);
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear().toString().substr(-2)}`;
  };

  const getStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return 'upcoming';
    if (now > end) return 'past';
    return 'ongoing';
  };

  const onSubmit = (data) => {
    setActiveFilters({ ...data });
  };

  const resetFilters = () => {
    reset({
      status: 'all',
      ballType: '',
      category: ''
    });
    setActiveFilters({
      status: 'all',
      ballType: '',
      category: ''
    });
  };

  // Function to handle tournament card click
  const handleTournamentClick = (tournamentId) => {
    navigate(`/tournament-details/${tournamentId}`);
  };

  const tournamentsArray = Array.isArray(tournaments) ? tournaments : [];

  const filteredTournaments = tournamentsArray.filter(tournament => {
    if (!tournament || !tournament.startdate || !tournament.enddate) {
      return false;
    }

    const status = getStatus(tournament.startdate, tournament.enddate);

    if (activeFilters.status !== 'all' && activeFilters.status !== status) return false;
    if (activeFilters.ballType && activeFilters.ballType !== tournament.balltype) return false;
    if (activeFilters.category && activeFilters.category !== tournament.category) return false;

    return true;
  });

  if (loading) return (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Loading tournaments...</p>
    </div>
  );

  if (error) return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    </div>
  );

  return (
    <>
    <UserHeader/>
    <div className="container-fluid py-4">
      <div className="row_name mb-4 align-items-center">
        <div className="col-domestic">
          <h1 className="fs-2 fw-semibold text-secondary">
            All Domestic Cricket Tournaments in Ahmedabad
          </h1>
        </div>
        <div className="col-auto">
          <button className="btn btn-link text-danger p-0">(Change)</button>
        </div>
      </div>

      <div className="row">
        {/* Filters Section */}
        <div className="col-md-3">
          <div className="card shadow-sm mb-4 filter-card">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="fs-4 fw-bold mb-0">Filters</h2>
                  <div>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={resetFilters}
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="btn btn-sm btn-primary"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <hr className="my-3" />

                <h3 className="fs-5 fw-bold mb-3">Status</h3>
                <div className="mb-3">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="status-all"
                      value="all"
                      {...register("status")}
                    />
                    <label className="form-check-label" htmlFor="status-all">
                      All
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="status-ongoing"
                      value="ongoing"
                      {...register("status")}
                    />
                    <label className="form-check-label" htmlFor="status-ongoing">
                      Ongoing
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="status-upcoming"
                      value="upcoming"
                      {...register("status")}
                    />
                    <label className="form-check-label" htmlFor="status-upcoming">
                      Upcoming
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="status-past"
                      value="past"
                      {...register("status")}
                    />
                    <label className="form-check-label" htmlFor="status-past">
                      Past
                    </label>
                  </div>
                </div>

                <h3 className="fs-5 fw-bold mb-3">Ball Type</h3>
                <div className="mb-3">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="ball-all"
                      value=""
                      {...register("ballType")}
                    />
                    <label className="form-check-label" htmlFor="ball-all">
                      All
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="ball-leather"
                      value="leather"
                      {...register("ballType")}
                    />
                    <label className="form-check-label" htmlFor="ball-leather">
                      Leather
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="ball-tennis"
                      value="tennis"
                      {...register("ballType")}
                    />
                    <label className="form-check-label" htmlFor="ball-tennis">
                      Tennis
                    </label>
                  </div>
                </div>

                <h3 className="fs-5 fw-bold mb-3">Category</h3>
                <div className="mb-3">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="category-all"
                      value=""
                      {...register("category")}
                    />
                    <label className="form-check-label" htmlFor="category-all">
                      All
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="category-open"
                      value="open"
                      {...register("category")}
                    />
                    <label className="form-check-label" htmlFor="category-open">
                      Open
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="category-corporate"
                      value="corporates"
                      {...register("category")}
                    />
                    <label className="form-check-label" htmlFor="category-corporate">
                      Corporate
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="category-community"
                      value="community"
                      {...register("category")}
                    />
                    <label className="form-check-label" htmlFor="category-community">
                      Community
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="category-school"
                      value="school"
                      {...register("category")}
                    />
                    <label className="form-check-label" htmlFor="category-school">
                      School
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="category-series"
                      value="series"
                      {...register("category")}
                    />
                    <label className="form-check-label" htmlFor="category-series">
                      Series
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Current Selection */}
          <div className="card bg-light mb-4 current-selection-card">
            <div className="card-body">
              <h3 className="fs-6 fw-bold mb-2">Current Selection:</h3>
              <div className="small">
                <p className="mb-1">Status: <span className="fw-medium">{currentValues.status === 'all' ? 'All' : currentValues.status}</span></p>
                <p className="mb-1">Ball Type: <span className="fw-medium">{currentValues.ballType || 'All'}</span></p>
                <p className="mb-0">Category: <span className="fw-medium">{currentValues.category || 'All'}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Tournament Cards Grid */}
        <div className="col-md-9">
          <div className="row g-4">
            {filteredTournaments.length > 0 ? filteredTournaments.map((tournament) => {
              const status = getStatus(tournament.startdate, tournament.enddate);
              return (
                <div key={tournament._id} className="col-md-6">
                  <div 
                    className="card h-100 shadow-sm border-0 tournament-card" 
                    onClick={() => handleTournamentClick(tournament._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card-body p-3">
                      <div className="d-flex">
                        {/* Tournament Logo */}
                        <div className="me-3">
                          <div className="tournament-logo">
                            <img
                              src={`/api/placeholder/64/64`}
                              alt={tournament.tournamentname}
                              className="img-fluid rounded"
                            />
                          </div>
                        </div>

                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <span className={`badge ${
                                status === 'ongoing' ? 'bg-danger' :
                                status === 'upcoming' ? 'bg-success' : 'bg-secondary'
                              } mb-2`}>
                                {status.toUpperCase()}
                              </span>
                              <h3 className="fs-5 fw-bold mb-0">{tournament.tournamentname}</h3>
                            </div>
                            <span className="badge bg-warning text-dark">Premium</span>
                          </div>
                          <div className="small mb-1">
                            {formatDate(tournament.startdate)} To {formatDate(tournament.enddate)}
                          </div>
                          <div className="small text-muted">
                            {tournament.city}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="col-12">
                <div className="alert alert-info text-center py-4">
                  <i className="bi bi-info-circle me-2"></i>
                  No tournaments match your current filters
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
     
    </div>
    <UserFooter/>
    </>
  );
};