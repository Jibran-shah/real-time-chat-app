import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Box,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";

import { useState, useRef, useEffect } from "react";

import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import GroupIcon from "@mui/icons-material/Group";

import GroupMembersSelector from "./GroupMembersSelector";

export default function CreateGroupDialog({ open, onClose, onCreate }) {
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null,
    members: [],
  });

  const [preview, setPreview] = useState(null);
  
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({
      ...prev,
      image: file,
    }));
    setPreview(URL.createObjectURL(file));
  };

  const handleCreate = () => {
    onCreate?.(form);
    onClose?.();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Group</DialogTitle>

      <DialogContent>
        <Stack spacing={2.5} sx={{ pt: 1 }}>
          <Stack alignItems="center" spacing={1}>
            <Box sx={{ position: "relative" }}>
              <IconButton
                onClick={() => fileInputRef.current?.click()}
                sx={{ p: 0 }}
              >
                <Avatar
                  src={preview || undefined}
                  sx={{
                    width: 100,
                    height: 100,
                    cursor: "pointer",
                  }}
                >
                  <GroupIcon sx={{ fontSize: 45 }} />
                </Avatar>
              </IconButton>

              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "primary.main",
                  color: "white",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                  border: 2,
                  borderColor: "background.paper",
                }}
              >
                <PhotoCameraIcon fontSize="small" />
              </Box>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </Box>

            <Typography variant="caption" color="text.secondary">
              Click to upload group photo
            </Typography>
          </Stack>

          <TextField
            label="Group Name"
            value={form.name}
            onChange={handleChange("name")}
            fullWidth
            required
          />

          <TextField
            label="Description"
            value={form.description}
            onChange={handleChange("description")}
            fullWidth
            multiline
            minRows={2}
          />

          <GroupMembersSelector
            selectedMembers={form.members}
            onChange={(members) =>
              setForm((prev) => ({ ...prev, members }))
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          variant="contained"
          onClick={handleCreate}
          disabled={form.name.trim().length < 3}
        >
          Create Group
        </Button>
      </DialogActions>
    </Dialog>
  );
}