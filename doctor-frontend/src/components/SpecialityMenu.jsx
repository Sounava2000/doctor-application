import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

export const SpecialityMenu = () => {
  return (
    <section id="specality" className="py-12 px-6 bg-gray-50 text-center">
    
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Find by Speciality
      </h1>
      <p className="text-gray-500 mb-8">
          Browse doctors by speciality and connect with trusted healthcare professionals
  for expert medical consultation.
      </p>
 
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctor/${item.speciality}`}
            className="flex flex-col items-center p-4 bg-white rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition"
          >
            <img
              src={item.image}
              alt={item.speciality}
              className="w-16 h-16 object-contain mb-3"
            />
            <p className="text-gray-700 font-medium">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
