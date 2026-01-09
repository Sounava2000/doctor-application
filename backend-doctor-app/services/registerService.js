import {ErrorHandeler} from '../middlewares/error.js';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import {userModal} from '../models/userModal.js';
export const registerService = async (req, res, next) => {
  try {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
      return next (new ErrorHandeler ('All fields are required', 400));
    }

    if (!validator) {
      return next (new ErrorHandeler ('All fields are required', 400));
    }

    const existingUser = await userModal.findOne ({email});
    if (existingUser) {
      return next (new ErrorHandeler ('User already exists', 400));
    }

    if (password.length < 8) {
      return next (new ErrorHandeler ('Please enter a strong password', 400));
    }
    const newUser = new userModal ({name, email, password});
    await newUser.save ();
    const token = jwt.sign ({id: newUser._id}, process.env.JWT_SECRET);
   res.status(201).json({
      success: true,
      newUser,
      message: "User registered successfully",
      token,
    });
} catch (error) {
    next (error);
  }
};
