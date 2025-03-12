import { CommonModal } from "./commonModel";
import { ISecurity } from "./security";

export interface IPayroll extends CommonModal {
  security: ISecurity;
  month: Date;
  totalShifts: number;
  salary: number;
  status: string;
}
