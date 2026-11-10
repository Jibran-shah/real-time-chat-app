import { AppError } from "../../../errors/App.error.js";
import { NotFoundError, UnauthorizedError } from "../../../errors/Http.error.js";
import { DirectChat } from "../../../models/DirectChat.model.js";
import { directChatDeepPopulate } from "../../../populates/index.js";
import { roomStore } from "../../../realtime/utils/room.store.js";
import { toStr } from "../../../utils/string.utils.js";
import { Contact } from "../../../models/Contact.model.js";


export const createDirectChat = async ({ user,contactId }) => {
  const u1 = user.id;
  const contact = await Contact.findById(contactId)
  const u2Id = contact.contact;
  let existingChat = await DirectChat.findOne({
    participants: { $all: [u1, u2Id], $size: 2 },
    isDeleted: false,
  });

  if (existingChat) {
    const deletedFor = existingChat.deletedFor?.map(toStr) || [];
    const needsRestore =
      deletedFor.includes(u1) || deletedFor.includes(u2Id);
    if (needsRestore) {
      existingChat.deletedFor = existingChat.deletedFor.filter(
        (id) => ![u1, u2Id].includes(toStr(id))
      );
      await existingChat.save();
    }

    await existingChat.populate({
      path: "participants",
      select: "profile",
      populate: {
        path: "profile",
        select: "name avatar",
        populate: {
          path: "avatar",
          select: "file",
          populate: {
            path: "file",
            select: "url",
          },
        },
      },
    });

    return existingChat;
  }

  const chat = await DirectChat.create({
    participants: [u1, u2Id],
  });

  await roomStore.create({
    roomId: chat._id.toString(),
    type: "DIRECT_CHAT",
    members: [u1, u2Id],
  });

  await chat.populate({
    path: "participants",
    select: "profile",
    populate: {
      path: "profile",
      select: "name avatar",
      populate: {
        path: "avatar",
        select: "file",
        populate: {
          path: "file",
          select: "url",
        },
      },
    },
  });

  return chat;
};

export const getDirectChat = async (chatId, userId) => {
  const uid = toStr(userId);

  const chat = await DirectChat.findById(chatId);

  if (!chat || chat.isDeleted) {
    throw new NotFoundError("Direct chat not found", 404);
  }

  const participants = chat.participants.map(toStr);
  const deletedFor = chat.deletedFor?.map(toStr) || [];

  // 1. must be participant
  if (!participants.includes(uid)) {
    throw new UnauthorizedError("Not part of this chat");
  }

  // 2. user deleted chat
  if (deletedFor.includes(uid)) {
    throw new NotFoundError("Chat not available");
  }

  // 3. blocked check
  if (chat.blockedBy?.toString() === uid) {
    throw new UnauthorizedError("Chat blocked");
  }

  const members = await roomStore.getMembers(chatId);

  if (!members?.length) {
    await roomStore.create({
      roomId: chat._id.toString(),
      type: "DIRECT_CHAT",
      members: participants
    });
  }

  return chat.populate(directChatDeepPopulate);
};

/* =========================
   GET USER CHATS (FILTERED)
========================= */

export const getUserDirectChats = async (userId) => {

  const uid = toStr(userId);

  const chats = await DirectChat.find({
    participants: uid,
    isDeleted: false,
    deletedFor: { $ne: uid },
    blockedBy: { $ne: uid }
  }).sort({ updatedAt: -1 }).populate(directChatDeepPopulate);

  return chats;
};

/* =========================
   DELETE CHAT FOR USER
========================= */

export const deleteDirectChatForUser = async ({ chatId, userId }) => {
  const uid = toStr(userId);

  const chat = await DirectChat.findById(chatId);

  if (!chat || chat.isDeleted) {
    throw new NotFoundError("Direct chat not found", 404);
  }

  const participants = chat.participants.map(toStr);

  if (!participants.includes(uid)) {
    throw new AppError("User not part of this chat", 403);
  }

  const deletedFor = chat.deletedFor?.map(toStr) || [];

  if (!deletedFor.includes(uid)) {
    chat.deletedFor.push(uid);
  }

  await chat.save();

  await roomStore.removeMember(chatId.toString(), uid);

  return { message: "Chat deleted for user" };
};

/* =========================
   BLOCK USER
========================= */

export const blockUserInDirectChat = async ({ chatId, blockerId }) => {
  const uid = toStr(blockerId);

  const chat = await DirectChat.findById(chatId);

  if (!chat || chat.isDeleted) {
    throw new AppError("Direct chat not found", 404);
  }

  const participants = chat.participants.map(toStr);

  if (!participants.includes(uid)) {
    throw new AppError("User not part of this chat", 403);
  }

  chat.blockedBy = uid;

  await chat.save();

  await roomStore.delete(chatId.toString());

  return { message: "User blocked in chat" };
};



export const unBlockDirectChatUser = async ({ chatId, userId }) => {
  const chat = await DirectChat.findById(chatId);

  if (!chat || chat.isDeleted) {
    throw new NotFoundError("Direct chat not found", 404);
  }

  const uid = userId.toString();

  const participants = chat.participants.map(String);

  if (!participants.includes(uid)) {
    throw new AppError("User not part of this chat", 403);
  }

  // unblock only if same user blocked it
  if (chat.blockedBy?.toString() !== uid) {
    throw new UnauthorizedError("You cannot unblock this chat");
  }

  chat.blockedBy = null;

  await chat.save();

  return { message: "User unblocked successfully" };
};