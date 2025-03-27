import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { MessageService } from '@/services/message.service'
import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
import { IResidance } from '@/interface/residance'

const service = new MessageService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        sender: (req.user as IResidance)._id
      }
      const flat = await service.create(data)
      res.status(201).json({ success: true, data: flat })
    } catch (error: any) {
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
