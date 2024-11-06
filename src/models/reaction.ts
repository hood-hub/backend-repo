import mongoose from "mongoose";
import { ReactionEnum } from "../enum/reaction";

const reactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["like", "unlike"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const ReactionModel = mongoose.model("reaction", reactionSchema);
