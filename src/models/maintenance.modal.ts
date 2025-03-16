import mongoose, { Schema } from "mongoose";
import { commonFields } from "./common.modal";
import { IMaintenance } from "@/interface/maintenance";

const MaintenanceSchema: Schema = new Schema({
    ...commonFields,
    residance: { type: Schema.Types.ObjectId, ref: "Residance", required: true },
    amount: { type: Number, required: true },
    status: { type: Boolean, default: false },
    paymentMode: { type: String, required: true },
    paymentDate: { type: Date, required: true },
    paymentProof: { type: String, required: true },
    paymentMonth: { type: String, required: true },
});

export const Maintenance = mongoose.models.Maintenance || mongoose.model<IMaintenance>("Maintenance", MaintenanceSchema);