import { Types, Document } from "mongoose";
import { IPoint } from "./user";

export interface ICreateMessage {
  content: string;
  media: string[];
  sender: Types.ObjectId;
  group?: Types.ObjectId;
  directMessage?: Types.ObjectId;
}

// export interface IUpdateMessage {
//   text: string;
//   media: string[];
//   geoAddress: IPoint;
//   stringAddress: string;
// }

export interface IMessage extends Document {
  _id: Types.ObjectId;
  content: string;
  media: string[];
  sender: Types.ObjectId;
  group?: Types.ObjectId;
  directMessage?: Types.ObjectId;
  isDeleted: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateDirectMessage {
  firstParty: Types.ObjectId;
  secondParty: Types.ObjectId;
}

export interface IDirectMessage extends Document {
  _id: Types.ObjectId;
  firstParty: Types.ObjectId;
  secondParty: Types.ObjectId;
  isDeleted: Boolean;
  createdAt: Date;
  updatedAt: Date;
}
