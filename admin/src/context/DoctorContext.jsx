import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

export const DoctorContextProvider = ({ children }) => {
  const [dToken, setDtoken] = useState(
    localStorage.getItem("dToken") || ""
  );

  const [appointments, setAppointments] = useState([]);
  const [dashData, setdashData] = useState({});
  const [profileData, setprofileData] = useState(false);

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // 🔹 Get Appointments
  const getAppointments = async () => {
    try {
      const res = await fetch(
        `${backendUrl.replace(/\/$/, "")}/api/doctor/appointments`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
          credentials: "include",
        }
      );

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

  // 🔹 Complete Appointment
  const completeAppointment = async (appointmentId) => {
    try {
      const res = await fetch(
        `${backendUrl.replace(/\/$/, "")}/api/doctor/complete-appointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${dToken}`,
          },
          credentials: "include",
          body: JSON.stringify({ appointmentId }),
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🔹 Cancel Appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const res = await fetch(
        `${backendUrl.replace(/\/$/, "")}/api/doctor/cancel-appointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${dToken}`,
          },
          credentials: "include",
          body: JSON.stringify({ appointmentId }),
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🔹 Dashboard Data
  const getDashData = async () => {
    try {
      const res = await fetch(
        `${backendUrl.replace(/\/$/, "")}/api/doctor/dashboard`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
          credentials: "include",
        }
      );

      const data = await res.json();
      if (data.success) {
        setdashData(data.dashData);
      } else {
        toast.error("Failed to load dashboard data");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🔹 Profile Data
  const getProfileData = async () => {
    try {
      const res = await fetch(
        `${backendUrl.replace(/\/$/, "")}/api/doctor/profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
          credentials: "include",
        }
      );

      const data = await res.json();
      if (data.success) {
        setprofileData(data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        dToken,
        setDtoken,
        appointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        dashData,
        getDashData,
        profileData,
        getProfileData,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};
