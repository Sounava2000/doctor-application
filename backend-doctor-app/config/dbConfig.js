import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();
export const dbConnect = async () => {
  try {
    
    const dbConfig = await mongoose.connect(`${process.env.mongodb_url}`);
    console.log("DbConnected Successfullly");
  } catch (error) {
    console.log(`Error is: ${error.message}`);
    throw new Error("Error From Index page");
  }
};
