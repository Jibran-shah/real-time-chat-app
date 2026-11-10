import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ChatIcon from "@mui/icons-material/Chat";

import { useSelector } from "react-redux";
import { useState } from "react";

import ChatCard from "./ChatCard";
import AddContactDialog from "./AddContactDialog";
import SelectContactDialog from "./SelectContactDialog";

export default function ChatSidebar({
  chats = [],
  onSelectChat,
  activeChatId,
  header,
}) {
  const user = useSelector((state) => state.auth.user);

  const [openAddContact, setOpenAddContact] = useState(false);
  const [openSelectContact, setOpenSelectContact] = useState(false);

  return (
    <Box
      sx={{
        width: 320,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      {header || (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Chats
          </Typography>

          <Stack direction="row" spacing={0.5}>
            <IconButton
              size="small"
              onClick={() => setOpenSelectContact(true)}
              aria-label="New chat"
            >
              <ChatIcon />
            </IconButton>

            <IconButton
              size="small"
              onClick={() => setOpenAddContact(true)}
              aria-label="Add contact"
            >
              <PersonAddAlt1Icon />
            </IconButton>
          </Stack>
        </Box>
      )}

      <Box sx={{ flex: 1, overflowY: "auto", p: 1 }}>
        {chats.length > 0 ? (
          <Stack spacing={0.5}>
            {chats.map((chat) => {
              const chatId = chat._id || chat.id;

              return (
                <ChatCard
                  key={chatId}
                  chat={chat}
                  user={user}
                  active={activeChatId === chatId}
                  onSelect={onSelectChat}
                />
              );
            })}
          </Stack>
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{ height: "100%", px: 3, textAlign: "center" }}
          >
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                bgcolor: "action.hover",
                display: "grid",
                placeItems: "center",
              }}
            >
              <ChatOutlinedIcon
                sx={{ fontSize: 36, color: "text.secondary" }}
              />
            </Box>

            <Box>
              <Typography fontWeight={600}>
                No conversations yet
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Start a conversation with someone to see your chats here.
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<ChatIcon />}
              onClick={() => setOpenSelectContact(true)}
            >
              New Chat
            </Button>

            <Button
              variant="outlined"
              startIcon={<PersonAddAlt1Icon />}
              onClick={() => setOpenAddContact(true)}
            >
              Add Contact
            </Button>
          </Stack>
        )}
      </Box>

      <AddContactDialog
        open={openAddContact}
        onClose={() => setOpenAddContact(false)}
      />

      <SelectContactDialog
        open={openSelectContact}
        onClose={() => setOpenSelectContact(false)}
      />
    </Box>
  );
}