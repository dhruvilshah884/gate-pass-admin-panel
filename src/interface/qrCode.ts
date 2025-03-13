import { CommonModal } from './commonModel'
import { ISecurity } from './security'

export interface IQrCode extends CommonModal {
  security: ISecurity | string
  qrCode: string
  status: boolean
}
