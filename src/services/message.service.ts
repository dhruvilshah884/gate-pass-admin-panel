import { models } from '@/models'
import { CurdOperation } from '@/utils/CURD'
import { IMessage } from '@/interface/message.interface'
export class MessageService extends CurdOperation<IMessage> {
  constructor() {
    super(models.Message)
  }
  public async fetchMessage(id: any) {
    const message = await models.Message.find({ group: id }).populate('sender', 'name email').sort({ timestamp: 1 })
    return message
  }
}
