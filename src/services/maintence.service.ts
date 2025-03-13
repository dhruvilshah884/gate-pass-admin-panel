import { models } from '@/models'
import { CurdOperation } from '@/utils/CURD'
import { IMaintenance } from '@/interface/maintenance'

export class MaintenceService extends CurdOperation<IMaintenance> {
  constructor() {
    super(models.Maintenance, [{ path: 'residance' }])
  }

  public async sendMailForMaintance() {}
}
