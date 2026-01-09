import {userModal} from '../models/userModal.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const loginUserService = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const user = await userModal.findOne ({email});
    if (!user) {
      return next (new ErrorHandeler ('User Does not exist', 402));
    }
    const isMatch = await bcrypt.compare (password, user.password);
    if (isMatch) {
      const token = jwt.sign ({id: user._id}, process.env.JWT_SECRET);
      return res.status (200).json ({
        success: true,
        message: 'Login successful',
        token,
      });
    } else {
      return res.status (401).json ({
        success: false,
        message: 'Invalid credentials',
      });
    }
  } catch (error) {
    next (error);
  }
};
