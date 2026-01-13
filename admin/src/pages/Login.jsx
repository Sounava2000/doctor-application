import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

export const Login = () => {
  const [state, setState] = useState("Admin");
  const { aToken, setAToken, backendUrl } = useContext(AdminContext);
  const { dToken, setDtoken } = useContext(DoctorContext);
console.log(backendUrl)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
 const endpoint =
  state === "Admin"
    ? `${backendUrl.replace(/\/$/, "")}/api/admin/login`
    : `${backendUrl.replace(/\/$/, "")}/api/doctor/login`;


      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      console.log("Response status:", response.status);

      let data;
      try {
        data = await response.json();
      } catch {
        const text = await response.text();
        console.warn("Response not JSON:", text);
        alert(text || "Server returned invalid response");
        return;
      }

      if (data.success) {
        console.log(`${state} Login Successful ✅`);

        if (state === "Admin") {
          setAToken(data.token);
          localStorage.setItem("aToken", data.token);
          toast.success(`${state} Login Successful ✅`);
        } else {
          setDtoken(data.token);
          localStorage.setItem("dToken", data.token);
          toast.success(`${state} Login Successful ✅`);
        }
      } else {
        toast.error(data.message || "Login failed ❌");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm"
      >
        <div className="text-center mb-6">
          <p className="text-2xl font-semibold text-gray-700">
            <span className="text-blue-600 font-bold">{state}</span> Login
          </p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Email</p>
          <input
            type="email"
            required
            value={email}
              autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-1">Password</p>
          <input
            type="password"
            required
            value={password}
            autoComplete="current-password" 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Not an {state}?{" "}
          <button
            type="button"
            onClick={() => setState(state === "Admin" ? "Doctor" : "Admin")}
            className="text-blue-600 hover:underline font-medium"
          >
            Switch to {state === "Admin" ? "Doctor" : "Admin"}
          </button>
        </p>
      </form>
    </div>
  );
};
