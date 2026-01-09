import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import {ErrorHandeler} from '../middlewares/error.js';
dotenv.config ();
export const loginService = (req, res, next) => {
  try {
    const {email, password} = req.body;
    console.log(email,password)
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign (
        {
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
        },
        process.env.JWT_SECRET
      );

      res.json ({success: true, token});
    } else {
      return next (new ErrorHandeler ('Invalid credentials', 400));
    }
  } catch (error) {
    next (error);
  }
};
