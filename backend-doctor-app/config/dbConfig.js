 
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnect = async () => {
  try {
    const dbConfig = await mongoose.connect(process.env.mongodb_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("Error is:", error.message);
    throw new Error("Error connecting to MongoDB");
  }
};
