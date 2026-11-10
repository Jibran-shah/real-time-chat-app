import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";

import { useState } from "react";
import { useSelector } from "react-redux";

import ChatCard from "./ChatCard";
import CreateGroupDialog from "./CreateGroupDialog";

import { useCreateGroup, useGetUserGroups } from "../../../hooks/api/groupChats/groupChats.hooks"
import { toFormData } from "../../../utils/form/toFormData";
import GroupCard from "./GroupCard";

export default function GroupChatSidebar({
  onSelectedGroup,
  activeGroupId,
}) {
  const user = useSelector((state) => state.auth.user);
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const { mutate, isPending } = useCreateGroup();
  const { data, isLoading, error } = useGetUserGroups();

  const handleCreateGroup = (data) => {
    console.log(data)
    const formData = toFormData(data);
    mutate(formData, {
      onSuccess: () => {
        setOpenCreateGroup(false);
      },
    });
  };
  
  if (isLoading) return <Typography>Loading groups...</Typography>;
  if (error) {
    console.log(error)
    return <Typography color="error">Failed to load groups</Typography>;
  }

  console.log(data)

  const groups = data?.groups;

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Groups
        </Typography>

        <IconButton
          size="small"
          onClick={() => setOpenCreateGroup(true)}
          aria-label="Create group"
        >
          <GroupAddOutlinedIcon />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, overflowY: "auto", p: 1 }}>
        {groups.length > 0 ? (
          <Stack spacing={0.5}>
            {groups.map((group) => {
              const groupId = group._id || group.id;
              return (
                <GroupCard
                  key={groupId}
                  group={group}
                  active={activeGroupId === groupId}
                  onSelect={onSelectedGroup}
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
              <GroupsOutlinedIcon
                sx={{ fontSize: 36, color: "text.secondary" }}
              />
            </Box>

            <Box>
              <Typography fontWeight={600}>
                No groups yet
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Create a group to start conversations with multiple people.
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<GroupAddOutlinedIcon />}
              onClick={() => setOpenCreateGroup(true)}
            >
              Create group
            </Button>
          </Stack>
        )}
      </Box>

      <CreateGroupDialog
        open={openCreateGroup}
        onClose={() => setOpenCreateGroup(false)}
        onCreate={handleCreateGroup}
      />
    </Box>
  );
}