import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
export const userSchema = new mongoose.Schema ({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
    default: 'https://image2url.com/images/1756278048182-62e36295-a98a-4e83-acce-3ebda4810fcb.png',
  },
  address: {
    type: String,
  },
  dob: {
    type: String,
  },
  gender: {
    type: String,
    default: 'Male',
  },
  phone: {
    type: String,
    default: true,
  },
});
userSchema.pre ('save', async function (next) {
  if (!this.isModified ('password')) {
    next ();
  }
  this.password = await bcrypt.hash (this.password, 12);
});
