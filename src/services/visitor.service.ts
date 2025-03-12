import { models } from '@/models'
import { CurdOperation } from '@/utils/CURD'
import { IVisitor } from '@/interface/visitor'

export class VisitorService extends CurdOperation<IVisitor> {
  constructor() {
    super(models.Visitor)
  }
}
