import { catchAsync } from "../middlewares/catchAsync.js";
import { bookAppointmentService } from "../services/bookAppointmentService.js";
import { cancelAppointmentService } from "../services/cancelAppointmentService.js";
import { getProfileService } from "../services/getProfileService.js";
import { listAppointmentService } from "../services/listAppointmentService.js";
import { loginUserService } from "../services/loginUserService.js";
import { messageService } from "../services/messageService.js";
import { registerService } from "../services/registerService.js";
import { updateProfileService } from "../services/updateProfileService.js";

export const registerUser =catchAsync(async (req,res,next)=> {
await registerService(req,res,next)
})
export const loginUser =catchAsync(async (req,res,next)=> {
await loginUserService(req,res,next)
})
export const getProfile =catchAsync(async (req,res,next)=> {
await getProfileService(req,res,next)
})
export const updateProfile =catchAsync(async (req,res,next)=> {
await updateProfileService(req,res,next)
})
export const bookAppointment =catchAsync(async (req,res,next)=> {
await bookAppointmentService(req,res,next)
})
export const listAppointment =catchAsync(async (req,res,next)=> {
await listAppointmentService(req,res,next)
})
export const cancelAppointment =catchAsync(async (req,res,next)=> {
await cancelAppointmentService(req,res,next)
})

export const message =catchAsync(async (req,res,next)=> {
await messageService(req,res,next)
})
