import { DirectChat } from "../../models/DirectChat.model.js";
import { GroupChat } from "../../models/GroupChat.model.js";
import { roomStore } from "../utils/room.store.js";

export async function hydrateUserRooms(userId) {
  const roomIds = [];
  const directChats = await DirectChat.find({
    participants: userId,
    isDeleted: false
  }).select("_id participants");

  const directRoomTasks = directChats.map(async (chat) => {
    const roomId = chat._id.toString();
    roomIds.push(roomId);
    return roomStore.create({
      roomId,
      type: "DIRECT_CHAT",
      members: chat.participants.map(String)
    });
  });


  const groupChats = await GroupChat.find({
    members: userId,
  }).select("_id members");

  const groupRoomTasks = groupChats.map(async (group) => {
    const roomId = group._id.toString();
    const members = group.members.map(String);
    roomIds.push(roomId);
    return roomStore.create({
      roomId,
      type: "GROUP_CHAT",
      members,
    });
  });

  await Promise.all([
    ...directRoomTasks,
    ...groupRoomTasks
  ]);

  return roomIds;
}