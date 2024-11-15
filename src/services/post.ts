import { Types } from "mongoose";
import {
  BLACKLISTED_WORDS_FOR_POSTS,
  ICreatePost,
  IPost,
  IUpdatePost,
} from "../interfaces/post";
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
    // Check if post should be flagged.
    const wordsInPost = data.text.split(/[ ,!.-]+/);
    console.log("worsInPost:", wordsInPost);
    const flaggableWords = wordsInPost.filter((word) =>
      BLACKLISTED_WORDS_FOR_POSTS.includes(word)
    );
    console.log("flaggable:", flaggableWords);
    if (flaggableWords.length > 0) {
      data.isFlagged = true;
      data.flaggedAt = new Date();
      data.flagReason = "Violates Community Rules";
    }
    data = { ...data, userId };
    let post = await PostRepository.create(data);

    return post;
  }

  async update(id: Types.ObjectId, data: IUpdatePost): Promise<IPost> {
    let post = await PostRepository.update(id, data);
    return post;
  }

  async removeFlaggedPost(
    id: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<IPost> {
    let post = await PostRepository.removeFlaggedPost(id, userId);
    return post;
  }

  async resolveFlaggedPost(id: Types.ObjectId): Promise<IPost> {
    let post = await PostRepository.resolveFlaggedPost(id);
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

  async getTrending(page: number): Promise<{
    page: number;
    totalPages: number;
    count: number;
    posts: IPost[];
  }> {
    const limit = 20;
    const skip = (page - 1) * limit;
    const postsAndCount = await PostRepository.findByLikesAndComments(
      skip,
      limit
    );
    return {
      page,
      totalPages: Math.ceil(postsAndCount.count / limit),
      ...postsAndCount,
    };
  }

  async getByUserAddress(
    userId: Types.ObjectId,
    page: number
  ): Promise<{
    page: number;
    totalPages: number;
    count: number;
    posts: IPost[];
  }> {
    const user = await UserService.getOneUser(userId);
    const limit = 20;
    const skip = (page - 1) * limit;
    const postsAndCount = await PostRepository.findByUserAddress(
      user.geoAddress,
      skip,
      limit
    );
    return {
      page,
      totalPages: Math.ceil(postsAndCount.count / limit),
      ...postsAndCount,
    };
  }

  async getFlaggedPosts(page: number): Promise<{
    page: number;
    totalPages: number;
    count: number;
    pendingCount: number;
    resolvedCount: number;
    posts: IPost[];
  }> {
    const limit = 20;
    const skip = (page - 1) * limit;
    const postsAndCount = await PostRepository.findFlaggedPosts(skip, limit);
    return {
      page,
      totalPages: Math.ceil(postsAndCount.count / limit),
      ...postsAndCount,
    };
  }

  async getAll(page: number): Promise<{
    page: number;
    totalPages: number;
    count: number;
    posts: IPost[];
  }> {
    const limit = 20;
    const skip = (page - 1) * limit;
    const postsAndCount = await PostRepository.findAll(skip, limit);
    return {
      page,
      totalPages: Math.ceil(postsAndCount.count / limit),
      ...postsAndCount,
    };
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
