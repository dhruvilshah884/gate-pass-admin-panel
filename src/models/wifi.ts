import mongoose, { Schema, Document } from "mongoose";
import { commonFields } from "./common.modal";
import { IWifi } from "@/interface/wifi";

const WifiSchema: Schema = new Schema({
  ...commonFields,
  residance: { type: Schema.Types.ObjectId, ref: "Residance", required: true },
  wifiCredentials: { type: String, required: true },
  wifiName: { type: String, required: true },
  expiryTime: { type: Date, required: false },
});

export const Wifi =
  mongoose.models.Wifi || mongoose.model<IWifi>("Wifi", WifiSchema);
