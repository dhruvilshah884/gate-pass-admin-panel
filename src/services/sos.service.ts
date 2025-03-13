import { models } from '@/models'
import { CurdOperation } from '@/utils/CURD'
import { Isos } from '@/interface/sos'
export class SosService extends CurdOperation<Isos> {
  constructor() {
    super(models.Sos ,[{path:"residance"} , {path:"visitor"}])
  }
}
