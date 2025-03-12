import dbConnect from '@/lib/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'

export async function dbConnectMiddleware(request: NextApiRequest, response: NextApiResponse, next: any) {
  await dbConnect()
  next()
}
