export const queryKeys = {

  auth: {
    all: ["auth"],

    init: () => ["auth", "init"],

    me: () => ["auth", "me"],
    user:(id) => ["auth","user",id]
  },

  user: {
    all: ["user"],

    profile: (id) => ["user", "profile", id],
  },

  profile: {
    all: ["profile"],

    buyer: {
      all: ["profile", "buyer"],

      me: () => ["profile", "buyer", "me"],

      byId: (id) => ["profile", "buyer", id],

      list: (filters = {}) => ["profile", "buyer", "list", filters],
    },
    fullProfile: (id)=>["full-profile", id]
  },

  chat: {
    all: ["chat"],
    conversations: () => ["chat", "conversations"],
    conversation: (id) => ["chat", "conversation", id],
    messages: (conversationId, page = 1) => [
      "chat",
      "messages",
      conversationId,
      page,
    ],
    unread: () => ["chat", "unread"],
  },

  directChat: {
    all: ["directChat"],
    list: () => ["directChat", "list"],
    detail: (chatId) => ["directChat", "detail", chatId]
  },

  groupChat: {
    all: ["groupChat"],
    list: () => ["groupChat", "list"],
    detail: (groupId) => ["groupChat", "detail", groupId],
    members: (groupId) => ["groupChat", "members", groupId]
  },

  messages: {
    all: ["messages"],
    chat: (chatId) => ["messages", "chat", chatId]
  },

  ui: {
    all: ["ui"],
  },
};