import "./env.js";

import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import connectDB from "./config/db.js";
import "./config/redis.js";

import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { requestIdMiddleware } from "./middlewares/requestId.middleware.js";
import { httpLogger } from "./middlewares/httpLogger.middleware.js";
import { logger } from "./config/logger.js";
import { globalRateLimiter } from "./rateLimitors.js";
import { BASE_ROOT } from "./constants/app.constants.js";
import authRoutes from "./modules/authentication/auth.routes.js";
import mediaFileRoutes from "./modules/media/files/files.routes.js";
import mediaAssetRoutes from "./modules/media/assets/assets.routes.js";
import profileRoutes from "./modules/profiles/profiles.routes.js";
import directChatRoutes from "./modules/chat/directChat/directChat.routes.js";
import groupChatRoutes from "./modules/chat/groupChats/groupChats.routes.js";
import messagesRoutes from "./modules/chat/messages/messages.routes.js";
import contactsRoutes from "./modules/contacts/contacts.routes.js"

// ================= APP =================
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);


app.options(/.*/, cors());
app.set('trust proxy', 1);

// ================= START SERVER =================
const startServer = async () => {
  try {
    await connectDB();

    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(requestIdMiddleware);
    app.use(httpLogger);
    app.use(globalRateLimiter);

    app.use(
      "/uploads",
      express.static(path.join(process.cwd(), "uploads"))
    );

    app.use(BASE_ROOT + "/auth", authRoutes);
    app.use(BASE_ROOT + "/chat/direct", directChatRoutes);
    app.use(BASE_ROOT + "/chat/group", groupChatRoutes);
    app.use(BASE_ROOT + "/messages", messagesRoutes);
    app.use(BASE_ROOT + "/media/files", mediaFileRoutes);
    app.use(BASE_ROOT + "/media/assets", mediaAssetRoutes);
    app.use(BASE_ROOT + "/profiles", profileRoutes);
    app.use(BASE_ROOT + "/contacts", contactsRoutes);

    app.get("/", (req, res) => {
      res.send("API Running");
    });

    app.use(errorHandler);

  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

startServer();

export default app;