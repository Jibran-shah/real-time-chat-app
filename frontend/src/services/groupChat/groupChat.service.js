import { apiClient } from "../apiClient";

export const groupChatService = {
  createGroup: async (data) => {
    const res = await apiClient.post("/chat/group", data);
    return res.data;
  },

  getUserGroups: async () => {
    const res = await apiClient.get("/chat/group");
    return res.data;
  },

  getGroupById: async (groupId) => {
    const res = await apiClient.get(`/chat/group/${groupId}`);
    return res.data;
  },

  addMembers: async ({ groupId, members }) => {
    const res = await apiClient.post(`/chat/group/${groupId}/members`, {
      members,
    });
    return res.data;
  },

  removeMember: async ({ groupId, memberId }) => {
    const res = await apiClient.delete(`/chat/group/${groupId}/members`, {
      data: { memberId },
    });
    return res.data;
  },

  leaveGroup: async (groupId) => {
    const res = await apiClient.post(`/chat/group/${groupId}/leave`);
    return res.data;
  },

  updateGroup: async ({ groupId, data }) => {
    const res = await apiClient.patch(`/chat/group/${groupId}`, data);
    return res.data;
  },

  changeRole: async ({ groupId, memberId, role }) => {
    const res = await apiClient.patch(
      `/chat/group/${groupId}/members/role`,
      { memberId, role }
    );
    return res.data;
  },

  deleteGroup: async (groupId) => {
    const res = await apiClient.delete(`/chat/group/${groupId}`);
    return res.data;
  },
};