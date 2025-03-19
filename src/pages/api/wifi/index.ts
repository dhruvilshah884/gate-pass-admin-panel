import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { WifiService } from '@/services/wifi.service'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
import { IResidance } from '@/interface/residance'

const service = new WifiService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        residance:(req.user as IResidance)._id
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
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const wifi = await service.search(
        req.query.q as string,
        req.query.queryBy ? (req.query.queryBy as string) : 'name',
        req.query.filter,
        Number(req.query.page),
        Number(req.query.pageSize),
        req.query.sortType as string
      )

      res.status(200).json({ success: true, data: wifi })
    } catch (error: any) {
      console.error('Error fetching wifi:', error)
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
