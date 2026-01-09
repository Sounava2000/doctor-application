import { doctorModal } from "../models/doctorModal.js";

export const updateDocProfileService = async (req, res, next) => {
  try {
    const docId = req.doctor.id;
    const { fees, available, about, experience, specality, email } = req.body;
    await doctorModal.findByIdAndUpdate(docId, {
      fees,
      available,
      about,
      experience,
      specality,
      email,
    });
    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
