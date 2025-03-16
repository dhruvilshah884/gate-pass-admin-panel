import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { AdminService } from '@/services/admin.service'

const service = new AdminService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body
      }
      const user = await service.SignUp(data)
      res.status(201).json(user)
    } catch (error: any) {
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
