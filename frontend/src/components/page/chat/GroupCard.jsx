import { Avatar, Box, Typography } from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

export default function GroupCard({
  group,
  active,
  onSelect,
}) {
  const groupId = group._id || group.id;

  return (
    <Box
      onClick={() => onSelect(group)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 1.5,
        borderRadius: 2,
        cursor: "pointer",
        bgcolor: active ? "action.selected" : "transparent",
        "&:hover": {
          bgcolor: active ? "action.selected" : "action.hover",
        },
      }}
    >
      <Avatar
        sx={{
          width: 48,
          height: 48,
          bgcolor: "primary.main",
        }}
        src={group.image?.file?.url}
      >
        <GroupsOutlinedIcon />
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          fontWeight={600}
          noWrap
          variant="body2"
        >
          {group.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          noWrap
        >
          {group.lastMessage?.content || group.description || "No messages yet"}
        </Typography>
      </Box>
    </Box>
  );
}