import React from "react";
import InsightsDashboard from "../UserData/InsightsDashboard";
import { UserHeader } from "./UserHeader";

export const UserDashboard = () => {
    const userId = localStorage.getItem("userId");
    console.log(localStorage.getItem("userId"))
    return (
        <div>
      <div >
        
        <UserHeader></UserHeader>
  
        {/* 🔥 YOUR MAIN FEATURE */}
        <InsightsDashboard userId={userId} />
  
      </div>
      </div>
    );
  };