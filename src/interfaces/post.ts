import { Types, Document } from "mongoose";
import { IPoint } from "./user";

export interface ICreatePost {
  text: string;
  media: string[];
  userId: Types.ObjectId;
  geoAddress: IPoint;
  stringAddress: string;
  isIncident?: boolean;
}

export interface IUpdatePost {
  text: string;
  media: string[];
  geoAddress: IPoint;
  stringAddress: string;
}

export interface IPost extends Document {
  _id: Types.ObjectId;
  text: string;
  media: string[];
  noOfLikes: number;
  noOfComments: number;
  geoAddress: IPoint;
  stringAddress: string;
  isIncident?: boolean;
  isDeleted: Boolean;
  createdAt: Date;
  updatedAt: Date;
}
