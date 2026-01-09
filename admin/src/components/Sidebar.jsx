import React from "react";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

export const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div>
      {aToken && (
        <ul className="flex flex-col gap-2 px-3 mt-4">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-amber-600 text-white shadow-md"
                  : "bg-blue-900 hover:bg-blue-800 text-gray-300"
              }`
            }
          >
            <img
              src={assets.home_icon}
              alt="Dashboard"
              className="w-5 h-5 opacity-90"
            />
            <p className="text-sm font-medium">Dashboard</p>
          </NavLink>

          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-amber-600 text-white shadow-md"
                  : "bg-blue-900 hover:bg-blue-800 text-gray-300"
              }`
            }
          >
            <img
              src={assets.appointment_icon}
              alt="Appointments"
              className="w-5 h-5 opacity-90"
            />
            <p className="text-sm font-medium">Appointments</p>
          </NavLink>

          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-amber-600 text-white shadow-md"
                  : "bg-blue-900 hover:bg-blue-800 text-gray-300"
              }`
            }
          >
            <img
              src={assets.add_icon}
              alt="Add Doctor"
              className="w-5 h-5 opacity-90"
            />
            <p className="text-sm font-medium">Add Doctor</p>
          </NavLink>

          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-amber-600 text-white shadow-md"
                  : "bg-blue-900 hover:bg-blue-800 text-gray-300"
              }`
            }
          >
            <img
              src={assets.people_icon}
              alt="Doctor List"
              className="w-5 h-5 opacity-90"
            />
            <p className="text-sm font-medium">Doctor List</p>
          </NavLink>
        </ul>
      )}
      {dToken && (
        <ul className="flex flex-col gap-2 px-3 mt-4">
          <NavLink
            to="/doctor-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-amber-600 text-white shadow-md"
                  : "bg-blue-900 hover:bg-blue-800 text-gray-300"
              }`
            }
          >
            <img
              src={assets.home_icon}
              alt="Dashboard"
              className="w-5 h-5 opacity-90"
            />
            <p className="text-sm font-medium">Dashboard</p>
          </NavLink>

          <NavLink
            to="/doctor-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-amber-600 text-white shadow-md"
                  : "bg-blue-900 hover:bg-blue-800 text-gray-300"
              }`
            }
          >
            <img
              src={assets.appointment_icon}
              alt="Appointments"
              className="w-5 h-5 opacity-90"
            />
            <p className="text-sm font-medium">Appointments</p>
          </NavLink>

          <NavLink
            to="/doctor-profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-amber-600 text-white shadow-md"
                  : "bg-blue-900 hover:bg-blue-800 text-gray-300"
              }`
            }
          >
            <img
              src={assets.add_icon}
              alt="Add Doctor"
              className="w-5 h-5 opacity-90"
            />
            <p className="text-sm font-medium">  Doctor Profile</p>
          </NavLink>

   
        </ul>
      )}
    </div>
  );
};
