import { CommonModal } from './commonModel'
import { IGroup } from './group.interface'
import { IResidance } from './residance'

export interface IMessage extends CommonModal {
  group: IGroup
  sender: IResidance
  text: string
  timeStamp: Date
}
