import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { FaUserMd, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AppContext } from "../../context/AppContext.jsx";

export const AllApointment = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormet } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          All Appointments
        </h2>
        <p className="text-sm text-gray-500">
          Total: {appointments?.length || 0}
        </p>
      </div>

      <div className="bg-white shadow-md rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-7 bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700">
          <p>Action</p>
          <p>Image</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
        </div>

        {/* Table Body */}
        <div>
          {appointments && appointments.length > 0 ? (
            appointments.map((item, index) => {
              const user = item.userData || {};
              const doctor = item.docData || {};

              return (
                <div
                  key={item._id || index}
                  className="grid grid-cols-7 items-center px-4 py-3 text-gray-700 border-b hover:bg-gray-50 transition-all"
                >
                  {/* Action */}
                  <div className="flex items-center gap-3 text-lg">
                    {item.cancelled ? (
                      <span className="text-sm text-red-500 font-medium">
                        Cancelled
                      </span>
                    ) : (
                      <button
                        className="text-red-500 hover:text-red-700 transition"
                        onClick={() => cancelAppointment(item._id)}
                      >
                        <MdDelete />
                      </button>
                    )}
                  </div>

                   
                  <div>
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>

                  
                  <p className="text-sm font-medium">{user.name || "N/A"}</p>

                   
                  <p className="text-sm">
                    {user.dob ? calculateAge(user.dob) : "—"}
                  </p>

                 
                  <p className="flex items-center gap-2 text-sm">
                    <FaCalendarAlt className="text-emerald-500" />
                    {slotDateFormet(item.slotDate)} {item.slotTime}
                  </p>

                 
                  <p className="flex items-center gap-2 text-sm">
                    <FaUserMd className="text-blue-500" />
                    {doctor.name || "—"}
                  </p>

                
                  <p className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    <FaMoneyBillWave className="text-green-500" /> ₹
                    {doctor.fees || "—"}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-gray-500">
              No appointments found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
