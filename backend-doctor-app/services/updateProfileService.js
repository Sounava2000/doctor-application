import { userModal } from "../models/userModal.js";
import { v2 as cloudinary } from "cloudinary";
import { ErrorHandeler } from "../middlewares/error.js";

export const updateProfileService = async (req, res, next) => {
  try {
    let { name, phone, email, gender, address, dob } = req.body;
    const imageFile = req.file;
    const userId = req.user.id;  

     
    if (address && typeof address === "string") {
      try {
        address = JSON.parse(address);
      } catch {
        return next(new ErrorHandeler("Invalid address format", 400));
      }
    }
 
    if (!name && !phone && !gender && !address && !dob && !email && !imageFile) {
      return next(
        new ErrorHandeler("Please provide at least one field to update", 402)
      );
    }

    const updateData = { name, phone, gender, email, address, dob };

    if (imageFile) {
      const result = await cloudinary.uploader.upload(imageFile.path, {
        folder: "users",
      });
      updateData.image = result.secure_url;
    }

    await userModal.findByIdAndUpdate(userId, updateData);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
