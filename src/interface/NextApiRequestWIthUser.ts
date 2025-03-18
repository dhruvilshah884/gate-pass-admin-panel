import { NextApiRequest } from 'next'
import { IAuthUser } from './authUser'
import { Iadmin } from './admin'
import { ISecurity } from './security'
import { IResidance } from './residance'

export type NextApiRequestWithUser = NextApiRequest & {
  user: Iadmin | ISecurity | IResidance
}
