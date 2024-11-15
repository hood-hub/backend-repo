import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    content: {
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
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "group",
    },
    directMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "directMessage",
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

export const MessageModel = mongoose.model("message", messageSchema);
