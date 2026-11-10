
import {
  Box,
  Stack,
  Typography,
  Avatar,
  Checkbox,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";

import { useGetUserContacts } from "../../../hooks/api/contacts/contacts.hooks";

export default function GroupMembersSelector({
  selectedMembers = [],
  onChange,
}) {

  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useGetUserContacts();

  const handleToggle = (contactId) => {
    const updated = selectedMembers.includes(contactId)
      ? selectedMembers.filter((id) => id !== contactId)
      : [...selectedMembers, contactId];

    onChange?.(updated);
  };

  if(isLoading || isError){
    return (<Typography>loading or error</Typography>)
  }

  const contacts = data.contacts;

  const filteredContacts = contacts.filter((contact) => {
    const query = search.toLowerCase();
    return (
      contact.savedName?.toLowerCase().includes(query) ||
      contact.contact.phoneNo?.includes(search) ||
      contact.contact.username?.includes(search)
    );
  });

  console.log(filteredContacts)

  return (
    <Box>
      <Typography fontWeight={600} sx={{ mb: 1 }}>
        Add Members
      </Typography>
      <TextField
        size="small"
        fullWidth
        placeholder="Search contacts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <CircularProgress size={24} />
        </Box>
      ) : filteredContacts.length === 0 ? (
        <Typography
          color="text.secondary"
          variant="body2"
          textAlign="center"
          sx={{ py: 3 }}
        >
          No contacts found.
        </Typography>
      ) : (
        <Stack
          spacing={0.5}
          sx={{ maxHeight: 280, overflowY: "auto" }}
        >
          {filteredContacts.map((contact) => {
            const selected = selectedMembers.includes(contact.contact._id);
            return (
              <Box
                key={contact._id}
                onClick={() => handleToggle(contact.contact._id)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 1,
                  py: 1,
                  borderRadius: 1,
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <Avatar src={contact.avatar}>
                  {contact.savedName?.[0]}
                </Avatar>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography fontWeight={500} noWrap>
                    {contact.savedName}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {contact.contact.phoneNo}
                  </Typography>
                </Box>

                <Checkbox
                  checked={selected}
                  onChange={() => handleToggle(contact.contact._id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </Box>
            );
          })}
        </Stack>
      )}

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mt: 1 }}
      >
        {selectedMembers.length} contacts selected
      </Typography>
    </Box>
  );
}
