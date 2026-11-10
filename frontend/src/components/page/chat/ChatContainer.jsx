import { useEffect, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { useSelector } from "react-redux";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

import { useGetChatMessagesInfinite } from "../../../hooks/api/messages/messages.hooks";

import {
  registerChatSocket,
  unregisterChatSocket,
} from "../../../socket/utils/chat.socket.utils";

import * as chatHandlers from "../../../socket/handlers/chatPage.handlers";
import { sendMessage } from "../../../socket/actions/chat.socket.actions";

export default function ChatContainer({ chat }) {
  const { user } = useSelector((state) => state.auth);

  const chatId = chat?._id || chat?.id;
  const userId = user?._id || user?.id;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetChatMessagesInfinite(chatId, { enabled: !!chatId });

  const messages = data?.pages?.flatMap((page) => page.messages || []) || [];

  const otherParticipant = chat?.participants?.find(
    (participant) => participant?._id !== userId
  ) || chat?.participants?.[0];

  const handlers = useMemo(
    () => ({
      from: "ChatContainer",
      onNewMessage: chatHandlers.handleNewMessage,
      onDelivered: chatHandlers.handleDelivered,
      onRead: chatHandlers.handleRead,
      onTypingStart: chatHandlers.handleTypingStart,
      onTypingStop: chatHandlers.handleTypingStop,
    }),
    []
  );

  useEffect(() => {
    if (!chatId) return;

    registerChatSocket(handlers);

    return () => unregisterChatSocket(handlers);
  }, [chatId, handlers]);

  const handleSend = (content) => {
    sendMessage({
      roomId: chatId,
      content,
      tempId: crypto.randomUUID(),
      senderId: userId,
      receiverId: otherParticipant?._id,
    });
  };

  if (!chat) {
    return (
      <Box
        sx={{
          height: "100%",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 3,
          bgcolor: "background.default",
        }}
      >
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            bgcolor: "action.hover",
            display: "grid",
            placeItems: "center",
            mb: 3,
          }}
        >
          <ChatOutlinedIcon
            sx={{ fontSize: 48, color: "text.secondary" }}
          />
        </Box>

        <Typography variant="h5" fontWeight={600}>
          Welcome to Chat
        </Typography>

        <Typography
          color="text.secondary"
          variant="body2"
          sx={{ mt: 1, maxWidth: 360, lineHeight: 1.7 }}
        >
          Select a conversation to start messaging. Your conversations will
          appear here.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
    >
      <ChatHeader
        title={otherParticipant?.profile?.name || "New Chat"}
        avatar={otherParticipant?.profile?.avatar?.file?.url}
      />

      <Box sx={{ flex: 1, minHeight: 0 }}>
        <MessageList
          messages={messages}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Box>

      <Box sx={{ borderTop: 1, borderColor: "divider" }}>
        <MessageInput onSend={handleSend} />
      </Box>
    </Box>
  );
}