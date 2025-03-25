import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { FlatService } from '@/services/flat.service'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

const service = new FlatService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const allFlats = await service.search(
        req.query.q as string,
        req.query.queryBy ? (req.query.queryBy as string) : '',
        req.query.filter,
        Number(req.query.page),
        Number(req.query.pageSize),
        req.query.sortType as string
      )

      res.status(200).json({ success: true, data: allFlats })
    } catch (error: any) {
      console.error('Error fetching qrCodes:', error)
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
