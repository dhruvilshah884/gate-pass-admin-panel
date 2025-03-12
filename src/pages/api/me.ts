import nextConnect from 'next-connect'
import { NextApiResponse } from 'next'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
import UserService from '@/services/user.service'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'

const service = new UserService()

export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    const user = await service.me(req.user._id as string)
    res.json(user)
  })
