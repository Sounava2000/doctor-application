import { useState } from "react";

import "./App.css";
import { Login } from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import { NavBar } from "./components/NavBar";
import { Sidebar } from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import { DoctorList } from "./pages/Admin/DoctorList";
import { AddDoctor } from "./pages/Admin/AddDoctor";
import { AllApointment } from "./pages/Admin/AllApointment";
import { Dashboard } from "./pages/Admin/Dashboard";
import { DoctorContext } from "./context/DoctorContext";
import { DoctorDashboard } from "./pages/Doctor/DoctorDashboard";
import { DoctorAppointments } from "./pages/Doctor/DoctorAppointments";
import { DoctorProfile } from "./pages/Doctor/DoctorProfile";
function App() {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken || dToken ? (
    <div className="bg-amber-50">
      <ToastContainer></ToastContainer>
      <NavBar></NavBar>
      <Sidebar></Sidebar>
      <Routes>
        
        <Route path="/" element={<></>} />
        <Route path="/all-appointments" element={<AllApointment />} />

        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/doctor-list" element={<DoctorList />} />
       

        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />

      </Routes>
    </div>
  ) : (
    <>
      <div>
        <Login></Login>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
