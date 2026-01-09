import fs from "fs";
import cloudinary from "../config/cloudnary.js";
import { ErrorHandeler } from "../middlewares/error.js";
import { doctorModal } from "../models/doctorModal.js";
import validator from "validator";
export const addDoctorService = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      specality,
      experience,
      fees,
      about,
      degree,
      abalibility,
      // date,
    } = req.body;
    const file = req.file;
  console.log("first")
    if (
      !name ||
      !email ||
      !password ||
      !specality ||
      !experience ||
      !fees ||
      !about ||
      !degree ||
      !abalibility ||
      // !date ||
      !file
    ) {
      console.log({
        name,
        email,
        password,
        specality,
        experience,
        fees,
        about,
        degree,
        abalibility,
        // date,
      });
      return next(new ErrorHandeler("All fields are required", 402));
    }
    if (!validator.isEmail(email)) {
      return next(new ErrorHandeler("Please enter a valid email", 400));
    }

    if (password.length < 8) {
      return next(new ErrorHandeler("Please enter a strong password", 400));
    }

    const existingDoctor = await doctorModal.findOne({ email });
    if (existingDoctor) {
      return next(
        new ErrorHandeler(
          "Email already exists. Please use a different email.",
          400
        )
      );
    }
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "doctors",
    });
    fs.unlinkSync(file.path);

    const newUser = new doctorModal({
      name,
      email,
      password,
      specality,
      experience,
      fees,
      about,
      degree,
      abalibility,
      // date,
      image: result.secure_url,
    });
    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "Doctor data received successfully",
      doctor: {
        name,
        email,
        specality,
        experience,
        fees,
        about,
        degree,
        abalibility,
        // date,
        // fileName: file,
      },
    });
  } catch (err) {
    console.error("ADD DOCTOR ERROR:", err);
    next(err);
  }
};
