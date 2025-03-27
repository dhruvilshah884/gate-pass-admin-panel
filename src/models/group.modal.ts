import mongoose, { Schema, Document } from 'mongoose'
import { commonFields } from './common.modal'
import { IGroup } from '@/interface/group.interface'

const GroupSchema: Schema = new Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Types.ObjectId, ref: 'Residance', required: true }],
  flat: { type: mongoose.Types.ObjectId, required: true, ref: 'Flat' },
  createdBy: { type: mongoose.Types.ObjectId, required: true, ref: 'Admin' },
  type: { type: String, enum: ['RESIDANCE', 'RESIDANCE-SECURITY'], required: true },
  ...commonFields
})

export const Group = mongoose.models.Group || mongoose.model<IGroup>('Group', GroupSchema)
