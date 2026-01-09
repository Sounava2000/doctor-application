import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { AppContext } from "../../context/AppContext.jsx";

export const Dashboard = () => {
  const { aToken, getDashData, dashData } = useContext(AdminContext);
const {slotDateFormat } = useContext(AppContext)
 const { calculateAge, slotDateFormet } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

   
  const activeAppointments =
    dashData?.latestAppointments?.filter((apt) => !apt.cancelled) || [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
       
        <div className="bg-blue-100 p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-blue-800">Doctors</h2>
          <p className="text-4xl font-bold mt-2 text-blue-900">
            {dashData?.availableDoctors || 0}
          </p>
        </div>
 
        <div className="bg-green-100 p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-green-800">Patients</h2>
          <p className="text-4xl font-bold mt-2 text-green-900">
            {dashData?.patients || 0}
          </p>
        </div>

        
        <div className="bg-purple-100 p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-purple-800">
            Active Appointments
          </h2>
          <p className="text-4xl font-bold mt-2 text-purple-900">
            {activeAppointments.length}
          </p>
        </div>
      </div>

      
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Latest Appointments
        </h2>

        {activeAppointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">Doctor</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Time</th>
                </tr>
              </thead>
              <tbody>
                {activeAppointments.map((apt, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">{apt.userData?.name}</td>
                    <td className="py-3 px-4">{apt.docData?.name}</td>
                    <td className="py-3 px-4">{ apt.slotDate}</td>
                    <td className="py-3 px-4">{apt.slotTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No active appointments available.</p>
        )}
      </div>
    </div>
  );
};
