import { CommonModal } from './commonModel'

export interface IFlat extends CommonModal {
  country: string
  city: string
  flatName: string
  fullAddress: string
}
