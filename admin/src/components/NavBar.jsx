import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext.jsx";

export const NavBar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDtoken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    } else {
      setDtoken("");
      localStorage.removeItem("dToken");
    }
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img src={assets.admin_logo} alt="Logo" className="h-10 w-10" />
        <span className="text-xl font-bold text-gray-700">
          {aToken ? "Admin" : "Doctor"} Panel
        </span>
      </div>

      <div className="flex items-center space-x-6">
        <button
          onClick={logout}
          className="bg-red-500 text-white cursor-pointer px-3 py-1 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

     
    </nav>
  );
};
