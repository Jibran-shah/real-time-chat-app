import { Avatar, Box, Typography } from "@mui/material";

export default function ProfileHeader({ avatarUrl, profile, user }) {
  const name = profile?.name || user?.username;

  return (
    <Box sx={{ textAlign: "center", py: 3 }}>
      <Avatar
        src={avatarUrl}
        alt={name}
        sx={{
          width: 120,
          height: 120,
          mx: "auto",
          mb: 2,
          fontSize: 40,
        }}
      >
        {name?.charAt(0)?.toUpperCase()}
      </Avatar>

      <Typography variant="h5" fontWeight={600}>
        {name}
      </Typography>

      <Typography color="text.secondary">
        @{user?.username}
      </Typography>
    </Box>
  );
}