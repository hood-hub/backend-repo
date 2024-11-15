import { Types } from "mongoose";
import MessageRepository from "../dataAccess/message";
import {
  ICreateDirectMessage,
  ICreateMessage,
  IDirectMessage,
  IMessage,
} from "../interfaces/message";
import { DirectMessageModel } from "../models/directMessage";

class MessageService {
  async create(
    data: ICreateMessage,
    userId: Types.ObjectId
  ): Promise<IMessage> {
    data = { ...data, sender: userId };
    let message = await MessageRepository.create(data);
    return message;
  }

  async createDirectMessage(
    data: ICreateDirectMessage
  ): Promise<IDirectMessage> {
    const messageChannel = await MessageRepository.createDirectMessage(data);

    return messageChannel;
  }
  //   async update(id: Types.ObjectId, data: IUpdateMessage): Promise<IMessage> {
  //     let Message = await MessageRepository.update(id, data);
  //     return Message;
  //   }

  //   async deleteMessage(userId: Types.ObjectId, id: Types.ObjectId): Promise<IMessage> {
  //     return await MessageRepository.delete(userId, id);
  //   }

  async getOneById(id: Types.ObjectId): Promise<IMessage> {
    let message = await MessageRepository.findOneById(id);
    return message;
  }

  async getByGroup(
    groupId: Types.ObjectId,
    page: number
  ): Promise<{
    page: number;
    totalPages: number;
    count: number;
    messages: IMessage[];
  }> {
    const limit = 20;
    const skip = (page - 1) * limit;
    const messagesAndCount = await MessageRepository.findByGroup(
      groupId,
      skip,
      limit
    );
    return {
      page,
      totalPages: Math.ceil(messagesAndCount.count / limit),
      ...messagesAndCount,
    };
  }

  async getByDirectMessage(
    directMessageId: Types.ObjectId,
    page: number
  ): Promise<{
    page: number;
    totalPages: number;
    count: number;
    messages: IMessage[];
  }> {
    const limit = 20;
    const skip = (page - 1) * limit;
    const messagesAndCount = await MessageRepository.findByMessageChannel(
      directMessageId,
      skip,
      limit
    );
    return {
      page,
      totalPages: Math.ceil(messagesAndCount.count / limit),
      ...messagesAndCount,
    };
  }
}

export default new MessageService();
