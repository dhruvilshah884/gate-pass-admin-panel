import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { MaintenceService } from '@/services/maintence.service'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
import { models } from '@/models'

const service = new MaintenceService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const flat = await service.sendMailForMaintance(req.user.flat as string)
      res.status(201).json({ success: true, data: flat })
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

      const totalMaintence = await models.Maintenance.countDocuments(searchFilter)

      const maintence = await models.Maintenance.find(searchFilter)
        .populate('flat')
        .populate('residance')
        .skip(skip)
        .limit(limit)

      res.status(200).json({
        success: true,
        data: {
          result: maintence,
          total: totalMaintence,
          page: pageNumber,
          pageSize: limit,
          totalPages: Math.ceil(totalMaintence / limit)
        }
      })
    } catch (error: any) {
      console.error('Error fetching maintence:', error)
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
