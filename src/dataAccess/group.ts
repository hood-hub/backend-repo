import { Types } from "mongoose";
import { GroupModel } from "../models/group";
import { ICreateGroup, IGroup, IUpdateGroup } from "../interfaces/group";

class GroupRepository {
  async create(data: ICreateGroup): Promise<IGroup> {
    return await GroupModel.create(data);
  }

  async update(id: Types.ObjectId, data: IUpdateGroup): Promise<IGroup> {
    return await GroupModel.findByIdAndUpdate(id, data, {
      new: true,
      useFindAndModify: false,
    });
  }

  async addGroupMembers(
    id: Types.ObjectId,
    userIds: Types.ObjectId[]
  ): Promise<IGroup> {
    return await GroupModel.findByIdAndUpdate(
      id,
      {
        $push: { members: userIds },
        $inc: { noOfMembers: userIds.length },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
  }

  async requestToJoinGroup(
    id: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<IGroup> {
    return await GroupModel.findByIdAndUpdate(
      id,
      {
        $push: { groupRequests: userId },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
  }

  async approveJoinRequest(
    id: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<IGroup> {
    return await GroupModel.findByIdAndUpdate(
      id,
      {
        $pop: { groupRequests: userId },
        $push: { members: userId },
        $inc: { noOfMembers: 1 },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
  }

  async addAdmin(id: Types.ObjectId, userId: Types.ObjectId): Promise<IGroup> {
    return await GroupModel.findByIdAndUpdate(
      id,
      {
        $push: { admins: userId },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
  }

  async delete(userId: Types.ObjectId, id: Types.ObjectId): Promise<IGroup> {
    return await GroupModel.findOneAndUpdate(
      { _id: id, createdBy: userId },
      { isDeleted: true },
      { new: true, useFindAndModify: false }
    );
  }

  async findOneById(id: Types.ObjectId): Promise<IGroup> {
    return await GroupModel.findById(id)
      .populate([
        {
          path: "members",
          select: "username profilePicture",
        },
        {
          path: "admins",
          select: "username profilePicture",
        },
      ])
      .select("-groupRequests");
  }

  async findOneByIdWithGroupRequests(id: Types.ObjectId): Promise<IGroup> {
    return await GroupModel.findById(id).populate([
      {
        path: "groupRequests",
        select: "username profilePicture",
      },
    ]);
  }

  async findAll(
    skip: number,
    limit: number
  ): Promise<{ count: number; groups: IGroup[] }> {
    const count = await GroupModel.find({ isDeleted: false }).countDocuments();
    const groups = await GroupModel.find({ isDeleted: false })
      .select("-groupRequests")
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "members",
        select: "profilePicture",
      });
    return { count, groups };
  }
}

export default new GroupRepository();
