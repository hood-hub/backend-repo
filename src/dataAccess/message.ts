import { Types } from "mongoose";
import {
  ICreateDirectMessage,
  ICreateMessage,
  IDirectMessage,
  IMessage,
} from "../interfaces/message";
import { MessageModel } from "../models/message";
import { DirectMessageModel } from "../models/directMessage";

class MessageRepository {
  async create(data: ICreateMessage): Promise<IMessage> {
    return await MessageModel.create(data);
  }

  //   async update(id: Types.ObjectId, data: IUpdateMessage): Promise<IMessage> {
  //     const { type } = data;
  //     return await MessageModel.findByIdAndUpdate(
  //       id,
  //       { type },
  //       { new: true, useFindAndModify: false }
  //     );
  //   }

  //   async delete(
  //     userId: Types.ObjectId,
  //     postId: Types.ObjectId
  //   ): Promise<IMessage> {
  //     return await MessageModel.findOneAndUpdate(
  //       { postId, userId },
  //       { isDeleted: true },
  //       { new: true, useFindAndModify: false }
  //     );
  //   }

  async createDirectMessage(
    data: ICreateDirectMessage
  ): Promise<IDirectMessage> {
    // Check if direct message channel exists between both parties.
    let messageChannel = await DirectMessageModel.findOne({
      $or: [
        { firstParty: data.firstParty, secondParty: data.secondParty },
        { firstParty: data.secondParty, secondParty: data.firstParty },
      ],
    });
    if (messageChannel) {
      return messageChannel;
    }
    messageChannel = await DirectMessageModel.create(data);
    return messageChannel;
  }

  async findOneById(id: Types.ObjectId): Promise<IMessage> {
    return await MessageModel.findById(id).populate({
      path: "sender",
      select: "username profilePicture",
    });
  }

  async findByGroup(
    groupId: Types.ObjectId,
    skip: number,
    limit: number
  ): Promise<{ count: number; messages: IMessage[] }> {
    const count = await MessageModel.find({
      group: groupId,
      isDeleted: false,
    }).countDocuments();
    const messages = await MessageModel.find({
      group: groupId,
      isDeleted: false,
    })
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "sender",
        select: "username profilePicture",
      });
    return { count, messages };
  }

  async findByMessageChannel(
    directMessageId: Types.ObjectId,
    skip: number,
    limit: number
  ): Promise<{ count: number; messages: IMessage[] }> {
    const count = await MessageModel.find({
      directMessage: directMessageId,
      isDeleted: false,
    }).countDocuments();
    const messages = await MessageModel.find({
      directMessage: directMessageId,
      isDeleted: false,
    })
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "sender",
        select: "username profilePicture",
      });
    return { count, messages };
  }

  async findDirectMessagesForUser(
    userId: Types.ObjectId,
    skip: number,
    limit: number
  ): Promise<{ count: number; dms: IDirectMessage[] }> {
    const count = await DirectMessageModel.find({
      $or: [{ firstParty: userId }, { secondParty: userId }],
    }).countDocuments();
    const dms = await DirectMessageModel.find({
      $or: [{ firstParty: userId }, { secondParty: userId }],
    })
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "firstParty",
        select: "username profilePicture",
      })
      .populate({
        path: "secondParty",
        select: "username profilePicture",
      });
    return { count, dms };
  }
}

export default new MessageRepository();
