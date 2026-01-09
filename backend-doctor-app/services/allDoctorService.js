import { doctorModal } from "../models/doctorModal.js";

export const allDoctorService = async (req, res, next) => {
  try {
    const doctors = await doctorModal.find ({}).select ('-password');
    res.status(200).json ({success: true, doctors});
  } catch (error) {
    next (error);
  }
};
