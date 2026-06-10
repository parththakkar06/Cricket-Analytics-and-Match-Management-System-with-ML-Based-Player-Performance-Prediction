import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const useAuth = () => {
  const [authState, setAuthState] = useState({ 
    isLoggedin: false, 
    role: null, 
    roleName: "" 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const user = localStorage.getItem("user");

    if (token) {
      // Parse the role object if it's stored as a string
      let roleObj = role;
      try {
        if (typeof role === 'string') {
          roleObj = JSON.parse(role);
        }
      } catch (e) {
        console.log("Error parsing role:", e);
      }

      setAuthState({ 
        isLoggedin: true, 
        role: roleObj,
        roleName: roleObj?.rolename || ""
      });
    }
    setLoading(false);
  }, []);

  return { ...authState, loading };
};

const PrivateRoutes = ({ requiredRole }) => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.loading) {
    return <h1>Loading...</h1>;
  }

  // Not logged in, redirect to login
  if (!auth.isLoggedin) {
    return <Navigate to="/login" />;
  }

  // Check if role matches required role
  if (requiredRole && auth.roleName !== requiredRole) {
    // Redirect to appropriate page based on actual role
    if (auth.roleName === "Admin") {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return <Outlet />;
};

export default PrivateRoutes;