import { Types } from "mongoose";
import { ReactionModel } from "../models/reaction";
import {
  ICreateReaction,
  IReaction,
  IUpdateReaction,
} from "../interfaces/reaction";

class ReactionRepository {
  async create(data: ICreateReaction): Promise<IReaction> {
    return await ReactionModel.create(data);
  }

  async update(id: Types.ObjectId, data: IUpdateReaction): Promise<IReaction> {
    const { type } = data;
    return await ReactionModel.findByIdAndUpdate(
      id,
      { type },
      { new: true, useFindAndModify: false }
    );
  }

  async delete(
    userId: Types.ObjectId,
    postId: Types.ObjectId
  ): Promise<IReaction> {
    return await ReactionModel.findOneAndUpdate(
      { postId, userId },
      { isDeleted: true },
      { new: true, useFindAndModify: false }
    );
  }

  async findOneById(id: Types.ObjectId): Promise<IReaction> {
    return await ReactionModel.findById(id);
  }

  async findByPostAndUser(
    userId: Types.ObjectId,
    postId: Types.ObjectId
  ): Promise<IReaction> {
    return await ReactionModel.findOne({ userId, postId, isDeleted: false });
  }
}

export default new ReactionRepository();
