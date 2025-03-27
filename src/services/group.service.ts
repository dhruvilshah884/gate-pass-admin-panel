import { models } from '@/models'
import { CurdOperation } from '@/utils/CURD'
import { IGroup } from '@/interface/group.interface'
export class GroupServicwe extends CurdOperation<IGroup> {
  constructor() {
    super(models.Group, [{ path: 'flat' }, { path: 'members.residance' }])
  }

  public CreateGroup = async (data: IGroup) => {
    let members = []
    if (data.type === 'RESIDANCE') {
      members = await models.Residance.find({ flat: data.flat }).select('_id')
    } else if (data.type === 'RESIDANCE-SECURITY') {
      const residents = await models.Residance.find({ flat: data.flat }).select('_id')
      const security = await models.Security.find({ flat: data.flat }).select('_id')
      members = [...residents, ...security]
    }
    const group = new models.Group({
      name: data.name,
      members,
      flat: data.flat,
      createdBy: data.createdBy,
      type: data.type
    })
    return await group.save()
  }
  public async getGroupsWithMembers(query: any, page: number, pageSize: number, sortType: string) {
    const groups = await models.Group.find(query)
      .populate('flat')
      .populate('members')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort(sortType)

    return groups
  }
}
