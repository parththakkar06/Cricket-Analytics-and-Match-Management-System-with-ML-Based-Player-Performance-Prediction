import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "/src/assets/signup.css";

import logo from "/src/assets/logo.png"; // Ensure this path is correct
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaGlobe, FaMapMarkerAlt, FaCalendarAlt, FaVenusMars } from "react-icons/fa"; // Import icons
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  // const [isSubmited, setisSubbmited] = useState(false);
  // const [iserror, setiserror] = useState(false);

  const Submithandler = async(data) => {
    console.log("Signup Data:", data);
 

    try {
      data.roleId = "69b44b53df022bc15a3065ed";
        const res = await axios.post("http://localhost:3002/user/user", data);
    console.log("Response:", res.data);
      toast.success('😁 Sign up successful!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      setTimeout(() => {
        navigate("/login");
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
    

  //   const fetchRoles = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3002/role/roles");
  //       setRoles(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching roles:", error);
  //     }
  //   };

  //   fetchRoles();
  // }, []);
  const validationschema = {
    namevalidator: {
      required: {
        value: true,
        message: "Name is required",
      },
     
    },
    emailvalidator: {
      required: {
        value: true,
        message: "Email is required",
      },
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "Invalid email address",
      },
    },
    contactvalidator: {
      required: {
        value: true,
        message: "Phone Number is required",
      },
      pattern: {
        value: /^[0-9]{10}$/,
        message: "Invalid Phone Number",
      },
    },
    passwordvalidator: {
      required: {
        value: true,
        message: "Password is required",
      },
      pattern: {
        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
        message: "Password should contain atleast one uppercase, one lowercase and one number",
      },
    },
    // countryvalidator: {
    //   required: {
    //     value: true,
    //     message: "Country is required ",
    //   },
    //   pattern: {
    //     value: /^[A-Za-z]+$/,
    //     message: "Country should contain only alphabets",
    //   },
    // },
    // statevalidator: {
    //   required: {
    //     value: true,
    //     message: "State is required",
    //   },
    //   pattern: {
    //     value: /^[A-Za-z]+$/,
    //     message: "State should contain only alphabets",
    //   },
    // },
    // cityvalidator: {
    //   required: {
    //     value: true,
    //     message: "City is required",
    //   },
    //   pattern: {
    //     value: /^[A-Za-z]+$/,
    //     message: "City should contain only alphabets",
    //   },
    // },
    gender: {
      required: {
        value: true,
        message: "gender is required"
      }
    },
    DOBvalidator: {
      required: {
        value: true,
        message: "Date of Birth is required"
      }
    }

  }
  return (
    <div className="signup-page">
    <ToastContainer/>
      <div className="signup-container">
        {/* Add the Cricket Logo */}
           
        <div className="logo-container">
          <img src={logo} alt="Cricket Logo" className="cricket-logo" />
        </div>

        <h2 className="scoreboard-title">Cricket Score Management System Signup</h2>
        <form onSubmit={handleSubmit(Submithandler)} className="scoreboard-form">
          <div className="row">
            <div className="col-md-6 input-group">
              <FaUser className="input-icon" />
              {errors.firstname && <span className="error-message">{errors.firstname.message}</span>}
              <input type="text" name="firstname" placeholder="First Name" className="form-input" {...register("firstname", validationschema.namevalidator)} />
              {/* <span style={{color:"red"}}>{errors.firstname?.message}</span> */}
              {/* {
              isSubmited == true ?(  <button type="button" class="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Bottom popover">
                {errors.firstname?.message}
            </button>):null
            } */}

            </div>
            <div className="col-md-6 input-group">
              <FaUser className="input-icon" />
              {errors.lastname && <span className="error-message">{errors.lastname.message}</span>}
              <input type="text" name="lastname" placeholder="Last Name" className="form-input" {...register("lastname", validationschema.namevalidator)} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 input-group">
              <FaEnvelope className="input-icon" />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
              <input type="email" name="email" placeholder="Email" className="form-input" {...register("email", validationschema.emailvalidator)} />
            </div>
            <div className="col-md-6 input-group">
              <FaVenusMars className="input-icon" />
              {errors.gender && <span className="error-message">{errors.gender.message}</span>}
              <select name="gender" className="form-input" {...register("gender", validationschema.gender)} >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Famale">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 input-group">
              <FaPhone className="input-icon" />
              {errors.contact && <span className="error-message">{errors.contact.message}</span>}
              <input type="tel" name="contact" placeholder="Phone Number" className="form-input" {...register("contact", validationschema.contactvalidator)} />
            </div>
            <div className="col-md-6 input-group">
              <FaCalendarAlt className="input-icon" />
              {errors.DOB && <span className="error-message">{errors.DOB.message}</span>}
              <input type="date" name="DOB" {...register("DOB", validationschema.DOBvalidator)} className="form-input" />
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-6 input-group">
              <FaGlobe className="input-icon" />
              {errors.country && <span className="error-message">{errors.country.message}</span>}
              <input type="text" name="country" placeholder="Country" className="form-input" {...register("country", validationschema.countryvalidator)} />
            </div>
            <div className="col-md-6 input-group">
              <FaMapMarkerAlt className="input-icon" />
              {errors.state && <span className="error-message">{errors.state.message}</span>}
              <input type="text" name="state" placeholder="State" className="form-input" {...register("state", validationschema.statevalidator)} />
            </div>
          </div> */}
          <div className="row">
            {/* <div className="col-md-6 input-group">
              <FaMapMarkerAlt className="input-icon" />
              <select
                name="role"
                {...register("roleId")}
                className="form-input"
                required
              >
              <option value="" >Select Role</option> 
                {roles.map((role) => (
                  <option style={{color:"black",backgroundColor:"white"}}  value={role._id}>
                    {role.rolename}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="col-md-6 input-group">
              <FaLock className="input-icon" />
              {errors.password && <span className="error-message">{errors.password.message}</span>}
              <input type="password" name="password" placeholder="Password" className="form-input" {...register("password", validationschema.passwordvalidator)} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary scoreboard-btn">Submit</button>

          {/* Link to Login Page */}
          <p className="mt-3">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
</div>
  );
};

export default Signup;