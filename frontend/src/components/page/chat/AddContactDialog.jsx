import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
} from "@mui/material";

import { useState } from "react";
import {useCreateContact} from "../../../hooks/api/contacts/contacts.hooks"

export default function AddContactDialog({ open, onClose }) {
  const [searchType, setSearchType] = useState("username");
  const [value, setValue] = useState("");
  const [savedName, setSavedName] = useState("");
  const { mutate, isPending, isError, error } = useCreateContact();

  const handleClose = () => {
    if (isPending) return;
    setValue("");
    setSavedName("");
    setSearchType("username");
    onClose();
  };

  const handleAdd = () => {
    mutate(
      {
        [searchType]: value.trim(),
        ...(savedName.trim() && { savedName: savedName.trim() }),
      },
      {
        onSuccess: handleClose,
      }
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Add Contact</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <ToggleButtonGroup
            fullWidth
            exclusive
            value={searchType}
            onChange={(_, newValue) => {
              if (newValue) {
                setSearchType(newValue);
                setValue("");
              }
            }}
            color="primary"
          >
            <ToggleButton value="username">Username</ToggleButton>
            <ToggleButton value="phoneNo">Phone Number</ToggleButton>
          </ToggleButtonGroup>

          <TextField
            fullWidth
            autoFocus
            label={searchType === "username" ? "Username" : "Phone Number"}
            placeholder={
              searchType === "username"
                ? "Enter username"
                : "Enter phone number"
            }
            value={value}
            onChange={(e) => setValue(e.target.value)}
            error={isError}
            helperText={isError ? error?.message || "Unable to add contact" : ""}
          />

          <TextField
            fullWidth
            label="Contact Name"
            placeholder="Enter a name to save this contact as"
            value={savedName}
            onChange={(e) => setSavedName(e.target.value)}
            disabled={isPending}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} color="inherit" disabled={isPending}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleAdd}
          disabled={!value.trim() || isPending}
        >
          {isPending ? "Adding..." : "Add Contact"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}