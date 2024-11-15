import { Types } from "mongoose";
import { ICreatePost, IPost, IUpdatePost } from "../interfaces/post";
import { PostModel } from "../models/post";
import { IPoint } from "../interfaces/user";
import UserRepository from "../dataAccess/user";

class PostRepository {
  async create(data: ICreatePost): Promise<IPost> {
    const post = await PostModel.create(data);
    return await this.findOneById(post._id);
  }

  async update(id: Types.ObjectId, data: IUpdatePost): Promise<IPost> {
    return await PostModel.findByIdAndUpdate(id, data, {
      new: true,
      useFindAndModify: false,
    }).populate({
      path: "userId",
      select: "username profilePicture",
    });
  }

  async removeFlaggedPost(
    id: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<IPost> {
    await UserRepository.incrementUserNoOfFlags(userId);
    return await PostModel.findByIdAndUpdate(
      id,
      { isFlaggedRemoved: true, isFlagged: false, removedAt: new Date() },
      {
        new: true,
        useFindAndModify: false,
      }
    ).populate({
      path: "userId",
      select: "username profilePicture",
    });
  }

  async resolveFlaggedPost(id: Types.ObjectId): Promise<IPost> {
    return await PostModel.findByIdAndUpdate(
      id,
      { isFlaggedResolved: true, isFlagged: false, resolvedAt: new Date() },
      {
        new: true,
        useFindAndModify: false,
      }
    ).populate({
      path: "userId",
      select: "username profilePicture",
    });
  }

  async delete(userId: Types.ObjectId, id: Types.ObjectId): Promise<IPost> {
    return await PostModel.findOneAndUpdate(
      { _id: id, userId },
      { isDeleted: true },
      { new: true, useFindAndModify: false }
    );
  }

  async findOneById(id: Types.ObjectId): Promise<IPost> {
    return await PostModel.findById(id).populate({
      path: "userId",
      select: "username profilePicture",
    });
  }

  async findOneByUser(userId: Types.ObjectId): Promise<IPost[]> {
    return await PostModel.find({ userId, isDeleted: false }).populate({
      path: "userId",
      select: "username profilePicture",
    });
  }

  async findByLikesAndComments(
    skip: number,
    limit: number
  ): Promise<{ count: number; posts: IPost[] }> {
    const count = await PostModel.find({
      noOfLikes: { $gt: 5 },
      noOfComments: { $gt: 5 },
      isDeleted: false,
      isFlaggedRemoved: false,
    }).countDocuments();
    const posts = await PostModel.find({
      noOfLikes: { $gt: 5 },
      noOfComments: { $gt: 5 },
      isDeleted: false,
      isFlaggedRemoved: false,
    })
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "userId",
        select: "username profilePicture",
      });
    return { count, posts };
  }

  async findFlaggedPosts(
    skip: number,
    limit: number
  ): Promise<{
    count: number;
    pendingCount: number;
    resolvedCount: number;
    posts: IPost[];
  }> {
    const count = await PostModel.find({
      $or: [
        { isFlagged: true },
        { isFlaggedResolved: true },
        { isFlaggedRemoved: true },
      ],
      isDeleted: false,
    }).countDocuments();
    const pendingCount = await PostModel.find({
      isFlagged: true,
      isDeleted: false,
    }).countDocuments();
    const resolvedCount = await PostModel.find({
      isFlaggedResolved: true,
      isDeleted: false,
    }).countDocuments();
    const posts = await PostModel.find({
      $or: [
        { isFlagged: true },
        { isFlaggedResolved: true },
        { isFlaggedRemoved: true },
      ],
      isDeleted: false,
    })
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(limit);
    return { count, pendingCount, resolvedCount, posts };
  }

  async findByUserAddress(
    userAddress: IPoint,
    skip: number,
    limit: number
  ): Promise<{ count: number; posts: IPost[] }> {
    const posts = await PostModel.find({
      geoAddress: {
        $near: {
          $geometry: userAddress,
          $maxDistance: 20000, // Distance in meters
        },
      },
      isDeleted: false,
      isFlaggedRemoved: false,
    })
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "userId",
        select: "username profilePicture",
      });
    return { count: posts.length, posts };
  }

  async findAll(
    skip: number,
    limit: number
  ): Promise<{ count: number; posts: IPost[] }> {
    const count = await PostModel.find({
      isDeleted: false,
      isFlagged: false,
      isFlaggedRemoved: false,
    }).countDocuments();
    const posts = await PostModel.find({
      isDeleted: false,
      isFlaggedRemoved: false,
    })
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "userId",
        select: "username profilePicture",
      });
    return { count, posts };
  }

  async incrementLikes(id: Types.ObjectId): Promise<void> {
    await PostModel.findByIdAndUpdate(id, {
      $inc: { noOfLikes: 1 },
    });
  }

  async decrementLikes(id: Types.ObjectId): Promise<IPost[]> {
    return await PostModel.findByIdAndUpdate(id, {
      $inc: { noOfLikes: -1 },
    });
  }

  async incrementComments(postId: Types.ObjectId): Promise<void> {
    await PostModel.findByIdAndUpdate(postId, {
      $inc: { noOfComments: 1 },
    });
  }

  async decrementComments(postId: Types.ObjectId): Promise<IPost[]> {
    return await PostModel.findByIdAndUpdate(postId, {
      $inc: { noOfComments: -1 },
    });
  }

  async findAllIncidents(): Promise<IPost[]> {
    return await PostModel.find({ isIncident: true }).populate({
      path: "userId",
      select: "username profilePicture",
    });
  }
}

export default new PostRepository();
