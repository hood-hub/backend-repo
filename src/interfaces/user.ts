import { Types, Document } from "mongoose";

export interface IPoint {
  type: "Point";
  coordinates: number[];
}
export interface ICreateUser {
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  password: string;
  geoAddress?: IPoint;
  stringAddress?: string;
  isAdmin?: Boolean;
  isVerified?: Boolean;
}

export interface IOnboardUser {
  username: string;
  email: string;
  geoAddress: IPoint;
  stringAddress: string;
}

export interface IUpdateUser {
  firstName?: string;
  lastName?: string;
  username?: string;
  profilePicture?: string;
  geoAddress?: IPoint;
  stringAddress?: string;
}

export interface IEmergencyContact {
  firstName?: string;
  lastName?: string;
  relationship?: string;
  email?: IPoint;
  phoneNumber?: string;
  isPrimary?: boolean;
}

export interface IChangePassword {
  prevPassword?: string;
  newPassword?: string;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  password: string;
  profilePicture: string;
  geoAddress?: IPoint;
  stringAddress?: string;
  emergencyContact?: IEmergencyContact[];
  createdAt: Date;
  updatedAt: Date;
  isVerified?: Boolean;
  isAdmin?: Boolean;
}

// User data without password
export interface IUserData extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  profilePicture: string;
  geoAddress?: IPoint;
  stringAddress?: string;
  emergencyContact?: IEmergencyContact[];
  createdAt: Date;
  updatedAt: Date;
  isVerified?: Boolean;
  isAdmin?: Boolean;
}

export interface IToken extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  token: number;
  isDeleted: Boolean;
}

export const NorthLondonCA = {
  type: "Polygon",
  coordinates: [
    [
      [-81.183, 43.0383],
      [-81.328, 43.0383],
      [-81.328, 42.975],
      [-81.183, 42.975],
      [-81.183, 43.0383],
    ],
  ],
};

export const SouthLondonCA = {
  type: "Polygon",
  coordinates: [
    [
      [-81.183, 42.941],
      [-81.328, 42.941],
      [-81.328, 42.87],
      [-81.183, 42.87],
      [-81.183, 42.941],
    ],
  ],
};

export const EastLondonCA = {
  type: "Polygon",
  coordinates: [
    [
      [-81.183, 42.998],
      [-81.3, 42.998],
      [-81.3, 42.93],
      [-81.183, 42.93],
      [-81.183, 42.998],
    ],
  ],
};

export const WestLondonCA = {
  type: "Polygon",
  coordinates: [
    [
      [-81.328, 43.03],
      [-81.42, 43.03],
      [-81.42, 42.965],
      [-81.328, 42.965],
      [-81.328, 43.03],
    ],
  ],
};

/**
 * Convention is:
 * NE
 * NW
 * SW
 * SE */
