import { CommonModal } from './commonModel'
import { IFlat } from './flat'
import { IResidance } from './residance'
import { ISecurity } from './security'

export interface IVisitor extends CommonModal {
  name: string
  phone: string
  avatar?: string
  vehicleNumber: string
  vehicalType: string
  entryTime: Date
  exitTime: Date
  status: string
  emergencyFlag: boolean
  residance: IResidance
  security: ISecurity
  age?:number
  gender?: "MALE" | "FEMALE"
  address?: string
  flar: IFlat | string
}
