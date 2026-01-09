import express from "express";
import {
  appCancel,
  appComplete,
  docApp,
  docDashboard,
  docProfile,
  doctorList,
  login,
  updateDocProfile,
} from "../controllers/doctorController.js";
import { authDoctor } from "../middlewares/authDoctor.js";
const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", login);
doctorRouter.get("/appointments", authDoctor, docApp);
doctorRouter.post("/complete-appointment", authDoctor, appComplete);
doctorRouter.post("/cancel-appointment", authDoctor, appCancel);
doctorRouter.post("/dashboard", authDoctor, docDashboard);
doctorRouter.post("/update-profile", authDoctor, updateDocProfile);
doctorRouter.get("/profile", authDoctor, docProfile);

export default doctorRouter;
