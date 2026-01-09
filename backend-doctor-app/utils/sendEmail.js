import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function sendEmail(email, subject, message) {
  const transporter = nodemailer.createTransport({
    host: process.env.SHIP_HOST,
    port: process.env.SHIP_PORT,
    secure: false,
    auth: {
      user: process.env.SHIP_USER,
      pass: process.env.SHIP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SHIP_USER,
    to: process.env.SHIP_USER,
    subject: subject,
    html: message,
  });
}
