import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { AuthService } from '@/services/securityAuth.service'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { ISecurity } from '@/interface/security'

const service = new AuthService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        email: (req.user as ISecurity).email
      }
      const user = await service.updatePassword(data)
      res.status(201).json(user)
    } catch (error: any) {
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
