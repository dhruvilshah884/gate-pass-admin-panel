import nextConnect from 'next-connect'
import { NextApiResponse } from 'next'
import { VisitorService } from '@/services/visitor.service'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
const service = new VisitorService()

export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
        const data = {
            ...req.body
        }
      const visitor = await service.sos(req.query.id as string , data)
      res.status(200).json({
        success: true,
        data: visitor
      })
    } catch (error: any) {
      console.error(error)
      res.status(error.code || 500).json({
        success: false,
        message: error.message || 'Internal server error'
      })
    }
  })
  