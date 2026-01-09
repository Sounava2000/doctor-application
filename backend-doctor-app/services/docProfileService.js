import { doctorModal } from "../models/doctorModal.js";

export const docProfileService = async (req, res, next) => {
  try {
    const docId = req.doctor.id;
    const profileData = await doctorModal.findById(docId).select("-password");
    return res.status(201).json({ success: true, profileData: profileData });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
 