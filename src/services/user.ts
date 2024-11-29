import { Types } from "mongoose";
import UserRepository from "../dataAccess/user";
import TokenRepository from "../dataAccess/token";
import {
  IChangePassword,
  ICreateUser,
  IEmergencyContact,
  IOnboardUser,
  IToken,
  IUpdateUser,
  IUser,
  IUserData,
} from "../interfaces/user";
import ErrorMiddleware from "../middleware/error";
import { hash, genSalt, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import EmailService from "../services/email";
import { UserModel } from "../models/user";

class UserService {
  async create(data: ICreateUser): Promise<IUserData> {
    let user = await UserRepository.findByEmail(data.email);
    if (user) {
      ErrorMiddleware.errorHandler("User already exists!", 400);
    }

    data.password = await this.hashPassword(data.password);
    const newUser = await UserRepository.create(data);
    // const { password, ...returnedUser } = newUser;

    // Generate, save and send verification token
    const verificationToken = await TokenRepository.create(newUser._id);
    await EmailService.sendVerificationEmail(
      newUser.email,
      verificationToken.token,
      newUser!.firstName
    );
    return newUser;
  }

  async createAdmin(data: ICreateUser): Promise<IUserData> {
    const unhashedPassword = data.password;
    let user = await UserRepository.findByEmail(data.email);
    if (user) {
      ErrorMiddleware.errorHandler("User already exists!", 400);
    }

    data.password = await this.hashPassword(data.password);
    data.isAdmin = true;
    data.isVerified = true;
    const newUser = await UserRepository.create(data);
    // const { password, ...returnedUser } = newUser;

    // Send invitation token
    await EmailService.sendAdminInvitationEmail(
      newUser.email,
      unhashedPassword,
      newUser!.firstName
    );
    return newUser;
  }

  async onboard(data: IOnboardUser, id: Types.ObjectId): Promise<IUserData> {
    const { username, stringAddress, geoAddress } = data;
    let user = await UserModel.findByIdAndUpdate(
      id,
      {
        username,
        stringAddress,
        geoAddress,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    if (!user) {
      ErrorMiddleware.errorHandler("User not found!", 404);
    }

    return user;
  }

  async updateProfile(
    id: Types.ObjectId,
    data: IUpdateUser
  ): Promise<IUserData> {
    let user = await UserRepository.update(id, data);
    if (!user) {
      ErrorMiddleware.errorHandler("User not found!", 404);
    }
    return user;
  }

  async updateEmergencyContact(
    id: Types.ObjectId,
    data: IEmergencyContact
  ): Promise<IUserData> {
    if (data.isPrimary) {
      const user = await this.getOneUser(id);
      if (user.emergencyContact.find((value) => value.isPrimary)) {
        ErrorMiddleware.errorHandler(
          "Primary emergency contact already exists!",
          400
        );
      }
    }

    let user = await UserRepository.updateEmergencyContact(id, data);
    if (!user) {
      ErrorMiddleware.errorHandler("User not found!", 404);
    }
    return user;
  }

  async changePassword(id: Types.ObjectId, data: IChangePassword) {
    const { prevPassword, newPassword } = data;

    const user = await UserRepository.findByIdWithPassword(id);

    if (!user) {
      ErrorMiddleware.errorHandler("User not found!", 404);
    }

    const isPrevPasswordCorrect = await compare(prevPassword, user.password);
    if (!isPrevPasswordCorrect) {
      ErrorMiddleware.errorHandler("Incorrect Password entered!", 403);
    }

    const salt = await genSalt(10);
    let password = await hash(newPassword, salt);

    await UserRepository.changePassword(id, password);
  }

  async verifyUser(token: number, email: string): Promise<IUserData> {
    let user = await UserRepository.findByEmail(email);
    if (!user) {
      ErrorMiddleware.errorHandler("User not found!", 404);
    }
    if (user!.isVerified) {
      ErrorMiddleware.errorHandler("User already verified!", 400);
    }

    const verificationToken = await TokenRepository.findByToken(token);
    console.log(verificationToken);
    if (!verificationToken || verificationToken.token !== token) {
      ErrorMiddleware.errorHandler("Token invalid for this user!", 400);
    }

    user!.isVerified = true;
    verificationToken!.isDeleted = true;
    user!.save();
    verificationToken!.save();
    return user!;
  }

  async resendToken(emailOrUsername: string): Promise<void> {
    let user = await UserRepository.findByEmailOrUsername(emailOrUsername);
    if (!user) {
      ErrorMiddleware.errorHandler("User not found!", 404);
    }

    // Generate, save and send verification token
    const verificationToken = await TokenRepository.create(user!._id);
    await EmailService.sendResetOTPEmail(
      user!.email,
      verificationToken.token,
      user!.firstName
    );
  }

  async forgotPassword(emailOrUsername: string): Promise<void> {
    let user = await UserRepository.findByEmailOrUsername(emailOrUsername);
    if (!user) {
      ErrorMiddleware.errorHandler("User not found!", 404);
    }

    // Generate, save and send verification token
    const resetPasswordToken = await TokenRepository.create(user!._id);
    await EmailService.sendForgotPasswordEmail(
      user!.email,
      resetPasswordToken.token,
      user!.firstName
    );
  }

  async resetPassword(data: any): Promise<void> {
    const { emailOrUsername, newPassword, token } = data;
    let user = await UserRepository.findByEmailOrUsername(emailOrUsername);
    if (!user) {
      ErrorMiddleware.errorHandler("User not found!", 404);
    }

    const resetPasswordToken = await TokenRepository.findByUserId(user!._id);
    if (
      !resetPasswordToken ||
      resetPasswordToken.userId.toString() !== user!._id.toString()
    ) {
      ErrorMiddleware.errorHandler("Token invalid for this user!", 400);
    }

    const hashedPassword = await this.hashPassword(newPassword);

    user!.password = hashedPassword;
    resetPasswordToken!.isDeleted = true;
    user!.save();
    resetPasswordToken!.save();
  }

  async deactivateAdmin(id: Types.ObjectId): Promise<IUserData> {
    let user = await UserRepository.deactivateAdmin(id);
    if (!user) {
      ErrorMiddleware.errorHandler("User not found!", 404);
    }
    return user;
  }

  async getOneUser(id: Types.ObjectId): Promise<IUserData | null> {
    return await UserRepository.findById(id);
  }

  async getNearbyUsers(
    id: Types.ObjectId,
    distance: number
  ): Promise<IUserData[]> {
    const user = await this.getOneUser(id);
    return await UserRepository.findByDistanceFromLocation(
      distance * 1000, // Convert to meters
      user.geoAddress
    );
  }

  async getAllUsers(
    page: number,
    location?: string
  ): Promise<{
    page: number;
    totalPages: number;
    count: number;
    users: IUserData[];
  }> {
    const limit = 20;
    const skip = (page - 1) * limit;
    const usersAndCount = await UserRepository.findAll(skip, limit, location);
    return {
      page,
      totalPages: Math.ceil(usersAndCount.count / limit),
      ...usersAndCount,
    };
  }

  async getAllAdmins(): Promise<IUserData[]> {
    return await UserRepository.findAllAdmins();
  }

  async deletePermanently(id: Types.ObjectId): Promise<IUserData | null> {
    return await UserRepository.deletePermanently(id);
  }

  //   async getOneByEmail(email: string): Promise<IUserData | null> {
  //     return await UserRepository.findByEmail(email);
  //   }

  async isValidPassword(
    inputtedPassword: string,
    savedPassword: string
  ): Promise<boolean> {
    return await compare(inputtedPassword, savedPassword);
  }

  login(data: IUser): string {
    const user = data;

    const jwtPrivateKey = process.env.JWT_SECRET ?? "";
    const token = jwt.sign(
      {
        _id: user._id,
        firstName: user.firstName,
        isVerified: user.isVerified,
        username: user.username,
        lastName: user.lastName,
        email: user.email,
      },
      jwtPrivateKey,
      {
        expiresIn: process.env.JWTTOKENEXPIRESIN
          ? process.env.JWTTOKENEXPIRESIN
          : "600000s",
      }
    );

    return token;
  }

  //   private userObjectWithoutPassword(user: IUser): IUserData {
  //     return {
  //       _id: user._id,
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       username: user.username,
  //       email: user.email,
  //       address: user.address,
  //       createdAt: user.createdAt,
  //       updatedAt: user.createdAt,
  //       verifiedAt: user.verifiedAt,
  //     };
  //   }

  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }
}

export default new UserService();
