import {ErrorHandeler} from '../middlewares/error.js';
import { appointmentModel } from '../models/appointmentModal.js';
import {doctorModal} from '../models/doctorModal.js';
import { userModal } from '../models/userModal.js';

export const bookAppointmentService = async (req, res, next) => {
  try {
    const {userId, docId, slotDate, slotTime} = req.body;
    const docData = await doctorModal.findById (docId).select ('-password');

if (!docData.abalibility) {
  return next(new ErrorHandeler('Doctor not available', 402));
}

    let slot_booked = docData.slot_booked;

    if (slot_booked[slotDate]) {
      if (slot_booked[slotDate].includes (slotTime)) {
        return next (new ErrorHandeler ('Slot not available', 402));
      } else {
        slot_booked[slotDate].push (slotTime);
      }
    } else {
      slot_booked[slotDate] = [];
      slot_booked[slotDate].push (slotTime);
    }
    const userData = await userModal.findById (userId).select ('-password');
    const appointmentData = {
      userId,
      docId,
      slotDate,
      slotTime,
      userData,
      docData,
      amount: docData.fees,
      date: Date.now(),  
    };
    const newappointmentData = new appointmentModel (appointmentData);

    await newappointmentData.save ();
    await doctorModal.findByIdAndUpdate (docId, {slot_booked});
  res.status(200).json({ success: true, message: "Appointment booked" });

  } catch (error) {
    next (error);
  }
};
