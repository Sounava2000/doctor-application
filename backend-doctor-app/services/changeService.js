import {doctorModal} from '../models/doctorModal.js';

export const changeService = async (req, res, next) => {
  try {
    const {docId} = req.body;
    const docData = await doctorModal.findById (docId);
    await doctorModal.findByIdAndUpdate (docId, {
      abalibility: !docData.abalibility,
    });
    res.json ({success: true, message: 'Avalibility Change'});
  } catch (error) {
    console.log (error);
    next (error);
  }
};
