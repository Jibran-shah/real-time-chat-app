import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import ChatSidebar from "../../components/page/chat/ChatSidebar";
import ChatContainer from "../../components/page/chat/ChatContainer";
import MasterDetailLayout from "../../components/common/layout/MasterDetailLayout";

import { useGetUserDirectChats } from "../../hooks/api/directChats/directChats.hooks";
import { setSelectedChat } from "../../store/slices/chat.slice";

export default function ChatsPage() {

  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat.selectedChat);
  const { data, isLoading, error } = useGetUserDirectChats();
  
  if (isLoading) return <Typography>Loading chats...</Typography>;
  if (error) return <Typography color="error">Failed to load chats</Typography>;

  const chats = data || [];
  const chatId = chat?._id || chat?.id;

  return (
    <MasterDetailLayout
      hasSelection={!!chat}
      sidebar={(openMain) => (
        <ChatSidebar
          chats={chats}
          activeChatId={chatId}
          onSelectChat={(selectedChat) => {
            dispatch(setSelectedChat(selectedChat));
            openMain();
          }}
        />
      )}
      main={
        chat ? (
          <ChatContainer chat={chat} chatId={chatId} />
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "grid",
              placeContent: "center",
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            <Typography variant="h6">Select a chat</Typography>
            <Typography variant="body2">
              Choose a conversation to start messaging.
            </Typography>
          </Box>
        )
      }
    />
  );
}