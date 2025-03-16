import { CommonModal } from './commonModel'
import { IFlat } from './flat'
import { IVisitor } from './visitor'

export interface IResidance extends CommonModal {
  name: string
  email: string
  password: string
  flatNo: string
  blockNumber: string
  phoneNumber1: string
  phoneNumber2?: string
  locality: string
  city: string
  state: string
  faceId?: string
  pastVisitor?: IVisitor[]
  flat: IFlat | string
  maintanance: number
  avatar: string
}
