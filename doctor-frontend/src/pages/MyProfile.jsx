import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { assets } from "../assets/assets.js";
import { toast } from "react-toastify";

export const MyProfile = () => {
  const {
    token,
    userData,
    loadUserProfileData,
    setuserData,
  } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone || "");
      formData.append("gender", userData.gender || "");
      formData.append("dob", userData.dob || "");
      if (image) formData.append("file", image);

      const res = await fetch(
        `${backendUrl.replace(/\/$/, "")}/api/user/update-profile`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8">
          <label className="relative cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover"
            />
            {isEdit && (
              <img
                src={assets.upload_icon}
                alt="Upload"
                className="absolute bottom-1 right-1 w-7 h-7 bg-white rounded-full p-1 shadow"
              />
            )}
            {isEdit && (
              <input
                type="file"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            )}
          </label>

          {isEdit ? (
            <input
              type="text"
              value={userData.name || ""}
              onChange={(e) =>
                setuserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="mt-3 text-xl font-semibold border px-3 py-1 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <p className="mt-3 text-2xl font-semibold text-gray-800">
              {userData.name}
            </p>
          )}

          <button
            onClick={() => (isEdit ? updateUserProfileData() : setIsEdit(true))}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm transition"
          >
            {isEdit ? "Save Profile" : "Edit Profile"}
          </button>
        </div>

        {/* Contact Info */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Contact Information
          </h2>

          <p className="text-gray-600 font-medium">Email</p>
          <p className="text-gray-800 mb-4">{userData.email}</p>

          <p className="text-gray-600 font-medium">Phone</p>
          {isEdit ? (
            <input
              type="text"
              value={userData.phone || ""}
              onChange={(e) =>
                setuserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <p className="text-gray-800">{userData.phone || "N/A"}</p>
          )}
        </div>

        {/* Basic Info */}
        <div className="border-t pt-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Basic Information
          </h2>

          <p className="text-gray-600 font-medium">Gender</p>
          {isEdit ? (
            <select
              value={userData.gender || ""}
              onChange={(e) =>
                setuserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-800">{userData.gender || "N/A"}</p>
          )}

          <p className="mt-4 text-gray-600 font-medium">Date of Birth</p>
          {isEdit ? (
            <input
              type="date"
              value={userData.dob || ""}
              onChange={(e) =>
                setuserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <p className="text-gray-800">{userData.dob || "N/A"}</p>
          )}
        </div>
      </div>
    </div>
  );
};
