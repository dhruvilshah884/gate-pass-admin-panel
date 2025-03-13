import { models } from '@/models'
import { CurdOperation } from '@/utils/CURD'
import { IResidance } from '@/interface/residance'

export class ResidancyService extends CurdOperation<IResidance> {
  constructor() {
    super(models.Residance ,[{path:"flat"} , {path:"pastVisitor"}])
  }
}
