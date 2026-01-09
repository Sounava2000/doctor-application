import { emailTemplate } from "../utils/emailTemplate.js";
import { sendEmail } from "../utils/sendEmail.js";

export const messageService = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
     if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const subject = "New Contact Message";
    const mailBody = emailTemplate(name, email, message);

    await sendEmail(email, subject, mailBody);


    res.status(200).json({
      success: true,
      message: "Successfully Sent message",
    });
  } catch (error) {
    next(error);
  }
};
