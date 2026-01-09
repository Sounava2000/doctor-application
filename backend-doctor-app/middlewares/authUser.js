import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config (); 
import {ErrorHandeler} from './error.js';
export const authUser = async (req, res, next) => {
  try {
    let token = req.headers.token;
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split (' ')[1];
    }
    if (!token) { 
      return next (new ErrorHandeler ('Not Authorized lo ddgin again', 405));
    }
    const token_decode = jwt.verify (token, process.env.JWT_SECRET);
   req.user = { id: token_decode.id };
    next ();
  } catch (error) {
    next (error);
  }
};
