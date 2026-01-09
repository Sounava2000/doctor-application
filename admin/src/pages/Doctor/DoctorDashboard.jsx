import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext.jsx";

export const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  if (!dashData) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Doctor Dashboard</h2>
 
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-blue-100 text-blue-800 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-medium">Total Earnings</h3>
          <p className="text-2xl font-bold mt-2">₹{dashData.earning}</p>
        </div>

        <div className="bg-green-100 text-green-800 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-medium">Total Appointments</h3>
          <p className="text-2xl font-bold mt-2">{dashData.appointments}</p>
        </div>

        <div className="bg-yellow-100 text-yellow-800 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-medium">Total Patients</h3>
          <p className="text-2xl font-bold mt-2">{dashData.patients}</p>
        </div>
      </div> 
      <div className="bg-white shadow rounded-2xl p-4 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-3">Latest Appointments</h3>

        {dashData.latestAppointments?.length > 0 ? (
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-3 border-b">#</th>
                <th className="py-2 px-3 border-b">Patient ID</th>
                <th className="py-2 px-3 border-b">Date</th>
                <th className="py-2 px-3 border-b">Time</th>
                <th className="py-2 px-3 border-b">Amount</th>
                <th className="py-2 px-3 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {dashData.latestAppointments.slice(0, 5).map((appt, index) => (
                <tr key={appt._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3">{index + 1}</td>
                  <td className="py-2 px-3">{appt.userData.name}</td>
                  <td className="py-2 px-3">{appt.slotDate.replace(/_/g, "/")}</td>
                  <td className="py-2 px-3">{appt.slotTime}</td>
                  <td className="py-2 px-3">₹{appt.amount}</td>
                  <td className="py-2 px-3">
                    {appt.isCompleted ? (
                      <span className="text-green-600 font-medium">Completed</span>
                    ) : appt.isCancelled ? (
                      <span className="text-red-600 font-medium">Cancelled</span>
                    ) : (
                      <span className="text-yellow-600 font-medium">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No recent appointments found.</p>
        )}
      </div>
    </div>
  );
};
