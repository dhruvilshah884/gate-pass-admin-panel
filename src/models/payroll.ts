import mongoose, { Schema } from "mongoose";
import { commonFields } from "./common.modal";
import { IPayroll } from "@/interface/payroll";

const PayrollSchema: Schema = new Schema({
  ...commonFields,
  security: { type: Schema.Types.ObjectId, ref: "Security", required: true },
  month: { type: Date, required: true },
  totalShifts: { type: Number, required: true },
  salary: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Processing"],
    default: "Pending",
  },
});

export const Payroll =
  mongoose.models.Payroll || mongoose.model<IPayroll>("Payroll", PayrollSchema);
