import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { ComplaintService } from '@/services/complaint.service'
import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
import { models } from '@/models'

const service = new ComplaintService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const residancy = await models.Residance.countDocuments({ isDeleted: false, flat: req.user.flat })
      const visitors = await models.Visitor.countDocuments({ isDeleted: false, flat: req.user.flat })
      const security = await models.Security.countDocuments({ isDeleted: false, flat: req.user.flat })
      const complaints = await models.Complaint.countDocuments({
        isDeleted: false,
        flat: req.user.flat,
        status: 'pending'
      })

      res.status(200).json({ success: true, data: { residancy, visitors, security, complaints } })
    } catch (error: any) {
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
