import { CommonModal } from "./commonModel";
import { IResidance } from "./residance";
import { IVisitor } from "./visitor";

export interface Isos extends CommonModal {
  residance: IResidance;
  visitor: IVisitor;
  alertMessage: string;
  alertTime: Date;
  status: boolean;
}
