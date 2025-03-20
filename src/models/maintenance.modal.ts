import mongoose, { Schema } from "mongoose";
import { commonFields } from "./common.modal";
import { IMaintenance } from "@/interface/maintenance";

const MaintenanceSchema: Schema = new Schema({
    ...commonFields,
    residance: { type: Schema.Types.ObjectId, ref: "Residance", required: true },
    flat: { type: Schema.Types.ObjectId, ref: "Flat", required: true },
    amount: { type: Number, required: true },
    status: { type: Boolean, default: false },
    paymentMode: { type: String, required: false },
    paymentDate: { type: Date, required: false },
    paymentProof: { type: String, required: false },
    paymentMonth: { type: String, required: false },
});

export const Maintenance = mongoose.models.Maintenance || mongoose.model<IMaintenance>("Maintenance", MaintenanceSchema);