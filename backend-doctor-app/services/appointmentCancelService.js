import {appointmentModel} from '../models/appointmentModal.js';
import {doctorModal} from '../models/doctorModal.js';

export const appointmentCancelService = async (req, res, next) => {
  try {
    const {appointmentId} = req.body;
    const userId = req.user.id;
    const appointmentData = await appointmentModel.findById (appointmentId);
    await appointmentModel.findByIdAndUpdate (appointmentId, {
      cancelled: true,
    });
    const {docId, slotDate, slotTime} = appointmentData;
    const doctorData = await doctorModal.findById (docId);
    let slot_booked = doctorData.slot_booked;
    slot_booked[slotDate] = slot_booked[slotDate].filter (e => e !== slotTime);
    await doctorModal.findByIdAndUpdate (docId, {slot_booked});
   res.status(200).json({ success: true, message: "Appointment cancelled successfully" });

  } catch (error) {
    next (error);
  }
};
