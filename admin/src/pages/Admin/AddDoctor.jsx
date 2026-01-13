import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

export const AddDoctor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [education, setEducation] = useState("");
  const [fees, setFees] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [experience, setExperience] = useState("");
  const [about, setAbout] = useState("");
  const [loader, setloader] = useState(false);

  const [file, setFile] = useState(null);
  const { backendUrl, aToken } = useContext(AdminContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloader(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      formData.append("degree", education);
      formData.append("abalibility", true);

      formData.append("fees", Number(fees));
      formData.append("specality", specialty);
      formData.append("experience", experience);
      formData.append("about", about);

      if (file) formData.append("file", file);

      const res = await fetch(`${backendUrl.replace(/\/$/, "")}/api/admin/add-doctor`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setloader(false);
        setName("");
        setEmail("");
        setPassword("");
        setEducation("");
        setFees("");
        setSpecialty("");
        setExperience("");
        setAbout("");
        setFile("")
        toast.success(data.message);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-start py-10 bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Add Doctor</h2>

        <div className="flex items-center space-x-6 mb-6">
          <label
            htmlFor="doc-img"
            className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
          >
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-32 h-32 object-cover rounded"
              />
            ) : (
              <>
                <img
                  src={assets.upload_area}
                  alt="Upload"
                  className="w-12 h-12 mb-2"
                />
                <span className="text-center text-sm text-gray-500">
                  Upload doctor
                  <br />
                  picture
                </span>
              </>
            )}
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Doctor Email
            </label>
            <input
              type="email"
              value={email}
               autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Doctor Password
            </label>
            <input
              type="password"
              value={password}
               autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Doctor Education
            </label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="Education"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Doctor Fees
            </label>
            <input
              type="number"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              placeholder="Fees"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Doctor Specialty
            </label>
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Specialty</option>
              <option value="cardiology">Cardiology</option>
              <option value="neurology">Neurology</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="orthopedics">Orthopedics</option>
              <option value="dermatology">Dermatology</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Doctor About
            </label>
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="About"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Doctor Experience
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Experience</option>

              {Array.from({ length: 10 }, (_, i) => {
                const year = i + 1;
                return (
                  <option key={year} value={year}>
                    {year} {year === 1 ? "Year" : "+ Years"}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className={` w-full bg-blue-700 text-white py-3 rounded-md font-semibold hover:bg-blue-800 transition-colors ${
              loader ? "cursor-pointer" : "cursor-not-allowed"
            }`}
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};
