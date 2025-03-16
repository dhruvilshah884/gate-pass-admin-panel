import { CommonModal } from "./commonModel";
import { ISecurity } from "./security";

export interface IAttendace extends CommonModal {
  security: ISecurity;
  shiftStartTime: Date;
  shiftEndTime: Date;
  qrScanLogs: string[];
  performanceRating: number;
}
