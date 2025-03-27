import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { GroupServicwe } from '@/services/group.service'
import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
import { Iadmin } from '@/interface/admin'

const service = new GroupServicwe()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        flat: (req.user as Iadmin).flat,
        createdBy: (req.user as Iadmin)._id
      }
      const flat = await service.CreateGroup(data)
      res.status(201).json({ success: true, data: flat })
    } catch (error: any) {
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const groups = await service.getGroupsWithMembers(
        req.query.q ? { name: { $regex: req.query.q, $options: 'i' } } : {},
        Number(req.query.page) || 1,
        Number(req.query.pageSize) || 10,
        req.query.sortType as string
      )

      res.status(200).json({ success: true, data: groups })
    } catch (error: any) {
      console.error('Error fetching groups:', error)
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error.'
      })
    }
  })
