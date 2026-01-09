import {createContext, useState} from 'react';
import {toast} from 'react-toastify';
export const DoctorContext = createContext ();
export const DoctorContextProvider = props => {
  const [dToken, setDtoken] = useState (
    localStorage.getItem ('dToken') ? localStorage.getItem ('dToken') : ''
  );
  const [appointments, setAppointments] = useState ([]);
  const [dashData, setdashData] = useState ({});
  const [profileData, setprofileData] = useState (false);
  const getAppointments = async () => {
    try {
      const res = await fetch (
        'http://localhost:8000/api/doctor/appointments',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${dToken}`,
          },
        }
      );
      const data = await res.json ();
      if (data.success) {
        setAppointments (data.appointments);
        console.log (data.appointments);
      } else {
        toast.error (data.message);
      }
    } catch (error) {
      console.error (error);
      toast.error (error.message);
    }
  };
  const completeAppointment = async appointmentId => {
    try {
      const res = await fetch (
        'http://localhost:8000/api/doctor/complete-appointment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${dToken}`,
          },
          body: JSON.stringify ({appointmentId}),
        }
      );
      const data = await res.json ();
      if (data.success) {
        toast.success (data.message);
        getAppointments ();
      } else {
        toast.error (data.message);
      }
    } catch (error) {
      console.log (error);
      toast.error (error.message);
    }
  };
  const CancelAppointment = async appointmentId => {
    try {
      const res = await fetch (
        'http://localhost:8000/api/doctor/cancel-appointment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${dToken}`,
          },
          body: JSON.stringify ({appointmentId}),
        }
      );
      const data = await res.json ();
      if (data.success) {
        toast.success (data.message);
        getAppointments ();
      } else {
        toast.error (data.message);
      }
    } catch (error) {
      console.log (error);
      toast.error (error.message);
    }
  };
  const getDashData = async () => {
    try {
      const res = await fetch ('http://localhost:8000/api/doctor/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dToken}`,
        },
      });

      const data = await res.json ();
      if (data.success) {
        setdashData (data.dashData);
        toast.success (data.dashData);
      } else {
        toast.error ('Failed to load dashboard data');
      }
    } catch (error) {
      console.error (error);
      toast.error (error.message);
    }
  };
  const getProfileData = async () => {
    try {
      const res = await fetch ('http://localhost:8000/api/doctor/profile', {
        method: 'GET',
        headers: {  
          Authorization: `Bearer ${dToken}`,
        },
      });
      const data = await res.json ();
      if (data.success) {
        setprofileData (data.profileData);
        toast.success (data.message);
      } else {
        toast.success (data.message);
      }
    } catch (error) {
      console.error (error);
      toast.error (error.message);
    }
  };
  return (
    <DoctorContext.Provider
      value={{
        dToken,
        setDtoken,
        appointments,
        setAppointments,
        completeAppointment,
        CancelAppointment,
        getAppointments,
        dashData,
        setdashData,
        getDashData,
        profileData,
        setprofileData,
        getProfileData,
      }}
    >
      {props.children}
    </DoctorContext.Provider>
  );
};
