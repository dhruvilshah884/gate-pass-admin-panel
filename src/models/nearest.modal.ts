import mongoose, { Schema, Document } from 'mongoose'
import { commonFields } from './common.modal'
import { INearestPlace } from '@/interface/nearestPlace'

const NearestSchema: Schema = new Schema({
  ...commonFields,
  admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
  flat: { type: Schema.Types.ObjectId, ref: 'Flat' },
  categoryName: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  openTime: { type: String, required: true },
  closeTime: { type: String, required: false },
  navigaton: { type: String, required: true },
  distance: { type: String, required: true }
})
export const Place = mongoose.models.place || mongoose.model<INearestPlace & Document>('place', NearestSchema)
