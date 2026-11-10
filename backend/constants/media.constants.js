export const MEMORY_SIZES = Object.freeze({
  ONE_MB:1024*1024,
  ONE_GB:1024*1024*1024
})


export const MEDIA_USAGE_TYPES = Object.freeze({
  THUMBNAIL: "thumbnail",
  BANNER: "banner",
  GALLERY: "gallery",
  AVATAR: "avatar",
  DOCUMENT: "document",
  OTHER: "other",
  AVATAR: "avatar",
  COVER: "cover",
  CHAT_IMAGE: "chatImage",
  CHAT_VIDEO: "chatVideo",
  CHAT_DOCUMENT: "chatDocument",
});

export const MEDIA_USAGE_TYPES_ARRAY = Object.freeze(Object.values(MEDIA_USAGE_TYPES));;


export const DEFAULTS = Object.freeze({
    title: "untitled",
    namespaceParts:"default",
    usageType:MEDIA_USAGE_TYPES.OTHER
})

export const NAMESPACES = Object.freeze({
  AVATAR: "user/profile/avatar",
  COVER: "user/profile/cover",
  CHAT_MEDIA: "chat/media",
});

export const FILE_MAX_SIZES = Object.freeze({
  AVATAR: 5 * MEMORY_SIZES.ONE_MB,
  COVER: 10 * MEMORY_SIZES.ONE_MB,
  CHAT_IMAGE: 15 * MEMORY_SIZES.ONE_MB,
  CHAT_VIDEO: 50 * MEMORY_SIZES.ONE_MB,
  CHAT_DOCUMENT: 20 * MEMORY_SIZES.ONE_MB,
})


export const MAX_SIZE_CAP = 200 * MEMORY_SIZES.ONE_MB;

export const MEDIA_PROVIDERS = Object.freeze({
  LOCAL:"local",
  AWS_S3:"aws-s3",
  CLOUDINARY:"cloudinary"
});

export const MEDIA_PROVIDERS_ARRAY =Object.freeze(Object.values(MEDIA_PROVIDERS));