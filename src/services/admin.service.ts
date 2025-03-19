import { models } from '@/models'
import { CurdOperation } from '@/utils/CURD'
import { Iadmin } from '@/interface/admin'
import { compare, hash } from 'bcrypt'
import { TokenData } from '@/interface/auth'
import jwt from 'jsonwebtoken'

export class AdminService extends CurdOperation<Iadmin> {
  constructor() {
    super(models.Admin, [{ path: 'flat' }])
  }

  public async SignUp(data: Iadmin) {
    const findUser = await models.Admin.findOne({ email: data.email })
    if (findUser) {
      throw { success: false, message: 'User already exists', code: 409 }
    }
    const hashedPassword = await hash(data.password, 10)
    data.password = hashedPassword
    const newUser = await models.Admin.create(data)
    return { success: true, message: 'User created successfully', data: newUser }
  }

  public async signIn(data: Iadmin) {
    try {
      const findUser = await models.Admin.findOne({ email: data.email })
      if (!findUser) {
        throw { success: false, message: 'User not found', code: 404 }
      }
      const isPasswordValid = await compare(data.password, findUser.password)
      if (!isPasswordValid) {
        throw { success: false, message: 'Invalid password', code: 401 }
      }

      let adminData: object = {}
      adminData = {
        _id: findUser._id,
        name: findUser.name,
        email: findUser.email,
        password: '',
        flat: findUser.flat as string,
        role: 'admin'
      }
      const tokenData = jwt.sign({ user: adminData }, process.env.SECRET_KEY as string, { expiresIn: '7d' })

      return {
        ...adminData,
        token: tokenData
      }
    } catch (err:any) {
      throw { success: false, message: err.message, code: err.code || 500 }
    }
  }
}
