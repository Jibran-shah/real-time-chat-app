import Joi from "joi";
import { mongoIdSchema } from "../../validationSchemas/mongodb.schemas.js";

export const createContactSchema = Joi.object({
  username: Joi.string().trim().optional(),
  phoneNo: Joi.string().trim().optional(),
  savedName: Joi.string().trim().max(100).optional(),
});

export const updateContactSchema = Joi.object({
  savedName: Joi.string().trim().max(100).required(),
});

export const paramsContactIdSchema = Joi.object({
  contactId: mongoIdSchema.required().label("contactId"),
});