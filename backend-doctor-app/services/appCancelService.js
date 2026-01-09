import { appointmentModel } from "../models/appointmentModal.js";

export const appCancelService = async (req, res, next) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.doctor.id;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res.json({ success: true, message: "Cancellation Failed" });
    }
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};
