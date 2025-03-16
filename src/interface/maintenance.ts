import { CommonModal } from './commonModel'
import { IResidance } from './residance'

export interface IMaintenance extends CommonModal {
  residance: IResidance
  amount: number
  status: boolean
  paymentMode: string
  paymentDate: Date
  paymentProof: string
  paymentMonth:string
}
