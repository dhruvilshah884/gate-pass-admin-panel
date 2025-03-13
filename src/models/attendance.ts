import mongoose, { Schema } from "mongoose";
import { commonFields } from "./common.modal";
import { IAttendace } from "@/interface/attendance";

const AttendanceSchema: Schema = new Schema({
  ...commonFields,
  security: { type: Schema.Types.ObjectId, ref: "Security", required: true },
  shiftStartTime: { type: Date, required: true },
  shiftEndTime: { type: Date, required: true },
  qrScanLogs: { type: [String], default: [] },
  performanceRating: { type: Number, default: 0 },
});

export const Attendance =
  mongoose.models.Attendance ||
  mongoose.model<IAttendace>("Attendance", AttendanceSchema);
