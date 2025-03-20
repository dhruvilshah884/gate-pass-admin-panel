import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
import { Iadmin } from '@/interface/admin'
import { PlaceService } from '@/services/place.service'
import { models } from '@/models'

const service = new PlaceService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        admin: (req.user as Iadmin)._id,
        flat: (req.user as Iadmin).flat
      }
      const place = await service.create(data)
      res.status(201).json({ success: true, data: place })
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

      const searchFilter = q ? { flat: req.user.flat, isDeleted:false , name: { $regex: q, $options: 'i' } } : { flat: req.user.flat , isDeleted:false }

      const totalPlaces = await models.Place.countDocuments(searchFilter)

      const place = await models.Place.find(searchFilter).populate('flat').populate('admin').skip(skip).limit(limit)

      res.status(200).json({
        success: true,
        data: {
          result: place,
          total: totalPlaces,
          page: pageNumber,
          pageSize: limit,
          totalPages: Math.ceil(totalPlaces / limit)
        }
      })
    } catch (error: any) {
      console.error('Error fetching security:', error)
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
