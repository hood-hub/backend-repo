import { Types, Document } from "mongoose";

export interface ICreateGroup {
  name: string;
  visibility: string;
  description: string;
  admins: Types.ObjectId[];
  members: Types.ObjectId[];
  createdBy: Types.ObjectId;
}

export interface IUpdateGroup {
  name: string;
  visibility: string;
  description: string;
  // admins: Types.ObjectId[];
  // members: Types.ObjectId[];
}

export interface IGroup extends Document {
  _id: Types.ObjectId;
  name: string;
  visibility: string;
  noOfMembers: number;
  description: string;
  groupRequests?: Types.ObjectId[];
  admins: Types.ObjectId[];
  members: Types.ObjectId[];
  createdBy: Types.ObjectId;
  isDeleted: Boolean;
  createdAt: Date;
  updatedAt: Date;
}
