import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
    },
    description: {
      type: String,
      required: true,
      minLength: 2,
    },
    visibility: {
      type: String,
      required: true,
      enum: ["public", "private"],
    },
    noOfMembers: {
      type: Number,
      required: true,
      default: 1,
    },
    groupImage: {
      type: String,
    },
    groupRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    createdBy: {
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

export const GroupModel = mongoose.model("group", groupSchema);
