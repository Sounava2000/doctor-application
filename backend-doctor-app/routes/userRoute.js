import express from 'express';
import {
  bookAppointment,
  cancelAppointment,
  getProfile,
  listAppointment,
  loginUser,
  message,
  registerUser,
  updateProfile,
} from '../controllers/userController.js';
import {authUser} from '../middlewares/authUser.js';
import {upload} from '../multer/singlelocal.js';
const userRouter = express.Router ();
userRouter.post ('/register', registerUser);
userRouter.post ('/login', loginUser);
userRouter.get ('/get-profile', authUser, getProfile);
userRouter.post ('/update-profile', upload, authUser, updateProfile);
userRouter.post ('/book-appointment', authUser, bookAppointment);
userRouter.get ('/myappointment', authUser, listAppointment);
userRouter.post ('/cancel-appointment', authUser, cancelAppointment);
 userRouter.post ('/send-message', authUser, message);
 

export default userRouter;
