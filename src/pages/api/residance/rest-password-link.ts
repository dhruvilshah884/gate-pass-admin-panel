import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
import { NextApiResponse } from 'next'
import { AuthService } from '@/services/residanceAuth.service'
import nextConnect from 'next-connect'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'

const service = new AuthService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const resetPasswordLink = await service.resetPasswordLink(req.body.email)
      res.status(200).json({ success: true, message: 'Reset password link sent successfully', resetPasswordLink })
    } catch (err: any) {
      res.status(err.code || 500).json({ success: false, message: err.message })
    }
  })
