import { apiClient } from "../apiClient";


export const createDirectChat = async (data) => {
  const res = await apiClient.post("/chat/direct", data);
  return res.data
};


export const getUserDirectChats = async () => {
  try {
    const res = await apiClient.get("/chat/direct/user");
    return res;
  } catch (error) {
    console.error("[getUserDirectChats] error:", error);
    throw error;
  }
};


export const getDirectChat = async (chatId) => {
  try {
    const res = await apiClient.get(`/chat/direct/${chatId}`);
    console.log("called direct chats", res)
    return res;
  } catch (error) {
    console.error("[getDirectChat] error:", error);
    throw error;
  }
};

/* =========================
   DELETE DIRECT CHAT FOR USER
========================= */
export const deleteDirectChatForUser = async (chatId) => {
  try {
    const res = await apiClient.patch(
      `/chat/direct/${chatId}/delete`
    );
    return res;
  } catch (error) {
    console.error(
      "[deleteDirectChatForUser] error:",
      error
    );
    throw error;
  }
};

/* =========================
   BLOCK USER
========================= */
export const blockUser = async (chatId) => {
  try {
    const res = await apiClient.patch(
      `/chat/direct/${chatId}/block`
    );
    return res;
  } catch (error) {
    console.error("[blockUser] error:", error);
    throw error;
  }
};

/* =========================
   UNBLOCK USER
========================= */
export const unblockUser = async (chatId) => {
  try {
    const res = await apiClient.patch(
      `/chat/direct/${chatId}/unblock`
    );
    return res;
  } catch (error) {
    console.error("[unblockUser] error:", error);
    throw error;
  }
};