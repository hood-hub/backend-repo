import { Types } from "mongoose";
import { ICreateUser, IToken, IUser, IUserData } from "../interfaces/user";
import { TokenModel } from "../models/token";

class TokenRepository {
  async create(userId: Types.ObjectId): Promise<IToken> {
    const token = Math.floor(100000 + Math.random() * 900000);
    const savedToken = new TokenModel({
      token,
      userId,
    });
    await savedToken.save();
    return savedToken;
  }
  async findByToken(token: number): Promise<IToken | null> {
    return await TokenModel.findOne({ token, isDeleted: false }).populate(
      "userId"
    );
  }
  async findByUserId(userId: Types.ObjectId): Promise<IToken | null> {
    return await TokenModel.findOne({ userId, isDeleted: false });
  }
}

export default new TokenRepository();
