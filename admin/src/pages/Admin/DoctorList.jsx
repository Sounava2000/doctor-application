import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

export const DoctorList = () => {
  const { aToken, doctors, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Doctor List
      </h2>

      {doctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-indigo-200"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-1 text-center">
                {doc.name}
              </h3>
              <span className="text-sm text-indigo-600 font-medium mb-3">
                {doc.specality}
              </span>

              <div className="grid grid-cols-2 gap-2 w-full mb-3 text-gray-700 text-sm">
                <p>
                  <span className="font-semibold">Email:</span> {doc.email}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {doc.date || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Degree:</span> {doc.degree}
                </p>
                <p>
                  <span className="font-semibold">Experience:</span>{" "}
                  {doc.experience}
                </p>
                <p>
                  <span className="font-semibold">Fees:</span> ${doc.fees}
                </p>
              </div>

              <p className="text-gray-600 text-sm mb-3 text-center">
                {doc.about}
              </p>

              <div className="flex items-center space-x-2 mb-2">
                <label className="flex items-center space-x-2 text-gray-700">
                  <input
                    type="checkbox"
                    checked={doc.abalibility}
                    onChange={() => changeAvailability(doc._id)}
                    className="w-5 h-5 text-indigo-600 accent-indigo-600"
                  />
                  <span>Available</span>
                </label>
              </div>

              {doc.slot_booked && Object.keys(doc.slot_booked).length > 0 && (
                <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                  Slots booked: {Object.keys(doc.slot_booked).length}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">No doctors found.</p>
      )}
    </div>
  );
};
