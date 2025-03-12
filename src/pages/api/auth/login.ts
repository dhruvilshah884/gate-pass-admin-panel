import nextConnect from 'next-connect'
import { NextApiResponse } from 'next'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
import AuthService from '@/services/auth.service'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'

const service = new AuthService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = req.body
      const user = await service.login(data)
      res.status(201).json(user)
    } catch (error: any) {
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
