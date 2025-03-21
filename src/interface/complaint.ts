import { CommonModal } from './commonModel'
import { IFlat } from './flat'
import { IResidance } from './residance'

export interface IComplaint extends CommonModal {
  residance: string | IResidance
  complaint: string
  status: string
  date: Date
  flat:IFlat
}
