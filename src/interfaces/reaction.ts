import { Types, Document } from "mongoose";

export interface ICreateReaction {
  type: string;
  postId: Types.ObjectId;
  userId: Types.ObjectId;
}

export interface IUpdateReaction {
  type: string;
}

export interface IReaction extends Document {
  _id: Types.ObjectId;
  type: string;
  postId: Types.ObjectId;
  userId: Types.ObjectId;
  isDeleted: Boolean;
  createdAt: Date;
  updatedAt: Date;
}
