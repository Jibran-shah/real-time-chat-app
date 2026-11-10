import multer from "multer";
import { BadRequestError } from "../errors/index.js";
import { MAX_SIZE_CAP } from "../constants/media.constants.js";
import { validateFile } from "../utils/media/media.validators.js";
import { normalizeFiles } from "../utils/media/media.normalizers.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE_CAP },
});

/**
 * Creates a multipart file upload middleware.
 *
 * @param {Object} options
 * @param {Array<Object>} options.fields - File field configurations.
 * @param {string} options.fields[].name - Multipart field name.
 * @param {number} [options.fields[].maxCount=10] - Maximum number of files allowed for this field.
 * @param {boolean} [options.fields[].required=false] - Whether at least one file is required.
 * @param {number} [options.fields[].maxSize] - Maximum allowed file size for this field.
 * @param {string[]} [options.fields[].types] - Allowed MIME types.
 *
 * @returns {import("express").RequestHandler}
 *
 * @description
 * - Skips processing if the request is not multipart/form-data.
 * - Parses uploaded files using Multer memory storage.
 * - Validates each file against its field configuration.
 * - Normalizes validated files.
 * - Stores normalized files in `req.media`, grouped by field name.
 * - Throws BadRequestError when a required file field is empty.
 */
export const createUpload = ({ fields = [] } = {}) => {
  return (req, res, next) => {
    if (!req.is("multipart/form-data")) return next();

    upload.fields(
      fields.map(({ name, maxCount = 10 }) => ({ name, maxCount }))
    )(req, res, (err) => {
      if (err) return next(err);

      try {
        req.media = {};

        for (const field of fields) {
          const files = req.files?.[field.name] || [];

          files.forEach((file) => validateFile(file, field));

          const normalized = normalizeFiles(files);

          if (field.required && !normalized.length) {
            throw new BadRequestError(`${field.name} is required`);
          }

          req.media[field.name] = normalized;
        }

        next();
      } catch (error) {
        next(error);
      }
    });
  };
};


export const parseMultipartJson = (fields = []) => {
  return (req, res, next) => {
    try {
      if (!req.is("multipart/form-data")) return next();

      fields.forEach((field) => {
        const value = req.body[field];

        if (typeof value === "string") {
          req.body[field] = JSON.parse(value);
        }
      });

      next();
    } catch (error) {
      next(error);
    }
  };
};