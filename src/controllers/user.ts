import { NextFunction, Request, Response } from "express";
import UserService from "../services/user";
import ErrorMiddleware from "../middleware/error";
import passport from "passport";
import { Types } from "mongoose";
import { IUser } from "../interfaces/user";
export default class UserController {
  async signup(req: Request, res: Response): Promise<any> {
    try {
      const user = await UserService.create(req.body);
      return res.status(201).json({
        success: true,
        message: "Email sent successfully!",
        data: user,
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async onboard(req: Request, res: Response): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass user id!",
        });
      }
      const user = await UserService.onboard(
        req.body,
        req.params.id as unknown as Types.ObjectId
      );
      return res.status(201).json({
        success: true,
        message: "User onboarded successfully!",
        data: user,
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async updateProfile(req: Request, res: Response): Promise<any> {
    try {
      const user = await UserService.updateProfile(
        req.body.user._id as unknown as Types.ObjectId,
        req.body
      );
      return res.status(201).json({
        success: true,
        message: "Profile updated successfully!",
        data: user,
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async updateEmergencyContact(req: Request, res: Response): Promise<any> {
    try {
      const { emergencyContact } = req.body;
      const user = await UserService.updateEmergencyContact(
        req.body.user._id as unknown as Types.ObjectId,
        emergencyContact
      );
      return res.status(201).json({
        success: true,
        message: "Emergency Contact updated successfully!",
        data: user,
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async changePassword(req: Request, res: Response): Promise<any> {
    try {
      const user = await UserService.changePassword(
        req.body.user._id as unknown as Types.ObjectId,
        req.body
      );
      return res.status(201).json({
        success: true,
        message: "Password updated successfully!",
        data: user,
      });
    } catch (ex) {
      console.log(ex);
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async verifyUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { token, email } = req.body;
      if (!token || !email) {
        return res.status(400).json({
          success: false,
          message: "Kindly enter token and email!",
        });
      }
      const user = await UserService.verifyUser(token, email);
      return res.status(200).json({
        success: true,
        message: "User verified successfully!",
        data: user,
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async resendVerificationToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { emailOrUsername } = req.body;
      if (!emailOrUsername) {
        return res.status(400).json({
          success: false,
          message: "Kindly enter email/username!",
        });
      }
      const user = await UserService.resendToken(emailOrUsername);
      return res.status(200).json({
        success: true,
        message: "Token sent successfully!",
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { emailOrUsername } = req.body;
      if (!emailOrUsername) {
        return res.status(400).json({
          success: false,
          message: "Kindly enter email/username!",
        });
      }
      const user = await UserService.forgotPassword(emailOrUsername);
      return res.status(200).json({
        success: true,
        message: "Verification email sent successfully!",
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { token } = req.body;
      if (!token) {
        return res.status(400).json({
          success: false,
          message: "Kindly enter token!",
        });
      }
      const user = await UserService.resetPassword(req.body);
      return res.status(200).json({
        success: true,
        message: "Password reset successfully!",
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async getOneUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass user id!",
        });
      }
      const user = await UserService.getOneUser(
        req.params.id as unknown as Types.ObjectId
      );
      return res.status(200).json({
        success: true,
        message: "User retrieved successfully!",
        data: user,
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async getNearbyUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const distance = req.query.distance ? Number(req.query.distance) : 20;
      const users = await UserService.getNearbyUsers(
        req.body.user._id as unknown as Types.ObjectId,
        distance
      );
      return res.status(200).json({
        success: true,
        message: "Users retrieved successfully!",
        data: users,
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async deletePermanently(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Kindly pass user id!",
        });
      }
      const user = await UserService.deletePermanently(
        req.params.id as unknown as Types.ObjectId
      );
      return res.status(200).json({
        success: true,
        message: "User deleted successfully!",
        data: user,
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    // try {
    //   passport.authenticate("local", function (err, user, info) {
    //     if (err) {
    //       return next(err);
    //     }
    //     console.log(user);
    //     if (!user) {
    //       res.status(404).json({
    //         success: "fail",
    //         statusCode: 404,
    //         message: info.message,
    //       });
    //       res.end(info.message);
    //       return;
    //     }
    //     UserService.login(user);
    //   })(req, res, next);
    // } catch (ex) {
    //   ErrorMiddleware.serverError(res, ex);
    // }

    passport.authenticate(
      "local",
      async function (err: any, user: any, info: any) {
        if (err) {
          return next(err); // Pass error to the next middleware if any error occurs
        }

        // Check if user was found
        if (!user) {
          return res.status(404).json({
            success: "fail",
            statusCode: 404,
            message: info.message,
          });
        }

        try {
          // Call login logic
          const token = UserService.login(user); // Ensure UserService.login is awaited if asynchronous

          // Return success response (optional depending on your use case)
          res.status(200).json({
            success: "success",
            statusCode: 200,
            message: "User successfully logged in",
            data: token,
          });
        } catch (loginError) {
          // Catch any error that might occur in UserService.login
          return next(loginError);
        }
      }
    )(req, res, next);
  }

  async googleLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const token = UserService.login(req.user as unknown as IUser);
    res.status(200).json({
      success: "success",
      statusCode: 200,
      message: "User successfully logged in",
      data: token,
    });
  }

  async logout(req: Request, res: Response): Promise<any> {
    res.removeHeader("Authorization");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }
}
