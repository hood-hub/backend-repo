import { Types } from "mongoose";
import { ICreatePost, IPost, IUpdatePost } from "../interfaces/post";
import { PostModel } from "../models/post";
import { IPoint } from "../interfaces/user";

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

  async findByLikesAndComments(): Promise<IPost[]> {
    return await PostModel.find({
      noOfLikes: { $gt: 5 },
      noOfComments: { $gt: 5 },
      isDeleted: false,
    }).populate({
      path: "userId",
      select: "username profilePicture",
    });
  }

  async findByUserAddress(userAddress: IPoint): Promise<IPost[]> {
    return await PostModel.find({
      geoAddress: {
        $near: {
          $geometry: userAddress,
          $maxDistance: 20000, // Distance in meters
        },
      },
      isDeleted: false,
    }).populate({
      path: "userId",
      select: "username profilePicture",
    });
  }

  async findAll(): Promise<IPost[]> {
    return await PostModel.find({ isDeleted: false }).populate({
      path: "userId",
      select: "username profilePicture",
    });
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
