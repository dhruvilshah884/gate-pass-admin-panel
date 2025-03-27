import { CommonModal } from './commonModel'

export interface IFlat extends CommonModal {
  country: string
  state: string
  city: string
  flatName: string
  fullAddress: string
  maintenance: number
  images: string[]
}
