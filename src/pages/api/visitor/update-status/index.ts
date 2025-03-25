import nextConnect from 'next-connect'
import { NextApiResponse } from 'next'
import { VisitorService } from '@/services/visitor.service'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'

const service = new VisitorService()

export default nextConnect()
  .use(dbConnectMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const { id, status } = req.query
      console.log(id, status)

      if (!id || !status) {
        return res.status(400).json({ success: false, message: 'Missing visitor ID or status' })
      }

      const visitor = await service.statusUpdate(id as string, status as string)

      return res.status(200).json({
        success: true,
        message: `Visitor status updated to ${status}`,
        data: visitor
      })
    } catch (error: any) {
      console.error(error)
      return res.status(error.code || 500).json({
        success: false,
        message: error.message || 'Internal server error'
      })
    }
  })
