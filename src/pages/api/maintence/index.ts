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
      const { page = 1, pageSize = 10, q = '', residanceName = '' } = req.query

      const pageNumber = Number(page)
      const limit = Number(pageSize)
      const skip = (pageNumber - 1) * limit

      const matchStage: any = {
        isDeleted: false,
        flat: req.user.flat
      }

      // Add search by maintenance name (if q provided)
      if (q) {
        matchStage.name = { $regex: q, $options: 'i' }
      }

      const pipeline: any[] = [
        {
          $match: matchStage
        },
        {
          $lookup: {
            from: 'residances', // this must match the actual MongoDB collection name
            localField: 'residance',
            foreignField: '_id',
            as: 'residance'
          }
        },
        { $unwind: '$residance' }
      ]

      // Add filtering by residance name
      if (residanceName) {
        pipeline.push({
          $match: {
            'residance.name': { $regex: residanceName, $options: 'i' }
          }
        })
      }

      // Count total
      const countPipeline = [...pipeline, { $count: 'total' }]
      const totalResult = await models.Maintenance.aggregate(countPipeline)
      const totalMaintence = totalResult[0]?.total || 0

      // Add pagination
      pipeline.push({ $skip: skip }, { $limit: limit })

      const maintence = await models.Maintenance.aggregate(pipeline)

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
      console.error('Error fetching maintenance:', error)
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
