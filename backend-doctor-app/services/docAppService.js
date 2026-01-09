import {appointmentModel} from '../models/appointmentModal.js';

export const docAppService = async (req, res, next) => {
  try {
    const docId = req.doctor.id;
    const appoointments = await appointmentModel.find ({docId});
    res.json ({success: true, appointments: appoointments});
  } catch (error) {
    next (error);
  }
};
