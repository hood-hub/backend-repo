import { Types, Document } from "mongoose";

export interface ICreateComment {
  body: string;
  postId: Types.ObjectId;
  userId: Types.ObjectId;
}

export interface IUpdateComment {
  body: string;
}

export interface IComment extends Document {
  _id: Types.ObjectId;
  body: string;
  postId: Types.ObjectId;
  userId: Types.ObjectId;
  isDeleted: Boolean;
  createdAt: Date;
  updatedAt: Date;
}
