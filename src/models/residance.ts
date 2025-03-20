import mongoose, { Schema, Document } from 'mongoose'
import { commonFields } from './common.modal'
import { IResidance } from '@/interface/residance'

const ResidanceSchema: Schema = new Schema({
  ...commonFields,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  flatNo: { type: String, required: true },
  blockNumber: { type: String, required: true },
  phoneNumber1: { type: String, required: true },
  phoneNumber2: { type: String },
  faceId: { type: String },
  pastVisitor: [{ type: Schema.Types.ObjectId, ref: 'Visitor' }],
  pastMaintenance: [{ type: Schema.Types.ObjectId, ref: 'Maintenance' }],
  flat: { type: Schema.Types.ObjectId, ref: 'Flat' },
  maintanance: { type: Number, default: 0 },
  avatar: { type: String }
})
export const Residance = mongoose.models.Residance || mongoose.model<IResidance>('Residance', ResidanceSchema)
