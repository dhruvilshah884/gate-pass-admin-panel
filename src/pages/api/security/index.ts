import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { SecurityService } from '@/services/security.service'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
import { Iadmin } from '@/interface/admin'
import { models } from '@/models'

const service = new SecurityService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        flat: (req.user as Iadmin).flat
      }
      const security = await service.create(data)
      res.status(201).json({ success: true, data: security })
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

      const totalSecurity = await models.Security.countDocuments(searchFilter)

      const security = await models.Security.find(searchFilter).populate('flat').skip(skip).limit(limit)

      res.status(200).json({
        success: true,
        data: {
          result: security,
          total: totalSecurity,
          page: pageNumber,
          pageSize: limit,
          totalPages: Math.ceil(totalSecurity / limit)
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
