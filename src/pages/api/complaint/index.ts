import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { ComplaintService } from '@/services/complaint.service'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
import { IResidance } from '@/interface/residance'
import { models } from '@/models'

const service = new ComplaintService()
export default nextConnect()
  .use(dbConnectMiddleware)
  // .use(authCheckMiddleware)
  .post(authCheckMiddleware, async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        residance: (req.user as IResidance)._id,
        flat: (req.user as IResidance).flat
      }
      const complaint = await service.create(data)
      res.status(201).json({ success: true, data: complaint })
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
        ? { flat: req.user.flat, isDeleted: false, complaint: { $regex: q, $options: 'i' } }
        : { flat: req.user.flat, isDeleted: false }

      const totalComplaint = await models.Complaint.countDocuments(searchFilter)

      const complaints = await models.Complaint.find(searchFilter)
        .populate('residance')
        .populate('flat')
        .skip(skip)
        .limit(limit)

      res.status(200).json({
        success: true,
        data: {
          result: complaints,
          total: totalComplaint,
          page: pageNumber,
          pageSize: limit,
          totalPages: Math.ceil(totalComplaint / limit)
        }
      })
    } catch (error: any) {
      console.error('Error fetching complaints:', error)
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
