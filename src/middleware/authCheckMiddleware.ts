import { DataStoredInToken } from '@/interface/auth'
import { models } from '@/models'
import { verify } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

const authCheckMiddleware = async (
  req: NextApiRequest & { user: any; security: any; residancy: any },
  res: NextApiResponse,
  next: any
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) throw new Error('Token not provided')
    const decodedToken = verify(token, process.env.SECRET_KEY as string) as DataStoredInToken
    const user =
      (await models.Residance.findById(decodedToken._id)) ||
      (await models.Security.findById(decodedToken._id)) ||
      (await models.Admin.findById(decodedToken._id))
    if (!user) throw new Error('User not found')

    req.user = {
      ...user.toObject()
    }
    req.security = {
      ...user.toObject()
    }
    req.residancy = {
      ...user.toObject()
    }
    next()
  } catch (error: any) {
    res.status(401).json({ message: error.message || 'Unauthorized' })
  }
}
export default authCheckMiddleware
