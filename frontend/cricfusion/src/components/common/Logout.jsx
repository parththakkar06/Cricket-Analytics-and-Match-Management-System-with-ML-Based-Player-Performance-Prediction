import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

 export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Redirect to login page after logout
    navigate("/login");
  }, []);

  return null; // No UI needed
};

