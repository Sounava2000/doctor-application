import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const Doctor = () => {
  const { specality } = useParams(); 
  const navigate = useNavigate();
  const [filterDoc, setfilterDoc] = useState([]);
  const { doctors } = useContext(AppContext);

 const applyFilter = () => {
  if (specality) {
    const newArray = doctors.filter(
      (currEle) =>
        currEle.specality.toLowerCase() === specality.toLowerCase()
    );
    setfilterDoc(newArray);
  } else {
    setfilterDoc(doctors);
  }
};


useEffect(() => {
  applyFilter();
  window.scrollTo(0, 0);
}, [doctors, specality]);

  return (
    <div className="flex p-6 gap-6">
      {/* Speciality buttons */}
      <div className="w-48 flex flex-col gap-3">
        <p className="text-lg font-semibold mb-2">Browse Speciality</p>
        {[
          "General Physician",
          "Gynecologist",
          "Dermatologist",
          "Pediatricians",
          "Neurologist",
        ].map((spec) => (
          <button
            key={spec}
            onClick={() => navigate(`/doctor/${spec}`)}
            className={`px-3 py-2 text-sm border rounded-md shadow ${
              spec === specality
                ? "bg-blue-600 text-white"
                : "bg-white text-black hover:bg-amber-200"
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filterDoc.map((currEle, index) => (
          <div
          onClick={()=> navigate(`/appointment/${currEle._id}`)}
            key={index}
            className="bg-white rounded-xl shadow p-4 text-center cursor-pointer"
          >
            <img
              src={currEle.image}
              alt={currEle.name}
              className="w-24 h-24 mx-auto rounded-full mb-3"
            />
            <p className="font-semibold">{currEle.name}</p>
            <p>{currEle.specality}</p>

            <p className="text-sm text-gray-500">{currEle.speciality}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
