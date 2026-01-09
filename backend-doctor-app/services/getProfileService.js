import {userModal} from '../models/userModal.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const getProfileService = async (req, res, next) => {
  try {
  const userId = req.user.id;
    const userData = await userModal.findById (userId).select ('-password');

    res.status (200).json ({
      success: true,
      userData,
    });
  } catch (error) {
    next (error);
  }
};
