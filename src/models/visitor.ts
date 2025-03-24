import mongoose, { Schema, Document } from 'mongoose'
import { commonFields } from './common.modal'
import { IVisitor } from '@/interface/visitor'

const VisitorSchema: Schema = new Schema({
  ...commonFields,
  name: { type: String, required: true },
  phone: { type: String, required: true },
  avatar: { type: String },
  vehicleNumber: { type: String, required: true },
  entryTime: { type: Date },
  exitTime: { type: Date },
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied', 'completed'],
    default: 'pending'
  },
  emergencyFlag: { type: Boolean, default: false },
  residance: { type: Schema.Types.ObjectId, ref: 'Residance', required: true },
  security: { type: Schema.Types.ObjectId, ref: 'Security', required: true },
  flat: { type: Schema.Types.ObjectId, ref: 'Flat', required: true }
})

export const Visitor = mongoose.models.Visitor || mongoose.model<IVisitor>('Visitor', VisitorSchema)
