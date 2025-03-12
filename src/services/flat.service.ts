import { models } from '@/models'
import { CurdOperation } from '@/utils/CURD'
import { IFlat } from '@/interface/flat'

export class FlatService extends CurdOperation<IFlat> {
  constructor() {
    super(models.Flat)
  }
}
