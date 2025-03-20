import { INearestPlace } from '@/interface/nearestPlace'
import { models } from '@/models'
import { CurdOperation } from '@/utils/CURD'

export class PlaceService extends CurdOperation<INearestPlace> {
  constructor() {
    super(models.Place)
  }
}
