import mongoose from "mongoose";
import Joi from "joi";

export const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number, Number],
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
    },
    email: {
      type: String,
      minLength: 2,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      minLength: 2,
    },
    password: {
      type: String,
      minLength: 8,
    },
    noOfFlags: {
      type: Number,
      default: 0,
    },
    stringAddress: {
      type: String,
    },
    geoAddress: {
      type: pointSchema,
      index: "2dsphere",
    },
    profilePicture: {
      type: String,
    },
    emergencyContact: [
      {
        type: Object,
      },
    ],
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "group",
        required: true,
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ geoAddress: "2dsphere" });
export const UserModel =
  mongoose.models.user || mongoose.model("user", userSchema);
