import { NextFunction, Request, Response } from "express";
import PostService from "../services/post";
import ErrorMiddleware from "../middleware/error";
import passport from "passport";
import { Types } from "mongoose";
import { ReactionEnum } from "../enum/reaction";
import { IComment, ICreateComment } from "../interfaces/comment";

export default class PostController {
  async createPost(req: Request, res: Response): Promise<any> {
    try {
      const { user, ...data } = req.body;
      const post = await PostService.create(data, req.body.user._id);
      return res.status(201).json({
        success: true,
        message: "Post created successfully!",
        data: post,
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass post id!",
        });
      }
      const { user, ...data } = req.body;

      const post = await PostService.update(
        req.params.id as unknown as Types.ObjectId,
        data
      );
      return res.status(200).json({
        success: true,
        message: "Post updated successfully!",
        data: post,
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async deletePost(req: Request, res: Response): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass post id!",
        });
      }

      await PostService.deletePost(
        req.body.user._id,
        req.params.id as unknown as Types.ObjectId
      );
      return res.status(200).json({
        success: true,
        message: "Post deleted successfully!",
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async likePost(req: Request, res: Response): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass post id!",
        });
      }
      const data = {
        type: ReactionEnum.LIKE,
        postId: req.params.id as unknown as Types.ObjectId,
        userId: req.body.user._id,
      };

      await PostService.likePost(data);
      return res.status(200).json({
        success: true,
        message: "Post liked successfully!",
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  // async removeLikeFromPost(req: Request, res: Response): Promise<any> {
  //   try {
  //     if (!req.params.id) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Kindly pass post id!",
  //       });
  //     }

  //     await PostService.removeLikeFromPost(
  //       req.body.user._id,
  //       req.params.id as unknown as Types.ObjectId
  //     );
  //     return res.status(200).json({
  //       success: true,
  //       message: "Post unliked successfully!",
  //     });
  //   } catch (ex) {
  //     console.log(ex);
  //     ErrorMiddleware.serverError(res, ex);
  //   }
  // }

  async commentOnPost(req: Request, res: Response): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass post id!",
        });
      }
      const data: ICreateComment = {
        body: req.body.body,
        postId: req.params.id as unknown as Types.ObjectId,
        userId: req.body.user._id,
      };

      const comment = await PostService.commentOnPost(data);
      return res.status(201).json({
        success: true,
        message: "Comment created successfully!",
        data: comment,
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async updateComment(req: Request, res: Response): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass comment id!",
        });
      }
      const { user, ...data } = req.body;

      const comment = await PostService.updateComment(
        req.params.id as unknown as Types.ObjectId,
        data
      );
      return res.status(200).json({
        success: true,
        message: "Comment updated successfully!",
        data: comment,
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async deleteComment(req: Request, res: Response): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass comment id!",
        });
      }

      await PostService.deleteComment(
        req.body.user._id,
        req.params.id as unknown as Types.ObjectId
      );
      return res.status(200).json({
        success: true,
        message: "Comment deleted successfully!",
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async getCommentsByPost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass post id!",
        });
      }
      const comments = await PostService.getCommentsByPost(
        req.params.id as unknown as Types.ObjectId
      );
      return res.status(200).json({
        success: true,
        message: "Comments retrieved successfully!",
        data: comments,
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async getPostById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass post id!",
        });
      }
      const post = await PostService.getOneById(
        req.params.id as unknown as Types.ObjectId
      );
      return res.status(200).json({
        success: true,
        message: "Post retrieved successfully!",
        data: post,
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async getByUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const posts = await PostService.getByUser(req.body.user._id);
      return res.status(200).json({
        success: true,
        message: "Posts retrieved successfully!",
        data: posts,
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async getTrending(req: Request, res: Response): Promise<any> {
    try {
      const posts = await PostService.getTrending();
      return res.status(200).json({
        success: true,
        message: "Posts retrieved successfully!",
        data: posts,
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async getByUserAddress(req: Request, res: Response): Promise<any> {
    try {
      const posts = await PostService.getByUserAddress(req.body.user._id);
      return res.status(200).json({
        success: true,
        message: "Posts retrieved successfully!",
        data: posts,
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async getAll(req: Request, res: Response): Promise<any> {
    try {
      const posts = await PostService.getAll();
      return res.status(200).json({
        success: true,
        message: "Posts retrieved successfully!",
        data: posts,
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async createIncident(req: Request, res: Response): Promise<any> {
    try {
      const { user, ...data } = req.body;
      const incident = await PostService.createIncident(
        data,
        req.body.user._id
      );
      return res.status(201).json({
        success: true,
        message: "Incident created successfully!",
        data: incident,
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async getAllIncidents(req: Request, res: Response): Promise<any> {
    try {
      const incidents = await PostService.getAllIncidents();
      return res.status(200).json({
        success: true,
        message: "Incidents retrieved successfully!",
        data: incidents,
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }
}
