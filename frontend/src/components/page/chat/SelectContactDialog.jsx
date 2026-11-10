import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
  Avatar,
  Typography,
  Box,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";

import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";

import { useCreateDirectChat } from "../../../hooks/api/directChats/directChats.hooks";
import { setSelectedChat } from "../../../store/slices/chat.slice";
import { useGetUserContacts } from "../../../hooks/api/contacts/contacts.hooks";

export default function SelectContactDialog({ open, onClose }) {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const { mutate, isPending, variables } = useCreateDirectChat();

  const { data, isLoading } = useGetUserContacts();

  const contacts = data?.contacts || [];

  const filteredContacts = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return contacts;
    return contacts.filter((contact) =>
      [
        contact.name,
        contact.contact?.username,
        contact.contact?.phoneNo,
      ].some((value) => value?.toLowerCase().includes(query))
    );
  }, [search, contacts]);

  console.log(filteredContacts)

  const handleClose = () => {
    if (isPending) return;
    setSearch("");
    onClose();
  };

  const handleSelectContact = (contact) => {
    mutate(
      { contactId: contact._id },
      {
        onSuccess: (response) => {
          const chat = response?.chat
          console.log(response)
          if (!chat) return;
          dispatch(setSelectedChat(chat));
          setSearch("");
          onClose();
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>New Chat</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <TextField
            fullWidth
            autoFocus
            size="small"
            placeholder="Search contacts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={isPending}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Box sx={{ minHeight: 250 }}>
            {isLoading ? (
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{ height: 200 }}
              >
                <CircularProgress size={24} />
              </Stack>
            ) : filteredContacts.length > 0 ? (
              <List disablePadding>
                {filteredContacts.map((contact) => {
                  const username = contact.contact?.username;
                  const isSelected =
                    variables?.username === username && isPending;
                    console.log(contact)
                  return (
                    <ListItemButton
                      key={contact._id}
                      onClick={() => handleSelectContact(contact)}
                      disabled={isPending}
                      sx={{ borderRadius: 2 }}
                    >
                      <ListItemAvatar>
                        <Avatar src={contact.contact?.profile?.avatar}>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>

                      <ListItemText
                        primary={
                          <Typography fontWeight={600}>
                            {contact.savedName}
                          </Typography>
                        }
                        secondary={
                          <Stack spacing={0.25}>
                            <Typography variant="caption" color="text.secondary">
                              @{contact.contact?.username}
                            </Typography>
                          </Stack>
                        }
                      />

                      {isSelected && (
                        <CircularProgress size={20} />
                      )}
                    </ListItemButton>
                  );
                })}
              </List>
            ) : (
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{ height: 200 }}
              >
                <Typography color="text.secondary">
                  {contacts.length === 0
                    ? "No contacts available"
                    : "No contacts found"}
                </Typography>
              </Stack>
            )}
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}