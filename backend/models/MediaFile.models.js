import mongoose from "mongoose";
import { MEDIA_PROVIDERS, MEDIA_PROVIDERS_ARRAY } from "../constants/media.constants.js";
import { MODELS } from "../constants/models.constants.js";

const mediaFileSchema = new mongoose.Schema(
  {

    provider: {
      name: {
        type: String,
        enum: MEDIA_PROVIDERS_ARRAY,
        default: MEDIA_PROVIDERS.LOCAL,
        index: true
      },
      bucket: String,
      region: String
    },

    fileName: {
      type: String,
      required: true,
      trim: true
    },


    storageKey: {
      type: String,
      required: true,
      unique: true,
      index: true
    },


    url: {
      type: String,
      required: true,
      trim: true
    },


    mimeType: {
      type: String,
      required: true,
      index: true
    },


    format: {
      type: String,
      required: true,
      index: true
    },

    size: {
      type: Number,
      required: true
    },

    hash: {
      type: String,
      required: true,
      index: true
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.USER,
      required:true,
      index: true
    },

    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
      index: true
    },

    refCount: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },
  },
  { timestamps: true }
);

mediaFileSchema.index({ uploadedBy: 1, createdAt: -1 });

export const MediaFile = mongoose.model(MODELS.MEDIA_FILE, mediaFileSchema);