import mongoose, { Schema, Document } from 'mongoose'
import { commonFields } from './common.modal'
import { IQrCode } from '@/interface/qrCode'

const QrCodeSchema: Schema = new Schema({
  ...commonFields,
  security: { type: Schema.Types.ObjectId, ref: 'Security' },
  qrCode: { type: String, required: true },
  status: { type: Boolean, default: false }
})
export const QrCode = mongoose.models.QrCode || mongoose.model<IQrCode & Document>('QrCode', QrCodeSchema)