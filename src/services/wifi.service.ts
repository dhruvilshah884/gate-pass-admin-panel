import { models } from '@/models'
import { CurdOperation } from '@/utils/CURD'
import { IWifi } from '@/interface/wifi'

export class WifiService extends CurdOperation<IWifi> {
  constructor() {
    super(models.Wifi ,[{path:"residance"}])  
  }
}
