import mongoose, { Schema, Document } from "mongoose";
import { commonFields } from "./common.modal";
import { Isos } from "@/interface/sos";

const SosSchema: Schema = new Schema({
  ...commonFields,
  residance: { type: Schema.Types.ObjectId, ref: "Residance", required: true },
  visitor: { type: Schema.Types.ObjectId, ref: "Visitor", required: true },
  alertMessage: { type: String, required: true },
  alertTime: { type: Date, default: Date.now },
  status: { type: Boolean, default: false },
});

export const Sos =
  mongoose.models.Sos || mongoose.model<Isos>("Sos", SosSchema);
