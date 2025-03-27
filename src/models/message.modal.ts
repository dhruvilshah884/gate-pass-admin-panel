import mongoose, { Schema, Document } from 'mongoose'
import { commonFields } from './common.modal'
import { IMessage } from '@/interface/message.interface'

const MessageSchema: Schema = new Schema({
  ...commonFields,
  group: { type: mongoose.Types.ObjectId, ref: 'Group', required: true },
  text: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'Residance', required: true },
  timestamp: { type: Date, default: Date.now }
})

export const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema)
