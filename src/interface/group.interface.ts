import { Iadmin } from './admin'
import { CommonModal } from './commonModel'
import { IFlat } from './flat'
import { IResidance } from './residance'

export interface IGroup extends CommonModal {
  name: string
  members: IResidance[]
  flat: IFlat
  createdBy: Iadmin
  type: 'RESIDANCE' | 'RESIDANCE-SECURITY'
}
