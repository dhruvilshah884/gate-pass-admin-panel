import mongoose, { Schema, Document } from 'mongoose'
import { commonFields } from './common.modal'
import { ISecurity } from '@/interface/security'

const SecuritySchema: Schema = new Schema({
  ...commonFields,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  phoneNumber1: { type: String, required: true },
  phoneNumber2: { type: String },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  proof: { type: Array, required: false },
  shiftTime: { type: String, required: true },
  shiftEndTime: { type: String, required: true },
  salary: { type: Number, required: true },
  password: { type: String, required: true },
  faceId: { type: String },
  flat: { type: Schema.Types.ObjectId, ref: 'Flat' }
})

export const Security = mongoose.models.Security || mongoose.model<ISecurity>('Security', SecuritySchema)
