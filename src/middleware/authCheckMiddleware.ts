import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
import { models } from '@/models'
import { verify } from 'jsonwebtoken'
import { NextApiResponse } from 'next'

const authCheckMiddleware = async (req: NextApiRequestWithUser, res: NextApiResponse, next: any) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) throw new Error('Token not provided')

    const decodedToken = verify(token, process.env.SECRET_KEY as string) as any
    const [residance, security, admin] = await Promise.all([
      models.Residance.findById(decodedToken.user._id),
      models.Security.findById(decodedToken.user._id),
      models.Admin.findById(decodedToken.user._id)
    ])

    const user = residance || security || admin
    if (!user) throw new Error('User not found')

    req.user = user.toObject()

    next()
  } catch (error: any) {
    res.status(401).json({ message: error.message || 'Unauthorized' })
  }
}

export default authCheckMiddleware
