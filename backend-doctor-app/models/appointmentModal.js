import mongoose from 'mongoose';
import {appointmentSchema } from '../schema/appointmentSchema.js'

export const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);
