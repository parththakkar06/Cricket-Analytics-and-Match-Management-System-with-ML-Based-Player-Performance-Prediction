import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserHeader } from '../user/UserHeader';
import { UserFooter } from '../user/UserFooter';
import '../../assets/team.css'; // Import the CSS
import image from '../../assets/team-removebg-preview.png'
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";


export const CreateTeam = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate= useNavigate();
    // const [tournament, setTournament] = useState([]);
    // const [loading, setLoading] = useState(false);

    const { tournamentId } = useParams(); // Gets 'id' from the URL
    console.log(tournamentId);
    
    
    const submitHandle = async (data) => {

        try {
            const res = await axios.post("http://localhost:3002/team/team", data);
            
            console.log(res.data);
            toast.success('😁 Teams Create  successful!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });

            setTimeout(() => {
                navigate(`/tournament-details/${tournamentId}`);
            }, 2000);

        } catch (error) {
            toast.error("Error signing up. Please try again!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            console.error("Error during API call:", error);
        }
    };

    // useEffect(() => {
    //     const fetchTournament = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:3002/tournament/tournament");
    //             setTournament(response.data.data);
    //         } catch (error) {
    //             console.error("Error fetching tournaments:", error);
    //         }
    //     };

    //     fetchTournament();
    // }, []);

    return (
        <div className="page-container">
            <ToastContainer />
            <UserHeader />

            <div className="split-container">
                <div className="logo-side">
                    <div className="logo-wrapper">
                        <img
                            src={image} // Update with the actual path to your logo
                            alt="Cricket Team Logo"
                            className="team-logo"
                        />
                        <h2 className="logo-title">CREATE YOUR DREAM TEAM</h2>
                        <p className="logo-subtitle">Join the tournament and compete with the best</p>
                    </div>
                </div>

                <div className="form1-side">
                    <div className="form1-container">
                        <form   onSubmit={handleSubmit(submitHandle)} className="team1-form">
                            <div className="form-group">
                                <label htmlFor="teamname">Team Name:</label>
                                <input
                                    type="text"
                                    id="teamname"
                                    placeholder="Enter team name"
                                    {...register("teamname", { required: "Team name is required" })}
                                />
                                {errors.teamname && <span className="error-message">{errors.teamname.message}</span>}
                            </div>
 
                            <input
                                    type="hidden"
                                    id="tournamentId"
                                    value={tournamentId}
                                     {...register("tournamentId", { required: "City is required" })}
                                />
 

                            <div className="form-group">
                                <label htmlFor="city">City:</label>
                                <input
                                    type="text"
                                    id="city"
                                    placeholder="Enter city"
                                    {...register("city", { required: "City is required" })}
                                />
                                {errors.city && <span className="error-message">{errors.city.message}</span>}
                            </div>

                                {/* <div className="form-group">
                                    <label htmlFor="tournament">Tournament:</label>
                                    <select
                                        id="tournament"
                                        {...register("touranmentId", { required: "Please select a tournament" })}
                                    >
                                        <option value="">Select Tournament</option>
                                        {tournament.map((tour) => (
                                            <option key={tour._id} value={tour._id}>
                                                {tour.tournamentname}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.touranmentId && <span className="error-message">{errors.touranmentId.message}</span>}
                                </div> */}

                            <div>
                                <button type="submit" className="btn btn-primary scoreboard-btn">Create Team</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

            <UserFooter />
        </div>
    );
};