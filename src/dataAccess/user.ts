import { Types } from "mongoose";
import {
  ICreateUser,
  IEmergencyContact,
  IUpdateUser,
  IUser,
  IUserData,
  IPoint,
} from "../interfaces/user";
import { UserModel } from "../models/user";

class UserRepository {
  async create(data: ICreateUser): Promise<IUser> {
    const user = await UserModel.create(data);
    return user;
  }

  async update(
    id: Types.ObjectId,
    data: IUpdateUser
  ): Promise<IUserData | null> {
    return await UserModel.findByIdAndUpdate(id, data, {
      new: true,
      useFindAndModify: false,
    }).select("-password");
  }

  async updateEmergencyContact(
    id: Types.ObjectId,
    data: IEmergencyContact
  ): Promise<IUserData | null> {
    return await UserModel.findByIdAndUpdate(
      id,
      { $push: { emergencyContact: data } },
      {
        new: true,
        useFindAndModify: false,
      }
    ).select("-password");
  }

  async changePassword(
    id: Types.ObjectId,
    newPassword: string
  ): Promise<IUserData | null> {
    return await UserModel.findByIdAndUpdate(
      id,
      { password: newPassword },
      {
        new: true,
        useFindAndModify: false,
      }
    ).select("-password");
  }

  async joinGroup(
    userIds: Types.ObjectId | Types.ObjectId[],
    groupId: Types.ObjectId
  ): Promise<void> {
    if (userIds instanceof Array) {
      for (const userId of userIds) {
        await UserModel.findByIdAndUpdate(
          userId,
          { $push: { groups: groupId } },
          {
            new: true,
            useFindAndModify: false,
          }
        ).select("-password");
      }
    }

    await UserModel.findByIdAndUpdate(
      userIds,
      { $push: { groups: groupId } },
      {
        new: true,
        useFindAndModify: false,
      }
    ).select("-password");
  }

  async findById(id: Types.ObjectId): Promise<IUserData | null> {
    return await UserModel.findById(id).select("-password");
  }

  async findByIdWithPassword(id: Types.ObjectId): Promise<IUser | null> {
    return await UserModel.findById(id);
  }

  async findByEmail(email: string): Promise<IUserData | null> {
    return await UserModel.findOne({ email }).select("-password");
  }

  async findByGroup(groupId: Types.ObjectId): Promise<IUserData[]> {
    return await UserModel.find({ groups: groupId }).select("-password");
  }

  async findByEmailOrUsername(emailOrUsername: string): Promise<IUser | null> {
    return await UserModel.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
  }

  async findByDistanceFromLocation(
    distance: number,
    userAddress: IPoint
  ): Promise<IUser[]> {
    return await UserModel.find({
      geoAddress: {
        $near: {
          $geometry: userAddress,
          $maxDistance: distance, // Distance in meters
        },
      },
      isDeleted: false,
    }).select("username profilePicture");
  }

  async deletePermanently(id: Types.ObjectId): Promise<IUser | null> {
    return await UserModel.findByIdAndDelete(id);
  }
}

export default new UserRepository();
