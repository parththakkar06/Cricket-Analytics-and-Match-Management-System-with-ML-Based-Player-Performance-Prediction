import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './MatchSetup.css';
import axios from 'axios';

export const MatchSet = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
   const [ground, setground] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const { tournamentId, team1Id, teamAName, team2Id, teamBName } = location.state || {};

  const onSubmit = async (data) => {
    if (!team1Id || !team2Id) {
      toast.error('Team information is missing. Please select teams again.');
      navigate('/selectteam');
      return;
    }

    try {
      const matchData = {
        ...data,
        tournamentId,
        team1Id,
        team2Id,
        status: 'upcoming',
        date: new Date().toISOString()
      };

      const response = await axios.post('http://localhost:3002/match/match', matchData);
      console.log('Match created match id... :', response.data.data._id);
      console.log('team1id created successfully:', response.data.data.team1Id);
      console.log('team2id created successfully:', response.data.data.team2Id);
      console.log('Match created successfully:', response.data.data);

      toast.success('Match created successfully!', {
        autoClose: 2000,
        hideProgressBar: true
      });

      setTimeout(() => {
        navigate(`/tournament-details/${tournamentId}`, {
          state: {
            matchId:response.data.data._id,
            team1Id:response.data.data.team1Id,
            team2Id:response.data.data.team2Id,
          }
        });
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Failed to create match');
    }
  };

  const goBack = () => {
    navigate(`/selectteam/${tournamentId}`);
  };
useEffect(() => {
    

    const fetchground = async () => {
      try {
        const response = await axios.get("http://localhost:3002/tourground/tourground");
        setground(response.data.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchground();
  }, []);
  return (
    <div className="match-setup-container">
      <ToastContainer position="top-center" />

      <div className="header-section">
        <button className="back-btn" onClick={goBack}>
          <FaArrowLeft /> Back
        </button>
        <h2>Match Setup</h2>
      </div>

      <div className="teams-display">
        <div className="team-display">
          <h3>Team A</h3>
          <p>{teamAName || 'Not selected'}</p>
        </div>
        <div className="vs-text">VS</div>
        <div className="team-display">
          <h3>Team B</h3>
          <p>{teamBName || 'Not selected'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="match-form">
        <div className="form-row">
          <div className="form-group">
            <label>Match Type *</label>
            <select
              {...register("matchtype", { required: "This field is required" })}
              className={errors.matchtype ? 'error' : ''}
            >
              <option value="">Select match type</option>
              <option value="final">final</option>
              <option value="semifinal">semifinal</option>
              <option value="qtr final">qtr final</option>
              <option value="normal">normal</option>
              <option value="knockout-normal">knockout-normal</option>
              <option value="knockout-semifinal">knockout-semifinal</option>
            </select>
            {errors.matchtype && <span className="error-msg">{errors.matchtype.message}</span>}
          </div>

          <div className="form-group">
            <label>Total Overs *</label>
            <input
              type="number"
              placeholder="Total Overs"
              {...register("totalovers", {
                required: "This field is required",
                min: { value: 1, message: "Minimum 1 over" },
                max: { value: 50, message: "Maximum 50 overs" }
              })}
              className={errors.totalovers ? 'error' : ''}
            />
            {errors.totalovers && <span className="error-msg">{errors.totalovers.message}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Overs Per Bowler *</label>
            <input
              type="number"
              placeholder="Overs Per Bowler"
              {...register("overperbowler", {
                required: "This field is required",
                min: { value: 1, message: "Minimum 1 over" }
              })}
              className={errors.overperbowler ? 'error' : ''}
            />
            {errors.overperbowler && <span className="error-msg">{errors.overperbowler.message}</span>}
          </div>
          <input
            type="hidden" 
            id="touranmentId"
            value={tournamentId}
            {...register("tournamentId", { required: "City is required" })}
          />

          <div className="form-group">
            <label>Powerplay Overs *</label>
            <input
              type="number"
              placeholder="Powerplay overs"
              {...register("totalpowerplayovers", {
                required: "This field is required",
                min: { value: 1, message: "Minimum 1 over" }
              })}
              className={errors.totalpowerplayovers ? 'error' : ''}
            />
            {errors.totalpowerplayovers && <span className="error-msg">{errors.totalpowerplayovers.message}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City *</label>
            <input
              type="text"
              placeholder="Enter city"
              {...register("city", { required: "This field is required" })}
              className={errors.city ? 'error' : ''}
            />
            {errors.city && <span className="error-msg">{errors.city.message}</span>}
          </div>

          <div className="form-group">
  <label>Ground *</label>
  {/* <select
    {...register("ground", { required: "Ground selection is required" })}
    className={errors.groundId ? 'error' : ''}
  >
    <option value="">Select Ground</option> 
    {ground.map((groundItem) => (
      <option 
        key={groundItem._id} 
        value={groundItem._id}
        style={{color:"black", backgroundColor:"white"}}
      >
        {groundItem.groundname} 
      </option>
    ))}
  </select> */}
   <input
              type="text"
              placeholder="Enter the ground name"
              {...register("groundname", { required: "This field is required" })}
              className={errors.groundname ? 'error' : ''}
            />

  {errors.groundId && <span className="error-msg">{errors.groundId.message}</span>}
</div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Time *</label>
            <input
              type="time"
              {...register("stateTime", { required: "This field is required" })}
              className={errors.stateTime ? 'error' : ''}
            />
            {errors.stateTime && <span className="error-msg">{errors.stateTime.message}</span>}
          </div>

          <div className="form-group">
            <label>Ball Type *</label>
            <select
              {...register("balltype", { required: "This field is required" })}
              className={errors.balltype ? 'error' : ''}
            >
              <option value="">Select ball type</option>
              <option value="leather">Leather</option>
              <option value="tennis">Tennis</option>
            </select>
            {errors.balltype && <span className="error-msg">{errors.balltype.message}</span>}
          </div>
          <div className="form-group">
            <label>pithchtype *</label>
            <select
              {...register("pithchtype", { required: "This field is required" })}
              className={errors.balltype ? 'error' : ''}
            >
              <option value="">Select pithch type</option>
              <option value="turf">turf</option>
              <option value="cement">cement</option>
              <option value="rough">rough</option>
              <option value="astroturf">astroturf</option>
              <option value="mating">mating</option>
            </select>
            {errors.balltype && <span className="error-msg">{errors.balltype.message}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Create Match
          </button>
        </div>
      </form>
    </div>
  );
};
