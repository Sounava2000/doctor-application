import mongoose from 'mongoose'
import {doctorSchema} from '../schema/doctorSchema.js'
export const doctorModal = mongoose.model("Doctors",doctorSchema)
