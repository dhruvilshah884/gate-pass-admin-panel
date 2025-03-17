import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { ResidancyService } from '@/services/residance.service'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'

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
  .get(authCheckMiddleware ,async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const residancy = await service.search(
        req.query.q as string,
        req.query.queryBy ? (req.query.queryBy as string) : 'name',
        req.query.filter,
        Number(req.query.page),
        Number(req.query.pageSize),
        req.query.sortType as string
      )

      res.status(200).json({ success: true, data: residancy })
    } catch (error: any) {
      console.error('Error fetching residancy:', error)
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
