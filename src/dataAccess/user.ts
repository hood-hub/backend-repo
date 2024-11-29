import { Types } from "mongoose";
import {
  ICreateUser,
  IEmergencyContact,
  IUpdateUser,
  IUser,
  IUserData,
  IPoint,
  NorthLondonCA,
  SouthLondonCA,
  EastLondonCA,
  WestLondonCA,
} from "../interfaces/user";
import { UserModel } from "../models/user";
import { WithinLocationEnum } from "../enum/user";

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

  async incrementUserNoOfFlags(id: Types.ObjectId): Promise<IUserData | null> {
    return await UserModel.findByIdAndUpdate(
      id,
      { $inc: { noOfFlags: 1 } },
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

  async deactivateAdmin(id: Types.ObjectId): Promise<IUserData | null> {
    return await UserModel.findByIdAndUpdate(
      id,
      { isAdminDeactivated: true },
      {
        new: true,
        useFindAndModify: false,
      }
    ).select("-password");
  }

  // async findAll(): Promise<IUserData[]> {
  //   return await UserModel.find({}).select("-password");
  // }

  async findAllAdmins(): Promise<IUserData[]> {
    return await UserModel.find({
      isAdmin: true,
      isAdminDeactivated: false,
    }).select("-password");
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
    }).select("_id username profilePicture geoAddress stringAddress");
  }

  async findAll(
    skip: number,
    limit: number,
    location?: string
  ): Promise<{ count: number; users: IUserData[] }> {
    let query = {};

    if (location) {
      let mappedLocation;

      switch (location) {
        case WithinLocationEnum.NorthLondonCA: {
          mappedLocation = NorthLondonCA;
          break;
        }
        case WithinLocationEnum.SouthLondonCA: {
          mappedLocation = SouthLondonCA;
          break;
        }
        case WithinLocationEnum.EastLondonCA: {
          mappedLocation = EastLondonCA;
          break;
        }
        case WithinLocationEnum.WestLondonCA: {
          mappedLocation = WestLondonCA;
          break;
        }
      }

      let locationQuery = {
        $geoWithin: {
          $geometry: mappedLocation,
        },
      };
      // @ts-ignore
      query.geoAddress = locationQuery;
    }
    console.log(query);
    const count = await UserModel.find(query).countDocuments();
    const users = await UserModel.find(query)
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(limit)
      .select("-password");
    return { count, users };
  }

  async deletePermanently(id: Types.ObjectId): Promise<IUser | null> {
    return await UserModel.findByIdAndDelete(id);
  }
}

export default new UserRepository();
