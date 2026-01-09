import { NavLink, Link, useNavigate } from "react-router";
import { assets } from "../assets/assets";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export const Nav = () => {
  let navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={assets.logo} alt="Logo" className="h-10 w-auto" />
        </Link>

        <ul className="flex space-x-8 text-gray-700 font-medium">
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-600"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctor"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-600"
              }
            >
              All Doctors
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-600"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <div>
          {token && userData ? (
            <div className="flex items-center gap-2 cursor-pointer relative group">
              <img
                src={userData.image}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />

              <img
                src={assets.dropdown_icon}
                alt="Dropdown"
                className="w-4 h-4"
              />

              <div className="absolute top-8 right-0 w-48 text-base font-medium text-gray-600 z-10 hidden group-hover:block bg-white shadow-md rounded-md">
                <p
                  onClick={() => navigate("MyProfile")}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("myappointment")}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  My Appointment
                </p>
                <p
                  onClick={logout}
                  className="px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  Logout
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
            >
              Create Account
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
