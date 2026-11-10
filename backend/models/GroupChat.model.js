
import mongoose from "mongoose";
import { MODELS } from "../constants/models.constants.js";

const { Schema, model, Types } = mongoose;

const GroupChatSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    image: {
      type: Types.ObjectId,
      ref: MODELS.MEDIA_ASSET,
    },

    createdBy: {
      type: Types.ObjectId,
      ref: MODELS.USER,
      required: true,
    },

    members: [
      {
        type: Types.ObjectId,
        ref: MODELS.USER,
      },
    ],

    lastMessage: {
      messageId: {
        type: Types.ObjectId,
        ref: MODELS.MESSAGE,
      },

      senderId: {
        type: Types.ObjectId,
        ref: MODELS.USER,
      },

      content: {
        type: String,
        default: "",
      },

      updatedAt: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

GroupChatSchema.index({ members: 1 });
GroupChatSchema.index({ name: "text", description: "text" });

export const GroupChat = model(
  MODELS.GROUP_CHAT,
  GroupChatSchema
);
