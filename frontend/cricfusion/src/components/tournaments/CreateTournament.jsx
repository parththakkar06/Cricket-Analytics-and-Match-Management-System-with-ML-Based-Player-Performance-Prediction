import React from 'react';
import { UserHeader } from '../user/UserHeader';
import { UserFooter } from '../user/UserFooter';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../../assets/tournament.css'; // Import the CSS file
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { use } from 'react';

export const CreateTournament = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    // const tournamentId = useParams().id; // Assuming you have a tournamentId in the URL params;

    const submitHandle = async (data) => {
        try {
            const res = await axios.post("http://localhost:3002/tournament/tournament", data);
            console.log(res.data);
            toast.success('😁 Tournament Create  successful!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                  });
            
                  setTimeout(() => {
                    navigate("/tour");
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

    return (
        <div>
            <ToastContainer/>
            {/* ------------------------------------------------header bar-------------------------------------------------------- */}

            <UserHeader></UserHeader>
            {/*-------------------------------------------------- header and------------------------------------------- */}


            <form id="create-tournament-form" onSubmit={handleSubmit(submitHandle)}>

                <div className="form-row">
                    <div>
                        <label>Tournament name : </label>
                        <input type="text" placeholder='Tournament name' {...register("tournamentname")} />
                    </div>
                    <div>
                        <label>Orgnazier name : </label>
                        <input type="text" placeholder='Orgnazier name' {...register("orgnaizername")} />
                    </div>
                </div>

                <div className="form-row">
                    <div>
                        <label>Orgnazier contact : </label>
                        <input type="number" placeholder='Orgnazier contact' {...register("orgnaizercontact")} />
                    </div>
                    <div>
                        <label>City : </label>
                        <input type="text" placeholder='City' {...register("city")} />
                    </div>
                </div>

                <div className="form-row">
                    <div>
                        <label>Category</label>
                            <select name="category" id="" {...register("category")}>
                                <option value="">Select Category</option>
                                <option value="open">open</option>
                                <option value="corporates">corporates</option>
                                <option value="community">community</option>
                                <option value="school">school</option>
                                <option value="series">series</option>
                                <option value="college">college</option>
                                <option value="university">university</option>
                                <option value="private">private</option>
                            </select>
                    </div>
                    <div>
                        <label>Start Date</label>
                        <input type="date" placeholder='Start Date' {...register("startdate")} />
                    </div>
                </div>

                <div className="form-row">
                    <div>
                        <label htmlFor="">END Date</label>
                        <input type="date" placeholder='End Date' {...register("enddate")} />
                    </div>
                    <div>
                        <label htmlFor="">Maxmimum Team</label>
                        <input type="number" placeholder='total max team' {...register("maxteam")} />
                    </div>
                </div>


                <div className="form-row">
                    <div>
                        <label htmlFor="">Ball Type</label>
                        <select name="balltype" id="" {...register("balltype")}>
                            <option value="">Select Ball Type</option>
                            <option value="leather">leather</option>
                            <option value="tennis">Tennis</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Total Overs</label>
                        <input type="number" placeholder='Total Overs' {...register("overs")} />
                    </div>
                </div>

                <div className="form-row">
                    <div>
                        <label htmlFor="">Pitch Type</label>
                        <select name="pitchtype" id="" {...register("pithchtype")}>
                            <option value="">Select pitch Type</option>
                            <option value="turf">Turf</option>
                            <option value="cement">Cement</option>
                            <option value="rough">Rough</option>
                            <option value="astroturf">Astroturf</option>
                            <option value="mating">mating</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">match Type</label>
                        <select name="matchtype" id="" {...register("matchtype")}>
                            <option value="">Select Matchtype</option>
                            <option value="ground">Ground</option>
                            <option value="box">Box</option>
                        </select>
                    </div>
                </div>



                <div>
                    <button type="submit" className="btn btn-primary scoreboard-btn">Create</button>
                </div>






            </form>




            {/* ------------------------------------------------footer bar-------------------------------------------------------- */}

            <UserFooter></UserFooter>
            {/*-------------------------------------------------- footer and------------------------------------------- */}


        </div>
    )
};