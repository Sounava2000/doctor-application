import {catchAsync} from '../middlewares/catchAsync.js';
import { appCancelService } from '../services/appCancelService.js';
import { appCompleteService } from '../services/appCompleteService.js';
import { changeService } from '../services/changeService.js';
import { docAppService } from '../services/docAppService.js';
import { docDashboardService } from '../services/docDashboardService.js';
import { docProfileService } from '../services/docProfileService.js';
import { doctorListService } from '../services/doctorListService.js';
import { doctorLoginService } from '../services/doctorLoginService.js';
import { updateDocProfileService } from '../services/updateDocProfileService.js';

export const changeAvailablity = catchAsync (async (req, res, next) => {
  await changeService (req, res, next);
});

export const doctorList = catchAsync (async (req, res, next) => {
  await doctorListService (req, res, next);
});
export const login = catchAsync (async (req, res, next) => {
  await doctorLoginService (req, res, next);
});
export const docApp = catchAsync (async (req, res, next) => {
  await docAppService (req, res, next);
});
export const appComplete = catchAsync (async (req, res, next) => {
  await appCompleteService (req, res, next);
}); 
export const appCancel = catchAsync (async (req, res, next) => {
  await appCancelService (req, res, next);

});
export const docDashboard = catchAsync (async (req, res, next) => {
  await docDashboardService (req, res, next);
});
export const docProfile = catchAsync (async (req, res, next) => {
  await docProfileService (req, res, next);
});
export const updateDocProfile = catchAsync (async (req, res, next) => {
  await updateDocProfileService (req, res, next);
});
