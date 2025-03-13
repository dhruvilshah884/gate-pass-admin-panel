import nextConnect from 'next-connect'
import { NextApiResponse } from 'next'
import { ResidancyService } from '@/services/residance.service'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import authCheckMiddleware from '@/middleware/authCheckMiddleware'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWIthUser'
const service = new ResidancyService()

export default nextConnect()
  .use(dbConnectMiddleware)
  // .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const residance = await service.get(req.query.id as string)
      res.status(200).json({
        success: true,
        data: residance
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
      const updateResidance = await service.update(req.query.id as string, data)

      res.status(200).json({
        success: true,
        data: updateResidance
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
      const deleteResidance = await service.delete(req.query.id as string)
      res.status(200).json({
        success: true,
        message: 'Customer deleted successfully'
      })
    } catch (error: any) {
      console.error(error)
      res.status(error.code || 500).json({
        success: false,
        message: error.message || 'Internal server error'
      })
    }
  })
