import React, { useContext, useEffect } from "react";
 
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const TopDoctors = () => {
  const navigate = useNavigate();
  const {  getDoctorsData, doctors} = useContext(AppContext)
  useEffect(() => {
    getDoctorsData()
   
  }, [])
  
 console.log(doctors)
  return (
    <section className="py-12 px-6 bg-gray-50 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Top Doctors</h1>
      <p className="text-gray-500 mb-8">
        Meet our top-rated doctors for your health needs
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {doctors.map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg hover:-translate-y-1 transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-full mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.specality}</p>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={()=> {navigate('/doctor'); scrollTo(0,0)}}
        className=" mt-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition"
      >
        More
      </button>
    </section>
  );
};
