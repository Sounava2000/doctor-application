import {ErrorHandeler} from '../middlewares/error.js';
import {appointmentModel} from '../models/appointmentModal.js';
import {doctorModal} from '../models/doctorModal.js';

export const cancelAppointmentService = async (req, res, next) => {
  try {
    const { appointmentId} = req.body;
    const userId = req.user.id;  
  const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData.userId !== userId) {
      next (new ErrorHandeler ('Unauthorized token', 402));
    }
    await appointmentModel.findByIdAndUpdate (appointmentId, {cancelled: true});
    const {docId, slotDate, slotTime} = appointmentData;
    const doctorData = await doctorModal.findById (docId);
    let slots_booked = doctorData.slot_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter (
      e => e !== slotTime
    );
    await doctorModal.findByIdAndUpdate (docId, {slots_booked});
    res.status (200).json ({success: true, message: 'Appoinment Cancelled'});

  } catch (error) {
    console.log (error);
    next (error);
  }
};
