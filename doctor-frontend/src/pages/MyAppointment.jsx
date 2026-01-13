import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

export const MyAppointment = () => {
  const {
    getDoctorsData,
    token,
  } = useContext(AppContext);

  const [appointment, setAppointment] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const getUserAppointments = async () => {
    try {
      const res = await fetch(
        `${backendUrl.replace(/\/$/, "")}/api/user/myappointment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setAppointment(data.appointment);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to load appointments");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const res = await fetch(
        `${backendUrl.replace(/\/$/, "")}/api/user/cancel-appointment`,
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
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split("_");
    return `${day} ${months[Number(month) - 1]} ${year}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
        My Appointments
      </h1>

      <div className="max-w-4xl mx-auto grid gap-6">
        {appointment.length === 0 && (
          <p className="text-center text-gray-500">
            No appointments found
          </p>
        )}

        {appointment.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row items-center justify-between hover:shadow-lg transition"
          >
            <img
              src={item.docData.image}
              alt={item.docData.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
            />

            <div className="flex-1 md:ml-6 mt-4 md:mt-0 text-center md:text-left">
              <p className="text-xl font-semibold text-gray-800">
                {item.docData.name}
              </p>
              <p className="text-blue-600 font-medium">
                {item.docData.specality}
              </p>

              <p className="mt-2 text-gray-700">
                <span className="font-semibold">Date & Time:</span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>

              <p className="mt-1 text-gray-700">
                <span className="font-semibold">Fees:</span> ₹{item.amount}
              </p>

              {item.cancelled && (
                <p className="mt-2 text-red-500 font-semibold">
                  Appointment Cancelled
                </p>
              )}
            </div>

            {!item.cancelled && (
              <button
                onClick={() => cancelAppointment(item._id)}
                className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition"
              >
                Cancel Appointment
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
