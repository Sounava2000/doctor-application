import React from "react";
import { assets } from "../assets/assets";

export const Header = () => {
  return (
    <div className="bg-blue-600 mt-2 text-white p-8 rounded-2xl flex justify-between items-center">
     
      <div className="max-w-lg space-y-4">
        <p className="text-3xl font-bold leading-snug">
          Book Appointment <br /> With Trusted Doctor
        </p>

        <div className="flex items-center gap-3">
          <img
            src={assets.group_profiles}
            alt="profiles"
            className="w-15 h-10 rounded-full"
          />
          <p className="text-sm">
              Easily book appointments with experienced and trusted doctors.
  Get quality healthcare support, personalized consultations,
  and manage your appointments anytime, anywhere.
          </p>
        </div>

       
       
      </div>
 
      <div>
        <img
          src={assets.header_img}
          alt="doctor"
          className="max-w-sm rounded-xl "
        />
      </div>
    </div>
  );
};
