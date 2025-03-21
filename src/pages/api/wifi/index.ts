import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { WifiService } from '@/services/wifi.service'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
import { IResidance } from '@/interface/residance'
import { models } from '@/models'

const service = new WifiService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        residance:(req.user as IResidance)._id,
        flat: (req.user as IResidance).flat
      }
      const wifi = await service.create(data)
      res.status(201).json({ success: true, data: wifi })
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

      const totalWifis = await models.Wifi.countDocuments(searchFilter)

      const wifi = await models.Wifi.find(searchFilter).populate('flat').populate('residance').skip(skip).limit(limit)

      res.status(200).json({
        success: true,
        data: {
          result: wifi,
          total: totalWifis,
          page: pageNumber,
          pageSize: limit,
          totalPages: Math.ceil(totalWifis / limit)
        }
      })
    } catch (error: any) {
      console.error('Error fetching wifi:', error)
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })

