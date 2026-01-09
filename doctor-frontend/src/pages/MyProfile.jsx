import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { assets } from "../assets/assets.js";
import { toast } from "react-toastify";
export const MyProfile = () => {
  const {
    getDoctorsData,
    doctors,
    token,
    setToken,
    userData,
    loadUserProfileData,
    setuserData,
  } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);

      formData.append("gender", userData.gender);

      formData.append("dob", userData.dob);
      image && formData.append("file", image);
      const res = await fetch("http://localhost:8000/api/user/update-profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        console.error(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
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
        <div className="flex flex-col items-center mb-8">
          {isEdit ? (
            <label htmlFor="">
              <div>
                <img
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt=""
                />
                <img src={image ? "" : assets.upload_icon} alt="" />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                name=""
                id=""
              />
            </label>
          ) : (
            <img
              src={userData.image}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover mb-3"
            />
          )}

          {isEdit ? (
            <input
              type="text"
              value={userData.name || ""}
              onChange={(e) =>
                setuserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="text-xl font-semibold border px-3 py-1 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <p className="text-2xl font-semibold text-gray-800">
              {userData.name}
            </p>
          )}
          <button
            onClick={() => {
              if (isEdit) {
                updateUserProfileData();
              } else {
                setIsEdit(true);
              }
            }}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm transition duration-200"
          >
            {isEdit ? "Save Profile" : "Edit Profile"}
          </button>
        </div>

        <div className="mb-8 border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Contact Information
          </h2>

          <div className="mb-4">
            <p className="text-gray-600 font-medium">Email</p>
            {isEdit ? (
              <input
                type="email"
                value={userData.email || ""}
                onChange={(e) =>
                  setuserData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <p className="text-gray-800">{userData.email}</p>
            )}
          </div>

          <div className="mb-4">
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
              <p className="text-gray-800">{userData.phone}</p>
            )}
          </div>

           
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Basic Information
          </h2>

          <div className="mb-4">
            <p className="text-gray-600 font-medium">Gender</p>
            {isEdit ? (
              <select
                value={userData.gender || ""}
                onChange={(e) =>
                  setuserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-800">{userData.gender}</p>
            )}
          </div>

          <div>
            <p className="text-gray-600 font-medium">Date of Birth</p>
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
              <p className="text-gray-800">{userData.dob}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
