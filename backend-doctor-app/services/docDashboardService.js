import { appointmentModel } from "../models/appointmentModal.js";

export const docDashboardService = async (req, res, next) => {
  try {
    const docId = req.doctor.id;
    const appointments = await appointmentModel.find({ docId });
    let earning = 0;
    appointments.map((item) => {
      if (item.isCompleted) {
        earning = item.amount + earning;
      }
    });
    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });
    const dashData = {
      earning,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(),
    };
    return res.json({ success: true, dashData: dashData });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};
