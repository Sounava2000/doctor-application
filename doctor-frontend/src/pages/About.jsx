import React from "react";
import { assets } from "../assets/assets";

export const About = () => {
  return (
    <div className="px-6 py-10 bg-gray-50">
      <div className="text-center mb-8">
        <p className="text-3xl font-bold text-blue-600">About Us</p>
        <div className="w-16 h-1 bg-blue-600 mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10">
        <img
          src={assets.about_image}
          alt="About"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />

        <div className="md:w-1/2 text-gray-700 leading-relaxed">
          <p className="mb-4">
            We are committed to providing top-quality medical services and
            connecting patients with the best doctors across the country.
          </p>

          <p className="mb-4">
            Our platform ensures that you can book appointments, consult online,
            and access trusted healthcare easily.
          </p>

          <p>
            We believe in transparency, care, and compassion — making healthcare
            accessible for everyone.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-2xl font-semibold text-gray-800 mb-8">
          Why Choose Us
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <b className="text-blue-600 text-lg block mb-2">
              Experienced Doctors
            </b>
            <p className="text-gray-600">
              Our doctors are highly qualified and have years of experience in
              their respective fields.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <b className="text-blue-600 text-lg block mb-2">
              24/7 Availability
            </b>
            <p className="text-gray-600">
              We ensure that patients can book or consult anytime — day or
              night.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <b className="text-blue-600 text-lg block mb-2">Trusted Platform</b>
            <p className="text-gray-600">
              Thousands of patients trust us every day for reliable and
              convenient healthcare services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
