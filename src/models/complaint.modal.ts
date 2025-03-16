import mongoose, { Schema, Document } from 'mongoose'
import { commonFields } from './common.modal'
import { IComplaint } from '@/interface/complaint'

const ComplaintSchema: Schema = new Schema({
    ...commonFields,
    residance: { type: Schema.Types.ObjectId, ref: 'Residance', required: true },
    complaint: { type: String, required: true },
    status: { type: String, default: 'pending' },
    date: { type: Date, default: Date.now },
})
export const Complaint = mongoose.models.Complaint || mongoose.model<IComplaint>('Complaint', ComplaintSchema)