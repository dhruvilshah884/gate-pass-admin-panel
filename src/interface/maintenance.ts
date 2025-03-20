import { CommonModal } from './commonModel'
import { IFlat } from './flat'
import { IResidance } from './residance'

export interface IMaintenance extends CommonModal {
  residance: IResidance
  flat: IFlat
  amount: number
  status: boolean
  paymentMode: string
  paymentDate: Date
  paymentProof: string
  paymentMonth:string
}
