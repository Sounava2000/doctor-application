import React, { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";


export const AppContext = createContext();


export const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setuserData] = useState(false);
  const getDoctorsData = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/doctor/list`);
      const data = await res.json();
      setDoctors(data.message);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };
  const loadUserProfileData = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/api/user/get-profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setuserData(data.userData);
      } else {
        console.error(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setuserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        getDoctorsData,
        doctors,
        token,
        setToken,
        userData,
        loadUserProfileData,
        setuserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
