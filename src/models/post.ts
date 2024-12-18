import mongoose from "mongoose";
import { pointSchema } from "./user";

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      minLength: 2,
    },
    media: [
      {
        type: String,
        required: true,
        minLength: 2,
      },
    ],
    noOfLikes: {
      type: Number,
      default: 0,
    },
    noOfComments: {
      type: Number,
      default: 0,
    },
    stringAddress: {
      type: String,
      required: true,
    },
    geoAddress: {
      type: pointSchema,
      index: "2dsphere",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isIncident: {
      type: Boolean,
      default: false,
    },
    isFlagged: {
      type: Boolean,
      default: false,
    },
    isFlaggedRemoved: {
      type: Boolean,
      default: false,
    },
    isFlaggedResolved: {
      type: Boolean,
      default: false,
    },
    flagReason: {
      type: String,
    },
    flaggedAt: {
      type: Date,
    },
    removedAt: {
      type: Date,
    },
    resolvedAt: {
      type: Date,
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

postSchema.index({ geoAddress: "2dsphere" });
export const PostModel = mongoose.model("post", postSchema);
