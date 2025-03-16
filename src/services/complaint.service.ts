import { models } from '@/models'
import { CurdOperation } from '@/utils/CURD'
import { IComplaint } from '@/interface/complaint'
export class ComplaintService extends CurdOperation<IComplaint> {
  constructor() {
    super(models.Complaint)
  }
}
