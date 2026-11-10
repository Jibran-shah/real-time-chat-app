
import { GroupChat } from "../../../models/GroupChat.model.js";
import { getIO } from "../../../realtime/socket.js";
import { joinUsersToRoom } from "../../../realtime/utils/joinUserToRoom.js";
import { roomStore } from "../../../realtime/utils/room.store.js";
import { mediaService } from "../../media/media.service.js";

export const createGroupService = async ({
  creatorId,
  data,
  media,
  context,
}) => {
  const { name, description = "", members = [] } = data;

  const uniqueMembers = Array.from(
    new Set([creatorId.toString(), ...members.map(String)])
  );

  const resolvedImages = await mediaService.resolve({
    files: media.image,
    context: context.image,
  });

  const image = resolvedImages?.[0] || null;

  const group = await GroupChat.create({
    name,
    description,
    image,
    createdBy: creatorId,
    members: uniqueMembers,
  });

  if (!group?._id) {
    throw new Error("Failed to create group");
  }

  const roomId = group._id.toString();

  await roomStore.create({
    roomId,
    type: "GROUP_CHAT",
    members: uniqueMembers,
  });

  const io = getIO();

  const joinedUsers = await joinUsersToRoom(
    io,
    roomId,
    uniqueMembers
  );

  const sockets = await io.in(roomId).fetchSockets();
    
  const MS = sockets.map((socket) => ({
    socketId: socket.id,
    userId: socket.user?.id,
  }));

  console.log(MS)

  return {
    group,
    roomId,
    joinedUsers,
  };
};


export const getUserGroupsService = async (userId) => {
  return await GroupChat.find({
    members: userId,
  })
    .select("name description image lastMessage createdAt")
    .populate({
      path:"image",
      select:"file",
      populate:{
        path:"file",
        select:"url"
      }
    })
    .sort({ updatedAt: -1 })
    .lean();
};

/*
=====================================================
GET SINGLE GROUP
=====================================================
*/
export const getGroupByIdService = async (userId, groupId) => {
  const group = await GroupChat.findOne({
    _id: groupId,
    members: userId,
  }).lean();

  if (!group) {
    throw new Error("Group not found or you are not a member");
  }

  return group;
};

/*
=====================================================
ADD MEMBERS
=====================================================
*/
export const addMembersService = async (userId, groupId, members) => {
  const group = await GroupChat.findOne({
    _id: groupId,
    members: userId,
  });

  if (!group) {
    throw new Error("Group not found or you are not a member");
  }

  const newMembers = members
    .map(String)
    .filter(
      (memberId) =>
        !group.members.some(
          (existingId) => existingId.toString() === memberId
        )
    );

  if (!newMembers.length) return group;

  group.members.push(...newMembers);

  await group.save();

  await Promise.all(
    newMembers.map((memberId) =>
      roomStore.addMember(groupId.toString(), memberId)
    )
  );

  return group;
};

/*
=====================================================
REMOVE MEMBER
=====================================================
*/
export const removeMemberService = async (
  userId,
  groupId,
  memberId
) => {
  const group = await GroupChat.findOne({
    _id: groupId,
    members: userId,
  });

  if (!group) {
    throw new Error("Group not found or you are not a member");
  }

  if (group.createdBy.toString() !== userId.toString()) {
    throw new Error("Not authorized");
  }

  if (memberId.toString() === group.createdBy.toString()) {
    throw new Error("Group creator cannot be removed");
  }

  const memberExists = group.members.some(
    (id) => id.toString() === memberId.toString()
  );

  if (!memberExists) {
    throw new Error("Member not found");
  }

  group.members = group.members.filter(
    (id) => id.toString() !== memberId.toString()
  );

  await group.save();

  await roomStore.removeMember(groupId.toString(), memberId.toString());

  return group;
};

/*
=====================================================
LEAVE GROUP
=====================================================
*/
export const leaveGroupService = async (userId, groupId) => {
  const group = await GroupChat.findOne({
    _id: groupId,
    members: userId,
  });

  if (!group) {
    throw new Error("Group not found or you are not a member");
  }

  if (group.createdBy.toString() === userId.toString()) {
    throw new Error("Group creator cannot leave the group");
  }

  group.members = group.members.filter(
    (id) => id.toString() !== userId.toString()
  );

  await group.save();

  await roomStore.removeMember(groupId.toString(), userId.toString());

  return { success: true };
};

/*
=====================================================
UPDATE GROUP
=====================================================
*/
export const updateGroupService = async (
  userId,
  groupId,
  updates
) => {
  const group = await GroupChat.findOne({
    _id: groupId,
    members: userId,
  });

  if (!group) {
    throw new Error("Group not found or you are not a member");
  }

  if (group.createdBy.toString() !== userId.toString()) {
    throw new Error("Not authorized");
  }

  const allowedFields = ["name", "description", "avatar"];

  for (const key of allowedFields) {
    if (updates[key] !== undefined) {
      group[key] = updates[key];
    }
  }

  await group.save();

  return group;
};

/*
=====================================================
DELETE GROUP
=====================================================
*/
export const deleteGroupService = async (userId, groupId) => {
  const group = await GroupChat.findOne({
    _id: groupId,
    members: userId,
  });

  if (!group) {
    throw new Error("Group not found or you are not a member");
  }

  if (group.createdBy.toString() !== userId.toString()) {
    throw new Error("Not authorized");
  }

  await GroupChat.deleteOne({ _id: groupId });

  await roomStore.delete(groupId.toString());

  return { success: true };
};
