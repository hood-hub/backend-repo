import { Types } from "mongoose";
import { PostModel } from "../models/post";
import { ReactionModel } from "../models/reaction";
import {
  ICreateReaction,
  IReaction,
  IUpdateReaction,
} from "../interfaces/reaction";
import { CommentModel } from "../models/comment";
import {
  IComment,
  ICreateComment,
  IUpdateComment,
} from "../interfaces/comment";

class CommentRepository {
  async create(data: ICreateComment): Promise<IComment> {
    return await CommentModel.create(data);
  }

  async update(id: Types.ObjectId, data: IUpdateComment): Promise<IComment> {
    const { body } = data;
    return await CommentModel.findByIdAndUpdate(
      id,
      { body },
      { new: true, useFindAndModify: false }
    ).populate({
      path: "userId",
      select: "username profilePicture",
    });
  }

  async delete(userId: Types.ObjectId, id: Types.ObjectId): Promise<IComment> {
    return await CommentModel.findOneAndUpdate(
      { _id: id, userId },
      { isDeleted: true },
      { new: true, useFindAndModify: false }
    );
  }

  async findOneById(id: Types.ObjectId): Promise<IComment> {
    return await CommentModel.findById(id).populate({
      path: "userId",
      select: "username profilePicture",
    });
  }

  async findByPostAndUser(
    userId: Types.ObjectId,
    postId: Types.ObjectId,
    skip: number,
    limit: number
  ): Promise<IComment[]> {
    return await CommentModel.find({
      userId,
      postId,
      isDeleted: false,
    }).populate({
      path: "userId",
      select: "username profilePicture",
    });
    //   .skip(skip)
    //   .limit(limit);
  }

  async findByPost(
    postId: Types.ObjectId
    // skip: number,
    // limit: number
  ): Promise<IComment[]> {
    return await CommentModel.find({ postId, isDeleted: false }).populate({
      path: "userId",
      select: "username profilePicture",
    });
    //   .skip(skip)
    //   .limit(limit);
  }
}

export default new CommentRepository();
