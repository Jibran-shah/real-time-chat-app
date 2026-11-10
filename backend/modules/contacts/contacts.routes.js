import express from "express";

import {
  createContact,
  getUserContacts,
  updateContact,
  deleteContact,
} from "./contacts.controller.js";

import {
  createContactSchema,
  updateContactSchema,
  paramsContactIdSchema,
} from "./contacts.validation.js";

import { validate } from "../../middlewares/validate.middleware.js";
import { protect } from "../../middlewares/protect.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = express.Router();

router.use(protect({ profile: true }));

router.post(
  "/",
  validate(createContactSchema, "body"),
  asyncHandler(createContact)
);

router.get(
  "/",
  asyncHandler(getUserContacts)
);

router.patch(
  "/:contactId",
  validate(paramsContactIdSchema, "params"),
  validate(updateContactSchema, "body"),
  asyncHandler(updateContact)
);

router.delete(
  "/:contactId",
  validate(paramsContactIdSchema, "params"),
  asyncHandler(deleteContact)
);

export default router;