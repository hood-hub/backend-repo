import { Types } from "mongoose";
import GroupRepository from "../dataAccess/group";
import UserRepository from "../dataAccess/user";

import { ICreateGroup, IGroup, IUpdateGroup } from "../interfaces/group";
import { IUserData } from "../interfaces/user";
import ErrorMiddleware from "../middleware/error";

class GroupService {
  async create(data: ICreateGroup): Promise<IGroup> {
    const group = await GroupRepository.create(data);
    await UserRepository.joinGroup(data.members, group._id);
    return group;
  }

  async update(id: Types.ObjectId, data: IUpdateGroup): Promise<IGroup> {
    return await GroupRepository.update(id, data);
  }

  async addGroupMembers(
    id: Types.ObjectId,
    userIds: Types.ObjectId[]
  ): Promise<IGroup> {
    for (const userId of userIds) {
      if (!(await UserRepository.findById(userId))) {
        ErrorMiddleware.errorHandler(
          `User with the id: ${userId} not found!`,
          404
        );
      }
      let group = await this.getOneById(id);
      if (group.members.includes(userId)) {
        ErrorMiddleware.errorHandler("User is already a member!", 400);
      }
    }
    const group = await GroupRepository.addGroupMembers(id, userIds);
    await UserRepository.joinGroup(userIds, id);
    return group;
  }

  async approveRequestToJoinPrivateGroup(
    id: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<IGroup> {
    if (!(await UserRepository.findById(userId))) {
      ErrorMiddleware.errorHandler(
        `User with the id: ${userId} not found!`,
        404
      );
    }
    let group = await this.getOneById(id);
    if (group.members.includes(userId)) {
      ErrorMiddleware.errorHandler("User is already a member!", 400);
    }
    group = await GroupRepository.approveJoinRequest(id, userId);
    await UserRepository.joinGroup(userId, id);
    return group;
  }

  async requestToJoinPrivateGroup(
    id: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<void> {
    if (!(await UserRepository.findById(userId))) {
      ErrorMiddleware.errorHandler(
        `User with the id: ${userId} not found!`,
        404
      );
    }
    let group = await this.getOneById(id);
    if (group.members.includes(userId)) {
      ErrorMiddleware.errorHandler("User is already a member!", 400);
    }
    if (group.groupRequests.includes(userId)) {
      ErrorMiddleware.errorHandler("Request pending!", 400);
    }
    await GroupRepository.requestToJoinGroup(id, userId);
  }

  async addAdmin(id: Types.ObjectId, userId: Types.ObjectId): Promise<IGroup> {
    let group = await this.getOneById(id);
    console.log(group);
    if (!group.members.includes(userId)) {
      ErrorMiddleware.errorHandler(
        "User must be added before becoming an admin!",
        400
      );
    }
    if (group.admins.includes(userId)) {
      ErrorMiddleware.errorHandler("User is already an admin!", 400);
    }
    group = await GroupRepository.addAdmin(id, userId);
    return group;
  }

  async deleteGroup(
    userId: Types.ObjectId,
    id: Types.ObjectId
  ): Promise<IGroup> {
    return await GroupRepository.delete(userId, id);
  }

  async getOneById(id: Types.ObjectId): Promise<IGroup> {
    return await GroupRepository.findOneById(id);
  }

  async getGroupMembers(id: Types.ObjectId): Promise<IUserData[]> {
    return await UserRepository.findByGroup(id);
  }

  async getGroupRequests(id: Types.ObjectId): Promise<IGroup> {
    return await GroupRepository.findOneByIdWithGroupRequests(id);
  }

  async getAllGroups(page: number): Promise<{
    page: number;
    totalPages: number;
    count: number;
    groups: IGroup[];
  }> {
    const limit = 20;
    const skip = (page - 1) * limit;
    const groupsAndCount = await GroupRepository.findAll(skip, limit);
    return {
      page,
      totalPages: Math.ceil(groupsAndCount.count / limit),
      ...groupsAndCount,
    };
  }
}

export default new GroupService();
