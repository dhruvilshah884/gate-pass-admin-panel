import { CommonModal } from './commonModel'
import { IResidance } from './residance'

export interface IComplaint extends CommonModal {
  residance: string | IResidance
  complaint: string
  status: string
  date: Date
}
