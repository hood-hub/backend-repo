import { Types } from "mongoose";
import { ICreatePost, IPost, IUpdatePost } from "../interfaces/post";
import PostRepository from "../dataAccess/post";
import ReactionRepository from "../dataAccess/reaction";
import CommentRepository from "../dataAccess/comment";
import { ICreateReaction } from "../interfaces/reaction";
import { ReactionEnum } from "../enum/reaction";
import ErrorMiddleware from "../middleware/error";
import {
  IComment,
  ICreateComment,
  IUpdateComment,
} from "../interfaces/comment";
import { IPoint } from "../interfaces/user";
import UserService from "../services/user";

class PostService {
  async create(data: ICreatePost, userId: Types.ObjectId): Promise<IPost> {
    data = { ...data, userId };
    let post = await PostRepository.create(data);
    return post;
  }

  async update(id: Types.ObjectId, data: IUpdatePost): Promise<IPost> {
    let post = await PostRepository.update(id, data);
    return post;
  }

  async deletePost(userId: Types.ObjectId, id: Types.ObjectId): Promise<IPost> {
    return await PostRepository.delete(userId, id);
  }

  async getOneById(id: Types.ObjectId): Promise<IPost> {
    let post = await PostRepository.findOneById(id);
    return post;
  }

  async getByUser(userId: Types.ObjectId): Promise<IPost[]> {
    return await PostRepository.findOneByUser(userId);
  }

  async getTrending(): Promise<IPost[]> {
    return await PostRepository.findByLikesAndComments();
  }

  async getByUserAddress(userId: Types.ObjectId): Promise<IPost[]> {
    const user = await UserService.getOneUser(userId);
    return await PostRepository.findByUserAddress(user.geoAddress);
  }

  async getAll(): Promise<IPost[]> {
    return await PostRepository.findAll();
  }

  async likePost(data: ICreateReaction): Promise<void> {
    const reaction = await ReactionRepository.findByPostAndUser(
      data.userId,
      data.postId
    );

    // Toggle implementation. Like if no reaction remove like if reaction.
    if (!reaction) {
      await ReactionRepository.create(data);
      await PostRepository.incrementLikes(data.postId);
    }
    if (reaction) {
      await ReactionRepository.delete(data.userId, data.postId);
      await PostRepository.decrementLikes(data.postId);
    }
  }

  // async removeLikeFromPost(
  //   userId: Types.ObjectId,
  //   postId: Types.ObjectId
  // ): Promise<void> {
  //   const reaction = await ReactionRepository.findByPostAndUser(userId, postId);
  //   console.log(reaction);
  //   if (!reaction) {
  //     ErrorMiddleware.errorHandler(
  //       "You must like before you can remove a like!",
  //       400
  //     );
  //   }
  //   if (reaction.type === ReactionEnum.LIKE) {
  //     await ReactionRepository.delete(userId, postId);
  //     await PostRepository.decrementLikes(postId);
  //   }
  // }

  async commentOnPost(data: ICreateComment): Promise<IComment> {
    const post = await this.getOneById(data.postId);
    if (!post) {
      ErrorMiddleware.errorHandler("Post not found!", 404);
    }
    const comment = await CommentRepository.create(data);
    await PostRepository.incrementComments(data.postId);
    return comment;
  }

  async updateComment(
    commentId: Types.ObjectId,
    data: IUpdateComment
  ): Promise<IComment> {
    let post = await CommentRepository.update(commentId, data);
    return post;
  }

  async deleteComment(
    userId: Types.ObjectId,
    postId: Types.ObjectId
  ): Promise<void> {
    await CommentRepository.delete(userId, postId);
    await PostRepository.decrementComments(postId);
  }

  async getCommentsByPost(postId: Types.ObjectId): Promise<IComment[]> {
    return await CommentRepository.findByPost(postId);
  }

  async createIncident(
    data: ICreatePost,
    userId: Types.ObjectId
  ): Promise<IPost> {
    data = { ...data, userId, isIncident: true };
    let post = await PostRepository.create(data);
    return post;
  }

  async getAllIncidents(): Promise<IPost[]> {
    return await PostRepository.findAllIncidents();
  }
}

export default new PostService();
