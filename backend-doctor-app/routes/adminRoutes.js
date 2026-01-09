import {
  addDoctor,
  adminDashboard,
  allDoctors,
  appointmentCancel,
  appointmentsAdmin, 
  loginAdmin,
} from '../controllers/adminController.js';
import {changeAvailablity} from '../controllers/doctorController.js';
import {authAdmin} from '../middlewares/authAdmin.js';
import {upload} from '../multer/singlelocal.js';
import express from 'express';
const adminRouter = express.Router ();
  adminRouter.post ('/add-doctor', authAdmin, upload, addDoctor);

 
adminRouter.post ('/login', loginAdmin);
adminRouter.get ('/all-doctors', authAdmin, allDoctors);
adminRouter.post ('/change-availability', authAdmin, changeAvailablity);
adminRouter.get ('/appointments', authAdmin, appointmentsAdmin);
adminRouter.post ('/cancel-appointment', authAdmin, appointmentCancel);
adminRouter.get ('/dashboard', authAdmin,adminDashboard );
export default adminRouter;
