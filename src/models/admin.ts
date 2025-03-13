import mongoose, { Schema, Document } from 'mongoose'
import { commonFields } from './common.modal'
import { Iadmin } from '@/interface/admin'

const AdminSchema: Schema = new Schema({
  ...commonFields,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  flat: { type: Schema.Types.ObjectId, ref: 'Flat' },
})

export const Admin = mongoose.models.Admin || mongoose.model<Iadmin>('Admin', AdminSchema)