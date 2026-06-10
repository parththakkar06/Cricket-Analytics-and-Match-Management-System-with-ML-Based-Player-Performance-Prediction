import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "/src/assets/login.css"; // Import the CSS file
import logo from "/src/assets/logo.png"; // Ensure this path is correct
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Import icons
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [login, setlogin] = useState([]);
  const [name, setname] = useState("")

  const SubmitHandler = async (data) => {
    try {
      const response = await axios.post("http://localhost:3002/user/login", data);
      console.log("Login response:", response);

      // if (response.data && response.data.token) {
      //   const token = response.data.token;
      //   toast.success('😁 login successful!', {
      //     position: "top-center",
      //     autoClose: 1000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     theme: "colored",
      //   });

      //   console.log("Received Token:", token);
      //   localStorage.setItem("token", token);

      //   setTimeout(() => {
      //     navigate('/');
      //   }, 2700);

      // } else {
      //   console.log("not token----")

      // }
      //Added By Sapan
      if (response.data && response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token); // Store token in localStorage

        // Decode JWT Token to get user details
        const user = jwtDecode(token);
        localStorage.setItem("user", JSON.stringify(user)); // Store user data
        localStorage.setItem("role", response.data.data.roleId);
        console.log("ress....", response.data.data.roleId);
        console.log("res.....",response.data.data.roleId.rolename);
        
        toast.success(`😁 Welcome, page!`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });

        setTimeout(() => {
          if (response.data.data.roleId.rolename === "User") {
            navigate("/user");
          } else if (response.data.data.roleId.rolename === "Admin") {
            navigate("/admin");
          }
        }, 1500);
      } else {
        toast.error("Login failed. Please try again!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log("error.message", error.message);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }

    console.log("Login Data:", data);
  };


  useEffect(() => {
    const fetchloginuser = async () => {
      try {
        const response = await axios.get("http://localhost:3002/user/login");
        console.log(response);
        setlogin(response.data.data);
        setname(response.data.data.firstname);

      } catch (error) {
        console.log("error login data ----> ", error);
      }
    }
    fetchloginuser();
  }, [])
  useEffect(() => {
    document.body.classList.add("login-page");
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  const validationschema = {
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

  }
  return (
    <div className="login-page">
      <div className="login-container">
        <ToastContainer />
        {/* Add the Cricket Logo */}
        <div className="logo-container">
          <img src={logo} alt="Cricket Logo" className="cricket-logo" />
        </div>

        <h2 className="scoreboard-title">Cricket Score Management System Login</h2>
        <form onSubmit={handleSubmit(SubmitHandler)} className="scoreboard-form">

          {/* Email Input */}
          <div className="input1-group">
            <FaEnvelope className="input1-icon" />
            {errors.email && <span className="errorlogin-message">{errors.email.message}</span>}
            <input
              type="email"
              name="email"
              placeholder=" Email"
              className="form1-input"
              {...register("email", validationschema.emailvalidator)}

            />
          </div>

          {/* Password Input */}
          <div className="input1-group">
            <FaLock className="input1-icon" />
            {errors.password && <span className="errorlogin-message">{errors.password.message}</span>}
            <input
              type="password"
              name="password"
              placeholder=" Password"
              className="form1-input"
              {...register("password", validationschema.passwordvalidator)}

            />
          </div>

          <button type="submit" className="btn btn-primary scoreboard-btn">Login</button>
        </form>

        {/* Link to Signup Page */}
        <p className="mt-3">
          Don't have an account? <Link to="/">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;