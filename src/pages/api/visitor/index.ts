import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { VisitorService } from '@/services/visitor.service'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
import { models } from '@/models'

const service = new VisitorService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        security: req.security._id as string,
        flat: req.security.flat as string
      }
      const visitor = await service.create(data)

      const residance = await models.Residance.findByIdAndUpdate(
        data.residance,
        { $push: { pastVisitor: visitor._id } }
      )
      res.status(201).json({ success: true, data: visitor , residance: visitor._id})
    } catch (error: any) {
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const visitors = await service.search(
        req.query.q as string,
        req.query.queryBy ? (req.query.queryBy as string) : '',
        req.query.filter,
        Number(req.query.page),
        Number(req.query.pageSize),
        req.query.sortType as string
      )

      res.status(200).json({ success: true, data: visitors })
    } catch (error: any) {
      console.error('Error fetching visitors:', error)
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
