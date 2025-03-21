import nextConnect from 'next-connect'
import { NextApiResponse } from 'next'
import { MaintenceService } from '@/services/maintence.service'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
const service = new MaintenceService()

export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const maintanance = await service.get(req.query.id as string)
      res.status(200).json({
        success: true,
        data: maintanance
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
      const updateMaintence = await service.updateMaintenanceStatus(req.query.id as string, data)

      res.status(200).json({
        success: true,
        data: updateMaintence
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
      const deleteMaintence = await service.delete(req.query.id as string)
      res.status(200).json({
        success: true,
        message: 'maintence deleted successfully'
      })
    } catch (error: any) {
      console.error(error)
      res.status(error.code || 500).json({
        success: false,
        message: error.message || 'Internal server error'
      })
    }
  })
