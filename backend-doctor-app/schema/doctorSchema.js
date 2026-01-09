import mongoose from "mongoose";
import bcrypt from "bcrypt";
export const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Doctor name is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Doctor email is required."],
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password must be at least 6 characters long."],
    },
    image: {
      type: String,
      default:
        "https://image2url.com/images/1756278048182-62e36295-a98a-4e83-acce-3ebda4810fcb.png",
    },
    specality: {
      type: String,
      required: [true, "Specialty is required."],
    },
    experience: {
      type: String,
      required: [true, "Experience information is required."],
    },
    fees: {
      type: Number,
      required: [true, "Consultation fee is required."],
      min: [100, "Minimum consultation fee should be ₹100."],
    },
    about: {
      type: String,
      maxlength: [300, "About section cannot exceed 300 characters."],
    },
    degree: {
      type: String,
      required: [true, "Doctor degree is required."],
    },
    abalibility: {
      type: Boolean,
      default: true,
    },
    // date: {
    //   type: Number,
    //   required: [true, "Date field is required and must be a number."],
    // },
    slot_booked: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});
