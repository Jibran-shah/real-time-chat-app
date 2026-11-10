
import {
  createGroupService,
  getUserGroupsService,
  getGroupByIdService,
  addMembersService,
  removeMemberService,
  leaveGroupService,
  updateGroupService,
  deleteGroupService,
} from "./groupChats.service.js";

/*
=====================================================
CREATE GROUP
=====================================================
*/
export const createGroupChat = async (req, res) => {
  const group = await createGroupService({
    creatorId: req.user.id,
    data: req.body,
    media: req.media,
    context: req.mediaContext,
  });

  return res.status(201).json({
    success: true,
    message: "Group created successfully",
    data: group,
  });
};

/*
=====================================================
GET USER GROUPS
=====================================================
*/
export const getUserGroups = async (req, res) => {
  const groups = await getUserGroupsService(req.user.id);

  return res.status(200).json({
    success: true,
    data: { groups },
  });
};

/*
=====================================================
GET GROUP BY ID
=====================================================
*/
export const getGroupById = async (req, res) => {
  const group = await getGroupByIdService(
    req.user.id,
    req.params.groupId
  );

  return res.status(200).json({
    success: true,
    data: group,
  });
};

/*
=====================================================
ADD MEMBERS
=====================================================
*/
export const addMembers = async (req, res) => {
  const result = await addMembersService(
    req.user.id,
    req.params.groupId,
    req.body.members
  );

  return res.status(200).json({
    success: true,
    message: "Members added successfully",
    data: result,
  });
};

/*
=====================================================
REMOVE MEMBER
=====================================================
*/
export const removeMember = async (req, res) => {
  const result = await removeMemberService(
    req.user.id,
    req.params.groupId,
    req.body.memberId
  );

  return res.status(200).json({
    success: true,
    message: "Member removed successfully",
    data: result,
  });
};

/*
=====================================================
LEAVE GROUP
=====================================================
*/
export const leaveGroup = async (req, res) => {
  const result = await leaveGroupService(
    req.user.id,
    req.params.groupId
  );

  return res.status(200).json({
    success: true,
    message: "Left group successfully",
    data: result,
  });
};

/*
=====================================================
UPDATE GROUP
=====================================================
*/
export const updateGroupInfo = async (req, res) => {
  const group = await updateGroupService(
    req.user.id,
    req.params.groupId,
    req.body
  );

  return res.status(200).json({
    success: true,
    message: "Group updated successfully",
    data: group,
  });
};

/*
=====================================================
DELETE GROUP
=====================================================
*/
export const deleteGroup = async (req, res) => {
  const result = await deleteGroupService(
    req.user.id,
    req.params.groupId
  );

  return res.status(200).json({
    success: true,
    message: "Group deleted successfully",
    data: result,
  });
};
