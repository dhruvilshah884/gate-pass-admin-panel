import { CommonModal } from "./commonModel";
import { IFlat } from "./flat";
import { IResidance } from "./residance";

export interface IWifi extends CommonModal {
  residance: IResidance;
  wifiCredentials: string;
  expiryTime: Date;
  wifiName: string;
  flat:IFlat
}
