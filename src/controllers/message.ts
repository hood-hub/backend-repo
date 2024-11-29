import { NextFunction, Request, Response } from "express";
import MessageService from "../services/message";
import ErrorMiddleware from "../middleware/error";
import { Types } from "mongoose";

export default class MessageController {
  async createMessage(req: Request, res: Response): Promise<any> {
    try {
      const { user, ...data } = req.body;
      const message = await MessageService.create(data, req.body.user._id);
      return res.status(201).json({
        success: true,
        message: "Message created successfully!",
        data: message,
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async createDirectMessage(req: Request, res: Response): Promise<any> {
    try {
      const { user, ...data } = req.body;
      const message = await MessageService.createDirectMessage(data);
      return res.status(201).json({
        success: true,
        message: "Message channel created successfully!",
        data: message,
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  //   async update(req: Request, res: Response): Promise<any> {
  //     try {
  //       if (!req.params.id) {
  //         return res.status(400).json({
  //           success: false,
  //           message: "Kindly pass Message id!",
  //         });
  //       }
  //       const { user, ...data } = req.body;

  //       const post = await PostService.update(
  //         req.params.id as unknown as Types.ObjectId,
  //         data
  //       );
  //       return res.status(200).json({
  //         success: true,
  //         message: "Post updated successfully!",
  //         data: post,
  //       });
  //     } catch (ex) {
  //       console.log(ex);
  //       ErrorMiddleware.serverError(res, ex);
  //     }
  //   }

  //   async deletePost(req: Request, res: Response): Promise<any> {
  //     try {
  //       if (!req.params.id) {
  //         return res.status(400).json({
  //           success: false,
  //           message: "Kindly pass post id!",
  //         });
  //       }

  //       await PostService.deletePost(
  //         req.body.user._id,
  //         req.params.id as unknown as Types.ObjectId
  //       );
  //       return res.status(200).json({
  //         success: true,
  //         message: "Post deleted successfully!",
  //       });
  //     } catch (ex) {
  //       console.log(ex);
  //       ErrorMiddleware.serverError(res, ex);
  //     }
  //   }

  async getByGroup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass group id!",
        });
      }
      const page = req.query.page ? req.query.page : 1;
      const messages = await MessageService.getByGroup(
        req.params.id as unknown as Types.ObjectId,
        page as unknown as number
      );
      return res.status(200).json({
        success: true,
        message: "Messages retrieved successfully!",
        data: messages,
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async getByDirectMessage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass direct message id!",
        });
      }
      const page = req.query.page ? req.query.page : 1;
      const messages = await MessageService.getByDirectMessage(
        req.params.id as unknown as Types.ObjectId,
        page as unknown as number
      );
      return res.status(200).json({
        success: true,
        message: "Messages retrieved successfully!",
        data: messages,
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async getMessageById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass message id!",
        });
      }
      const message = await MessageService.getOneById(
        req.params.id as unknown as Types.ObjectId
      );
      return res.status(200).json({
        success: true,
        message: "Message retrieved successfully!",
        data: message,
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async getDirectMessagesForUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const page = req.query.page ? req.query.page : 1;
      const dms = await MessageService.getDirectMessagesForUser(
        req.body.user._id as unknown as Types.ObjectId,
        page as unknown as number
      );
      return res.status(200).json({
        success: true,
        message: "Direct Messages retrieved successfully!",
        data: dms,
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  }
}
