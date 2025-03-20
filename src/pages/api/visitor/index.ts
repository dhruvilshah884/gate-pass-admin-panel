import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { VisitorService } from '@/services/visitor.service'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
import { models } from '@/models'
import { ISecurity } from '@/interface/security'

const service = new VisitorService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .post(authCheckMiddleware, async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        security: (req.user as ISecurity)._id,
        flat: (req.user as ISecurity).flat
      }
      const visitor = await service.create(data)

      const residance = await models.Residance.findByIdAndUpdate(data.residance, {
        $push: { pastVisitor: visitor._id }
      })
      res.status(201).json({ success: true, data: visitor, residance: visitor._id })
    } catch (error: any) {
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
  .get(authCheckMiddleware, async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const { page = 1, pageSize = 10, q = '' } = req.query

      const pageNumber = Number(page)
      const limit = Number(pageSize)
      const skip = (pageNumber - 1) * limit

      const searchFilter = q
        ? { flat: req.user.flat, isDeleted: false, name: { $regex: q, $options: 'i' } }
        : { flat: req.user.flat, isDeleted: false }

      const totalVisitors = await models.Visitor.countDocuments(searchFilter)

      const visitors = await models.Visitor.find(searchFilter)
        .populate('flat')
        .populate('residance')
        .populate('security')
        .skip(skip)
        .limit(limit)

      const pendingCount = visitors.filter(v => v.status === 'pending').length
      const approvedCount = visitors.filter(v => v.status === 'approved').length
      const deniedCount = visitors.filter(v => v.status === 'denied').length
      const completedCount = visitors.filter(v => v.status === 'completed').length

      res.status(200).json({
        success: true,
        data: {
          result: visitors,
          total: totalVisitors,
          page: pageNumber,
          pageSize: limit,
          totalPages: Math.ceil(totalVisitors / limit),
          pending: pendingCount,
          approved: approvedCount,
          denied: deniedCount,
          completedCount
        }
      })
    } catch (error: any) {
      console.error('Error fetching residancy:', error)
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
