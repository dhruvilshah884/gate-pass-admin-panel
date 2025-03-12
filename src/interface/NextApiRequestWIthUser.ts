import { NextApiRequest } from "next";
import { IAuthUser } from "./authUser";

export type NextApiRequestWithUser = NextApiRequest & { user: IAuthUser };
