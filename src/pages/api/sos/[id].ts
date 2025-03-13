import nextConnect from 'next-connect'
import { NextApiResponse } from 'next'
import { SosService } from '@/services/sos.service'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
const service = new SosService()

export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const sos = await service.get(req.query.id as string)
      res.status(200).json({
        success: true,
        data: sos
      })
    } catch (error: any) {
      console.error(error)
      res.status(error.code || 500).json({
        success: false,
        message: error.message || 'Internal server error'
      })
    }
  })
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = req.body
      const updateSos = await service.update(req.query.id as string, data)

      res.status(200).json({
        success: true,
        data: updateSos
      })
    } catch (error: any) {
      console.error(error)
      res.status(error.code || 500).json({
        success: false,
        message: error.message || 'Internal server error'
      })
    }
  })
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const deleteSos = await service.delete(req.query.id as string)
      res.status(200).json({
        success: true,
        message: 'sos deleted successfully'
      })
    } catch (error: any) {
      console.error(error)
      res.status(error.code || 500).json({
        success: false,
        message: error.message || 'Internal server error'
      })
    }
  })
