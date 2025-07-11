import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { AuthService } from '@/services/securityAuth.service'

const service = new AuthService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const user = await service.signIn(req.body.email, req.body.password)
      res.status(201).json(user)
    } catch (error: any) {
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
