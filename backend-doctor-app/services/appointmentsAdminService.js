import { appointmentModel } from "../models/appointmentModal.js";

export const appointmentsAdminService = async (req, res, next) => {
  try {
    const appointments = await appointmentModel.find({})
    res.status(200).json({
        success: true,
        appointments: appointments
    })
  } catch (error) {
    console.log (error);
    res.json ({success: false, message: error.message});
  }
};
