import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config (); 
import {ErrorHandeler} from './error.js';
export const authDoctor = async (req, res, next) => {
  try {
    let {dtoken} = req.headers;
    if (!dtoken && req.headers.authorization) {
      dtoken = req.headers.authorization.split (' ')[1];
    }
    if (!dtoken) {
      return next (new ErrorHandeler ('Not Authorized lo ddgin again', 405));
    }
    const token_decode = jwt.verify (dtoken, process.env.JWT_SECRET);
   req.doctor = { id: token_decode.id };
    

    next ();
  } catch (error) {
    next (error);
  }
};

