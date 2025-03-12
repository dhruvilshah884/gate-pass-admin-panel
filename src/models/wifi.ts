import mongoose, { Schema, Document } from "mongoose";
import { commonFields } from "./common.modal";
import { IWifi } from "@/interface/wifi";

const WifiSchema: Schema = new Schema({
  ...commonFields,
  residance: { type: Schema.Types.ObjectId, ref: "Residance", required: true },
  visitor: { type: Schema.Types.ObjectId, ref: "Visitor", required: true },
  wifiCredentials: { type: String, required: true },
  expiryTime: { type: Date, required: true },
});

export const Wifi =
  mongoose.models.Wifi || mongoose.model<IWifi>("Wifi", WifiSchema);
