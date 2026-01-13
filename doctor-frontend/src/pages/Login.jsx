import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { token, setToken } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const url =
        state === "Sign Up"
          ? `${backendUrl.replace(/\/$/, "")}/api/user/register`
          : `${backendUrl.replace(/\/$/, "")}/api/user/login`;

      const body =
        state === "Sign Up"
          ? { name, email, password }
          : { email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);

        setEmail("");
        setName("");
        setPassword("");

        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>

        <p className="text-gray-500 text-center mb-8">
          Please {state === "Sign Up" ? "sign up" : "log in"} to book an
          appointment.
        </p>

        {state === "Sign Up" && (
          <div className="mb-5">
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}

        <div className="mb-5">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={
              state === "Sign Up" ? "new-password" : "current-password"
            }
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-600 font-semibold cursor-pointer"
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-blue-600 font-semibold cursor-pointer"
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};
