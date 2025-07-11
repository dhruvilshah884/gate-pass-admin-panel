import { models } from '@/models'

class userService {
  public userData = models.Residance || models.Security || models.Admin

  public async me(_id: string) {
    const user =
      (await models.Residance.findById(_id)
        .populate('flat')
        .populate('pastMaintenance')
        .populate({
          path: 'pastVisitor',
          populate: {
            path: 'security',
            model: 'Security'
          }
        })) ||
      (await models.Security.findById(_id).populate('flat')) ||
      (await models.Admin.findById(_id).populate('flat'))

    if (!user) throw new Error('User not found')
    return user
  }
}
export default userService
