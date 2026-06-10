import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import '../../assets/userprofile.css'
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';

export const UserProfile = () => {
  
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  
useEffect(() => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (token) {
        // Decode the token
        const decodedToken = jwtDecode(token);
        console.log("okkkk",decodedToken)
        localStorage.setItem("userId", decodedToken._id);
        // Set user information from token
        setUserName(`${decodedToken.firstname} ${decodedToken.lastname}`);
        setUserId(decodedToken.userId || decodedToken._id || decodedToken.id);
      } else {
        console.error('No token found in localStorage');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }

    console.log("userId", userId);
    console.log("userName", userName);
  }, []);

  const submithandle = async(data) => {
    console.log(data)
    // const res = await axios.post('http://localhost:3002/userprofile/userprofilepath',data);
    // alert('User Profile Created.........');
    // console.log(res.data);
    // console.log(data);
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (token) {
        // Decode the token
        const decodedToken = jwtDecode(token);
        console.log("okkkk",decodedToken)
        // Set user information from token
        setUserName(`${decodedToken.firstname} ${decodedToken.lastname}`);
        setUserId(decodedToken.userId || decodedToken._id || decodedToken.id);


        try {
          const formData = new FormData();
          formData.append("userId", decodedToken._id);
          formData.append("location", data.location);
          formData.append("playingRole", data.playingRole);
          formData.append("battingStyle", data.battingStyle);
          formData.append("bowlingStyle", data.bowlingStyle);
          formData.append("image", data.image[0]);
      
          // Append image file (handle case where no file is selected)
          // if (data.image[0]) {
          //   formData.append("image", data.image[0]);
          // }
      
          // Send request with FormData (multipart/form-data)
          const res = await axios.post("http://localhost:3002/userprofile/userprofilepath", formData);
          console.log(res.data);
          // navigate('/user');
          toast.success('🦄 Wow so easy!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
          navigate('/dashboard');
        } catch (error) {
          console.error("Error creating user profile:", error);
          alert("Profile creation failed");
        }
      } else {
        console.error('No token found in localStorage');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }

   
  };

  

  return (
    <div className="user-profile-container">
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
/>
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit(submithandle)} className="user-profile-form">
      <div className="form-group">
          <label>User Name</label>
          <div className="user-name-display">
            {userName || 'No user found. Please login again.'}
          </div>
          {/* Hidden input to store userId for form submission */}
          <input type="hidden" name="userId" value={userId} />
        </div>


        <div className="form-group">
          <label htmlFor="profilePic">Profile Picture</label>
          <input
            type="file"
           
            {...register('image')}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            {...register('location')}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="playingRole">Playing Role</label>
          <select
            name="playingrole"
            {...register('playingRole')}
            className="form-control"
          >
            <option value="">Select user playing Role</option>
            <option value="TopOrderBatter">TopOrderBatter</option>
            <option value="MiddleOrderBatter">MiddleOrderBatter</option>
            <option value="WicketKeeperBatter">WicketKeeperBatter</option>
            <option value="WicketKeeper">WicketKeeper</option>
            <option value="Bowler">Bowler</option>
            <option value="AllRounder">AllRounder</option>
            <option value="LowerOrderBatter">LowerOrderBatter</option>
            <option value="OpeningBatter">OpeningBatter</option>
            <option value="None">None</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="battingStyle">Batting Style</label>
          <select
            name="battingstyle"
            {...register('battingStyle')}
            className="form-control"
          >
            <option value="">Select Batting Style</option>
            <option value="RightHanded">RightHanded</option>
            <option value="LeftHanded">LeftHanded</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="bowlingStyle">Bowling Style</label>
          <select
            name="bowlingstyle"
            {...register('bowlingStyle')}
            className="form-control"
          >
            <option value="">Select Bowling Style</option>
            <option value="RightArmFast">RightArmFast</option>
            <option value="RightArmMedium">RightArmMedium</option>
            <option value="RightArmLegSpin">RightArmLegSpin</option>
            <option value="RightArmOffSpin">RightArmOffSpin</option>
            <option value="LeftArmFast">LeftArmFast</option>
            <option value="LeftArmMedium">LeftArmMedium</option>
            <option value="LeftArmLegSpin">LeftArmLegSpin</option>
            <option value="LeftArmOffSpin">LeftArmOffSpin</option>
          </select>
        </div>

        <div className="form-group">
          <button type="submit" className="submit-button">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};