import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Doctor } from "./pages/Doctor";
import { About } from "./pages/About";
import { Login } from "./pages/Login";
import { MyProfile } from "./pages/MyProfile";
import { Contect } from "./pages/Contect.jsx";
import { MyAppointment } from "./pages/MyAppointment.jsx";
import { Appointment } from "./pages/Appointment.jsx";
import { Nav } from "./components/Nav.jsx";
import { Footer } from "./components/Footer.jsx";
import { ToastContainer, toast } from "react-toastify";
function App() {
  return (
    <>
      <div className="mx-4 sm:mx-[10%]">
        <Nav></Nav>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/doctor/:specality" element={<Doctor />} />
          <Route path="/myProfile" element={<MyProfile />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
          <Route path="/myappointment" element={<MyAppointment />} />

          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contect />} />
          <Route path="/myProfile" element={<MyProfile />} />
        </Routes>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
