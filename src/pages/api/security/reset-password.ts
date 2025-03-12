import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
import { NextApiResponse } from 'next'
import { AuthService } from '@/services/securityAuth.service'
import nextConnect from 'next-connect'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'

const service = new AuthService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const resetPassword = await service.resetPassword(
        req.query.token as string,
        req.body.newPassword,
        req.body.confirmPassword
      )
      console.log(resetPassword)
      res.status(200).json({ success: true, message: 'Password reset successful', resetPassword })
    } catch (err: any) {
      res.status(err.code || 500).json({ success: false, message: err.message })
    }
  })
