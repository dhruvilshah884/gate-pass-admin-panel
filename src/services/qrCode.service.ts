import { models } from '@/models'
import { CurdOperation } from '@/utils/CURD'
import { IQrCode } from '@/interface/qrCode'

export class qrCodeService extends CurdOperation<IQrCode> {
  constructor() {
    super(models.QrCode ,[{path:"security"}])
  }
}
