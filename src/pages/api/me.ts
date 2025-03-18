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
    try {
      const data = await service.me(req.user._id as string)
      res.status(200).json({ data })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
