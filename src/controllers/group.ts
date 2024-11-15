import { NextFunction, Request, Response } from "express";
import GroupService from "../services/group";
import ErrorMiddleware from "../middleware/error";
import { Types } from "mongoose";

export default class GroupController {
  async createGroup(req: Request, res: Response): Promise<any> {
    try {
      const { user, ...data } = req.body;
      data.createdBy = user._id;
      data.admins = [user._id];
      data.members = [user._id];
      const group = await GroupService.create(data);
      return res.status(201).json({
        success: true,
        message: "Group created successfully!",
        data: group,
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
          message: "Kindly pass group id!",
        });
      }
      const { user, ...data } = req.body;

      const group = await GroupService.update(
        req.params.id as unknown as Types.ObjectId,
        data
      );
      return res.status(200).json({
        success: true,
        message: "Group updated successfully!",
        data: group,
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async requestToJoinPrivateGroup(req: Request, res: Response): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass group id!",
        });
      }

      await GroupService.requestToJoinPrivateGroup(
        req.params.id as unknown as Types.ObjectId,
        req.body.user._id
      );
      return res.status(200).json({
        success: true,
        message: "Request sent successfully!",
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async getGroupRequests(req: Request, res: Response): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass group id!",
        });
      }

      const group = await GroupService.getGroupRequests(
        req.params.id as unknown as Types.ObjectId
      );
      return res.status(200).json({
        success: true,
        message: "Requests retrieved successfully!",
        data: group,
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async approveRequestToJoinPrivateGroup(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass group id!",
        });
      }

      const group = await GroupService.approveRequestToJoinPrivateGroup(
        req.params.id as unknown as Types.ObjectId,
        req.body.user._id
      );
      return res.status(200).json({
        success: true,
        message: "User added successfully!",
        data: group,
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async addGroupMembers(req: Request, res: Response): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass group id!",
        });
      }
      const { user, ...data } = req.body;

      const group = await GroupService.addGroupMembers(
        req.params.id as unknown as Types.ObjectId,
        data.userIds
      );
      return res.status(200).json({
        success: true,
        message: "Members added successfully!",
        data: group,
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async addAdmin(req: Request, res: Response): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass group id!",
        });
      }
      const { user, ...data } = req.body;

      const group = await GroupService.addAdmin(
        req.params.id as unknown as Types.ObjectId,
        data.userId
      );
      return res.status(200).json({
        success: true,
        message: "Admins added successfully!",
        data: group,
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async deleteGroup(req: Request, res: Response): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass Group id!",
        });
      }

      await GroupService.deleteGroup(
        req.body.user._id,
        req.params.id as unknown as Types.ObjectId
      );
      return res.status(200).json({
        success: true,
        message: "Group deleted successfully!",
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async getGroupById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass Group id!",
        });
      }
      const group = await GroupService.getOneById(
        req.params.id as unknown as Types.ObjectId
      );
      return res.status(200).json({
        success: true,
        message: "Group retrieved successfully!",
        data: group,
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async getGroupMembers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass Group id!",
        });
      }
      const members = await GroupService.getGroupMembers(
        req.params.id as unknown as Types.ObjectId
      );
      return res.status(200).json({
        success: true,
        message: "Group members retrieved successfully!",
        data: members,
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async getAllGroups(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const page = req.query.page ? req.query.page : 1;
      const groups = await GroupService.getAllGroups(page as unknown as number);
      return res.status(200).json({
        success: true,
        message: "Groups retrieved successfully!",
        data: groups,
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  }
}
