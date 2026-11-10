import mongoose from "mongoose";
import { MODELS } from "../constants/models.constants.js";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.USER,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80
    },

    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref:MODELS.MEDIA_ASSET
    },

    cover: {
      type: mongoose.Schema.Types.ObjectId,
      ref:MODELS.MEDIA_ASSET
    },

    phone: {
      type: String,
      trim: true
    },

    bio: {
      type: String,
      maxlength: 500
    },

    country: {
      type: String
    },

    city: {
      type: String
    },

    address: {
      type: String
    },

  },
  {
    timestamps: true
  }
);

export const Profile = mongoose.models.Profile || mongoose.model(MODELS.PROFILE, profileSchema);