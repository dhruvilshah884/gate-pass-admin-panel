import { CommonModal } from "./commonModel";
import { IResidance } from "./residance";

export interface IWifi extends CommonModal {
  residance: IResidance;
  wifiCredentials: string;
  expiryTime: Date;
  wifiName: string;
}
