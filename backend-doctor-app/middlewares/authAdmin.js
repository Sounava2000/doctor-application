import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config ();
import {ErrorHandeler} from './error.js';
export const authAdmin = async (req, res, next) => {
  try {
    let atoken = req.headers.atoken;
    if (!atoken && req.headers.authorization) {
      atoken = req.headers.authorization.split (' ')[1];
    }
    if (!atoken) {
      return next (new ErrorHandeler ('Not Authorized login again', 405));
    }
    const token_decode = jwt.verify (atoken, process.env.JWT_SECRET);
    if (
      token_decode.email !== process.env.ADMIN_EMAIL ||
      token_decode.password !== process.env.ADMIN_PASSWORD
    ) {
      return next (new ErrorHandeler ('Not Authorized logqxaxain again', 405));
    }
    req.user = { id: token_decode.id }
    next ();
  } catch (error) {
    next (error);
  }
};
