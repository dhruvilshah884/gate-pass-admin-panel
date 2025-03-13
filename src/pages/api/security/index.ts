import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { SecurityService } from '@/services/security.service'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'

const service = new SecurityService()
export default nextConnect()
  .use(dbConnectMiddleware)
  // .use(authCheckMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body
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
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const seucrities = await service.search(
        req.query.q as string,
        req.query.queryBy ? (req.query.queryBy as string) : '',
        req.query.filter,
        Number(req.query.page),
        Number(req.query.pageSize),
        req.query.sortType as string
      )

      res.status(200).json({ success: true, data: seucrities })
    } catch (error: any) {
      console.error('Error fetching seucrities:', error)
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
