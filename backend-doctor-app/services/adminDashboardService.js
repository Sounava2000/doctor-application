import {appointmentModel} from '../models/appointmentModal.js';
import {doctorModal} from '../models/doctorModal.js';
import {userModal} from '../models/userModal.js';

export const adminDashboardService = async (req, res, next) => {
  try {
    const doctors = await doctorModal.find ({});
    const users = await userModal.find ({});
    const appointments = await appointmentModel.find ({});
    const availableDoctors = doctors.filter (doc => doc.abalibility === true)
      .length;

    const dashData = {
      doctors: doctors.length,
      availableDoctors,
      appointment: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse ().slice (0, 5),
    };

    res.status (200).json ({success: true, dashData});
  } catch (error) {
    next (error);
  }
};
