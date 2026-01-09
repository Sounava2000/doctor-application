// Api for Adding doctor

import {catchAsync} from '../middlewares/catchAsync.js';
import {addDoctorService} from '../services/addDoctorService.js';
import { adminDashboardService } from '../services/adminDashboardService.js';
import {allDoctorService} from '../services/allDoctorService.js';
import { appointmentCancelService } from '../services/appointmentCancelService.js';
import { appointmentsAdminService } from '../services/appointmentsAdminService.js';
import {loginService} from '../services/loginService.js';

export const addDoctor = catchAsync (async (req, res, next) => {
  await addDoctorService (req, res, next);
});
export const loginAdmin = catchAsync (async (req, res, next) => {
  await loginService (req, res, next);
});

export const allDoctors = catchAsync (async (req, res, next) => {
  await allDoctorService (req, res, next);
});

export const appointmentsAdmin =  catchAsync (async (req,res,next) => {
  await appointmentsAdminService(req,res,next)
})
export const appointmentCancel =  catchAsync (async (req,res,next) => {
  await appointmentCancelService(req,res,next)
})
export const adminDashboard =  catchAsync (async (req,res,next) => {
  await adminDashboardService(req,res,next)
})