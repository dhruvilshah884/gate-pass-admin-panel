import { CommonModal } from "./commonModel";
import { IResidance } from "./residance";
import { IVisitor } from "./visitor";

export interface IWifi extends CommonModal {
  residance: IResidance;
  visitor: IVisitor;
  wifiCredentials: string;
  expiryTime: Date;
}
