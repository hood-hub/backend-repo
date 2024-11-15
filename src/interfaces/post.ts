import { Types, Document } from "mongoose";
import { IPoint } from "./user";

export interface ICreatePost {
  text: string;
  media: string[];
  userId: Types.ObjectId;
  geoAddress: IPoint;
  stringAddress: string;
  isIncident?: boolean;
  isFlagged?: boolean;
  flaggedAt?: Date;
  flagReason: string;
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
  isFlagged?: boolean;
  isFlaggedResolved?: boolean;
  isFlaggedRemoved?: boolean;
  isDeleted: Boolean;
  flaggedAt?: Date;
  flagReason?: string;
  removedAt?: Date;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const BLACKLISTED_WORDS_FOR_POSTS = [
  "hate",
  "abuse",
  "slur",
  "discriminator",
  "racist",
  "sexist",
  "homophobic",
  "misogynist",
  "bullying",
  "harassing",
  "assault",
  "exploitation",
  "terrorists",
  "extremists",
  "bigot",
  "propaganda",
  "xenophobia",
  "homicide",
  "genocide",
  "pedophile",
  "grooming",
  "predator",
  "incest",
  "self-harm",
  "suicide",
  "mutilation",
  "torture",
  "doxx",
  "stalk ",
  "cyberbullying",
  "revenge",
  "gore",
  "obscene",
  "profanity",
  "derogatory",
  "defamation",
  "obscenity",
  "vulgar",
  "libelous",
  "slander",
  "insult",
];
