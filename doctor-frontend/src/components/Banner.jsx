import React from "react";
import { assets } from "../assets/assets.js";

export const Banner = () => {
  return (
    <section className="bg-blue-600 text-white py-12 px-6 rounded-2xl flex flex-col md:flex-row items-center justify-between">
      
      
      
      <div className="space-y-4 max-w-md text-center md:text-left">
        <p className="text-2xl font-semibold">Book Appointment</p>

        <p className="text-4xl font-bold leading-snug">
          With 100+ Trusted Doctors
        </p>

        <p className="text-sm leading-relaxed text-blue-100">
          Find experienced and certified doctors across multiple specialities.
          Book appointments easily, manage your visits, and get reliable
          healthcare support anytime.
        </p>
      </div>

      {/* Image */}
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

