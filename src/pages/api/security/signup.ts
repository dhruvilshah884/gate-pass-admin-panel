import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { AuthService } from '@/services/securityAuth.service'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { Iadmin } from '@/interface/admin'

const service = new AuthService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        flat: (req.user as Iadmin).flat,
        ...req.body
      }
      const user = await service.Signup(data)
      res.status(201).json(user)
    } catch (error: any) {
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
