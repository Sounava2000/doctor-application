import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setdashData] = useState(false);
 const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
  

 
  const getAllDoctors = async () => {
    try {
      const res = await fetch(`  ${backendUrl.replace(/\/$/, "")}/api/admin/all-doctors`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setDoctors(data.doctors || []);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const changeAvailability = async (docId) => {
    try {
      const res = await fetch(
        ` ${backendUrl.replace(/\/$/, "")}/api/admin/change-availability`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${aToken}`,
          },
          credentials: "include",
          body: JSON.stringify({ docId }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      toast.success(data.message);
      getAllDoctors();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const res = await fetch(` ${backendUrl.replace(/\/$/, "")}/api/admin/appointments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${aToken}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const res = await fetch(
        ` ${backendUrl.replace(/\/$/, "")}/api/admin/cancel-appointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${aToken}`,
          },
          body: JSON.stringify({ appointmentId }),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getDashData = async () => {
    try {
      const res = await fetch(` ${backendUrl.replace(/\/$/, "")}/api/admin/dashboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${aToken}`,
        },
      });
      const data = await res.json();

      if (data.success) {
        setdashData(data.dashData);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <AdminContext.Provider
      value={{
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        appointments,
        setAppointments,
        getAllAppointments,
        changeAvailability,
        getDashData,
        cancelAppointment,
        dashData, setdashData
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
