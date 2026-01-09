import {appointmentModel} from '../models/appointmentModal.js';

export const listAppointmentService = async (req, res, next) => {
  try {
  const userId = req.user.id;

    const appointment = await appointmentModel.find ({userId});
    res.json ({success: true, appointment: appointment});
  } catch (error) {
    console.log (error);
    res.json ({success: false, message: error.message});
  }
};
 