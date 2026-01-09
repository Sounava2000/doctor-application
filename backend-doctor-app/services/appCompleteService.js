import {appointmentModel} from '../models/appointmentModal.js';

export const appCompleteService = async (req, res, next) => {
  try {
    const {appointmentId} = req.body;
    const docId = req.doctor.id;
    const appointmentData = await appointmentModel.findById (appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate (appointmentId, {
        isCompleted: true,
      });
      return res.json ({success: true, message: 'Appointment Complete'});
    }
    else {
      return res.json ({success: true, message: 'Mark Done'});

    }
  } catch (error) {
    console.error (error);
  }
};
