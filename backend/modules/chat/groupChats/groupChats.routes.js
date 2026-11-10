
import { Router } from "express";

import {
  createGroupChat,
  getUserGroups,
  getGroupById,
  addMembers,
  removeMember,
  leaveGroup,
  updateGroupInfo,
  deleteGroup,
} from "./groupChats.controller.js";

import {
  createGroupSchema,
  updateGroupSchema,
  addMembersSchema,
  removeMemberSchema,
} from "./groupChats.validation.js";

import { protect } from "../../../middlewares/protect.middleware.js";
import { validate } from "../../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

import {
  createUpload,
  parseMultipartJson,
} from "../../../middlewares/multipart.middleware.js";

import { mediaContext } from "../../../middlewares/mediaContext.middlware.js";

import {
  MEDIA_USAGE_TYPES,
  NAMESPACES,
} from "../../../constants/media.constants.js";

const router = Router();

router.use(protect());

const groupUpload = createUpload({
  fields: [
    {
      name: "image",
      maxCount: 1,
      types: ["image/jpeg", "image/png", "image/webp"],
    },
  ],
});

/*
=====================================================
CREATE GROUP
=====================================================
*/
router.post(
  "/",
  groupUpload,
  parseMultipartJson(["members"]),
  mediaContext({
    fields: {
      image: {
        usageType: MEDIA_USAGE_TYPES.CHAT_IMAGE,
        namespace: NAMESPACES.AVATAR,
      },
    },
  }),
  validate(createGroupSchema),
  asyncHandler(createGroupChat)
);

/*
=====================================================
GET USER GROUPS
=====================================================
*/
router.get(
  "/",
  asyncHandler(getUserGroups)
);

/*
=====================================================
GET GROUP BY ID
=====================================================
*/
router.get(
  "/:groupId",
  asyncHandler(getGroupById)
);

/*
=====================================================
ADD MEMBERS
=====================================================
*/
router.post(
  "/:groupId/members",
  validate(addMembersSchema),
  asyncHandler(addMembers)
);

/*
=====================================================
REMOVE MEMBER
=====================================================
*/
router.delete(
  "/:groupId/members",
  validate(removeMemberSchema),
  asyncHandler(removeMember)
);

/*
=====================================================
LEAVE GROUP
=====================================================
*/

router.post(
  "/:groupId/leave",
  asyncHandler(leaveGroup)
);

/*
=====================================================
UPDATE GROUP
=====================================================
*/
router.patch(
  "/:groupId",
  groupUpload,
  mediaContext({
    fields: {
      image: {
        usageType: MEDIA_USAGE_TYPES.CHAT_IMAGE,
        namespace: NAMESPACES.AVATAR,
      },
    },
  }),
  validate(updateGroupSchema),
  asyncHandler(updateGroupInfo)
);

router.delete(
  "/:groupId",
  asyncHandler(deleteGroup)
);

export default router;
