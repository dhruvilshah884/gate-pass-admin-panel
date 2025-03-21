import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { ResidancyService } from '@/services/residance.service'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
import { models } from '@/models'

const service = new ResidancyService()
export default nextConnect()
  .use(dbConnectMiddleware)
  // .use(authCheckMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body
      }
      const residance = await service.create(data)
      res.status(201).json({ success: true, data: residance })
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

      const totalResidancies = await models.Residance.countDocuments(searchFilter)

      const residancy = await models.Residance.find(searchFilter).populate('flat').populate("pastMaintenance").skip(skip).limit(limit)

      res.status(200).json({
        success: true,
        data: {
          result: residancy,
          total: totalResidancies,
          page: pageNumber,
          pageSize: limit,
          totalPages: Math.ceil(totalResidancies / limit)
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
