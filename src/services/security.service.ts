import { models } from '@/models'
import { CurdOperation } from '@/utils/CURD'
import { ISecurity } from '@/interface/security'

export class SecurityService extends CurdOperation<ISecurity> {
  constructor() {
    super(models.Security ,[{path:"flat"}])
  }
}
