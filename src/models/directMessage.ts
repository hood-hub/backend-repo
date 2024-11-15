import mongoose from "mongoose";

const directMessageSchema = new mongoose.Schema(
  {
    firstParty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    secondParty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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

export const DirectMessageModel = mongoose.model(
  "directMessage",
  directMessageSchema
);
