import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { AttendanceService } from '@/services/attendance.service'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'

const service = new AttendanceService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        security:req.security._id
      }
      const attendance = await service.createAttendaceWithPayroll(data)
      res.status(201).json({ success: true, data: attendance })
    } catch (error: any) {
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const attendance = await service.search(
        req.query.q as string,
        req.query.queryBy ? (req.query.queryBy as string) : '',
        req.query.filter,
        Number(req.query.page),
        Number(req.query.pageSize),
        req.query.sortType as string
      )

      res.status(200).json({ success: true, data: attendance })
    } catch (error: any) {
      console.error('Error fetching attendance:', error)
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
