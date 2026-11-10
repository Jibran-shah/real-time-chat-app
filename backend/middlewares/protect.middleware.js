import { verifyAccessToken } from "../utils/token.utils.js";
import { UnauthorizedError, ForbiddenError } from "../errors/index.js";

export const protect = ({} = {}) => {
  return (req, res, next) => {
    try {

      const token =
        req.cookies?.accessToken ||
        req.headers?.authorization?.split(" ")[1];
      if (!token) {
        return next(new UnauthorizedError("Access token missing"));
      }

      const payload = verifyAccessToken(token);
      req.user = {
        id: payload.id,
        profile: payload.profile || null,
      };
      next();
    } catch (err) {
      next(err);
    }
  };
};


export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ForbiddenError("Access forbidden: insufficient permissions")
      );
    }
    next();
  };
};