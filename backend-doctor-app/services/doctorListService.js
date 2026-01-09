import {doctorModal} from '../models/doctorModal.js';

export const doctorListService = async (req, res, next) => {
  try {
    const doctors = await doctorModal
      .find ({})
      .select (['-password', '-email']);
    res.status (200).json ({success: true, message: doctors});
  } catch (error) {
    next(error)
  }
};
