import { models } from '@/models'

class userService {
  public userData = models.Residance || models.Security || models.Admin

  public async me(_id: string) {
    console.log(_id , "id")
    const user = await models.Residance.findById(_id) || await models.Security.findById(_id) || await models.Admin.findById(_id)

    if (!user) throw new Error('User not found')
    return user
  }
}
export default userService
