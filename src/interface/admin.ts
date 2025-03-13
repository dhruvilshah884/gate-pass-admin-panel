import { CommonModal } from "./commonModel";
import { IFlat } from "./flat";

export interface Iadmin extends CommonModal{
    name:string
    email:string
    password:string
    flat:IFlat | string
}