import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

export const MyAppointment = () => {
  const {
    getDoctorsData,

    token,
    setToken,
    userData,
    loadUserProfileData,
    setuserData,
  } = useContext(AppContext);
  const [appointment, setAppointment] = useState([]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getUserAppointments = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/user/myappointment", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setAppointment(data.appointment);
      } else {
        toast.error(data.message || "Failed to book appointment");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  const cancelAppointment = async (appointmentId) => {
    console.log(appointmentId);
    try {
      const res = await fetch(
        "http://localhost:8000/api/user/cancel-appointment",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ appointmentId }),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    if (token) {
      getUserAppointments();
      console.log(appointment);
    }
  }, [token]);
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
        My Appointments
      </h1>

      <div className="max-w-4xl mx-auto grid gap-6">
        {appointment.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row items-center justify-between hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex-shrink-0">
              <img
                src={item.docData.image}
                alt={item.docData.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
              />
            </div>

            <div className="flex-1 md:ml-6 mt-4 md:mt-0 text-center md:text-left">
              <p className="text-xl font-semibold text-gray-800">
                {item.docData.name}
              </p>
              <p className="text-blue-600 font-medium">
                {item.docData.specality}
              </p>

              <div className="mt-3 text-gray-600">
                <p className="font-semibold text-gray-700">Degree:</p>
                <p>{item.docData.degree}</p>
              </div>

              <div className="mt-3">
                <p className="text-gray-700">
                  <span className="font-semibold">Date & Time:</span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              <div className="mt-3">
                <p className="text-gray-700">
                  <span className="font-semibold">Fees:</span> ₹{item.amount}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 mt-6 md:mt-0">
            
            

              {!item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition duration-200"
                >
                  Cancel Appointment
                </button>
              )}
                 {item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition duration-200"
                >
                   Appointment Cancel
                </button>
              )}
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
