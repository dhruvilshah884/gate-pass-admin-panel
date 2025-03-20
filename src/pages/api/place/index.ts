import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
import { Iadmin } from '@/interface/admin'
import { PlaceService } from '@/services/place.service'

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
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const places = await service.search(
        req.query.q as string,
        req.query.queryBy ? (req.query.queryBy as string) : 'name',
        req.query.filter,
        Number(req.query.page),
        Number(req.query.pageSize),
        req.query.sortType as string
      )
      res.status(200).json({ success: true, data: places })
    } catch (error: any) {
      console.error('Error fetching places:', error)
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
