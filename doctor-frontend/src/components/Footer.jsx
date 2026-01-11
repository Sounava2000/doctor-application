import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-blue-600 text-gray-300 py-12 mt-3 px-6 rounded-2xl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">About Us</h2>
          <p className="text-sm leading-relaxed">
            We provide trusted medical appointments with top doctors across
            various specialities. Your health, our priority.
          </p>
        </div>
 
      
      
 
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Contact</h2>
          <p className="text-sm">📍 123 Health Street, Kolkata</p>
          <p className="text-sm">📞 +**********</p>
          <p className="text-sm">✉️ support@healthcare.com</p>
        </div>
      </div>
 
      <div className="text-center text-xs text-white-500 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} HealthCare. All rights reserved.
      </div>
    </footer>
  );
};
