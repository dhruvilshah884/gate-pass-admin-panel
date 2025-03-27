import mongoose, { Schema, Document } from 'mongoose'
import { commonFields } from './common.modal'
import { IFlat } from '@/interface/flat'

const FlatSchema: Schema = new Schema({
  ...commonFields,
  country: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  flatName: { type: String, required: true },
  fullAddress: { type: String, required: true },
  maintenance: { type: Number, required: true },
  images: { type: [String], required: false }
})
export const Flat = mongoose.models.Flat || mongoose.model<IFlat & Document>('Flat', FlatSchema)
