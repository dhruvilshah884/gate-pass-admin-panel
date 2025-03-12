import { models } from '@/models'

class userService {
  public userData = models.Residance || models.Security

  public async me(_id: String) {
    const user = await this.userData.findById(_id)
    if (!user) throw new Error('User not found')
    return user
  }
}
export default userService
