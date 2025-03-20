import { Iadmin } from './admin'
import { CommonModal } from './commonModel'
import { IFlat } from './flat'

export interface INearestPlace extends CommonModal {
  admin: Iadmin
  flat: IFlat
  categoryName: string
  name: string
  address: string
  mobileNumber: string
  openTime: string
  closeTime: string
  navigaton: string
  distance:string
}
