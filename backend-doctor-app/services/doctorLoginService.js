import {ErrorHandeler} from '../middlewares/error.js';
import {doctorModal} from '../models/doctorModal.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
export const doctorLoginService = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    console.log("email",password)
    const doctor = await doctorModal.findOne ({email});
    if (!doctor) {
      return next (new ErrorHandeler ('Invalid Creadintial', 401));
    }
    const isMatch = await bcrypt.compare (password, doctor.password);
    if (isMatch) {
      const token = jwt.sign ({id: doctor._id}, process.env.JWT_SECRET);
      res.json ({success: true, token});
    } else {
      return next (new ErrorHandeler ('Invalid Creadintial', 401));
    }
  } catch (error) {
    next (error);
  }
};
