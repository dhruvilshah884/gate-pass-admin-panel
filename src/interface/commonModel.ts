import { Types } from "mongoose";

export interface CommonModal {
  _id?: string | Types.ObjectId;
  isDeleted?: boolean;
  version?: string;
  createdAt?: string;
  updatedAt?: string;
}
