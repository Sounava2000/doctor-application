import React from "react";
import { assets } from "../assets/assets";
 

export const Banner = () => {
  
  return (
    <section className="bg-blue-600 text-white py-12 px-6 rounded-2xl flex flex-col md:flex-row items-center justify-between">
      
      <div className="space-y-4 max-w-md text-center md:text-left">
        <p className="text-2xl font-semibold">Book Appointment</p>
        <p className="text-4xl font-bold leading-snug">
          With 100+ Trusted Doctors
        </p>

        <button
          onClick={() => {
            navigator("/login");
            scrollTo(0, 0);
          }}
          className="mt-4 px-6 py-2 bg-white text-blue-600 font-medium rounded-lg shadow hover:bg-gray-100 transition"
        >
          Book Now
        </button>
      </div>

      
      <div className="mt-8 md:mt-0">
        <img
          src={assets.appointment_img}
          alt="appointment"
          className="w-full max-w-sm rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
};
