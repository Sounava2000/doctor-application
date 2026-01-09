import mongoose from 'mongoose'
import {userSchema} from '../schema/userSchema.js'
export const userModal = mongoose.model("Users",userSchema)
