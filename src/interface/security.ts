import { CommonModal } from './commonModel'
import { IFlat } from './flat'

export interface ISecurity extends CommonModal {
  name: string
  email: string
  phone: string
  avatar?: string
  password: string
  phoneNumber1: string
  phoneNumber2?: string
  addressLine1: string
  addressLine2?: string
  proof: string[]
  shiftTime: Date
  shiftEndTime: Date
  salary: number
  faceId?: string
  flat: string | IFlat
}
