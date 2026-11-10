import { Box, Divider, Typography } from "@mui/material";

export default function ProfileInfoCard({ profile }) {
  const location = [profile?.city, profile?.country]
    .filter(Boolean)
    .join(", ");

  return (
    <Box>
      <Typography color="text.secondary" fontWeight={600} sx={{ mb: 2 }}>
        About
      </Typography>

      <Typography sx={{ mb: 3 }}>
        {profile?.bio || "Hey there! I am using this app."}
      </Typography>

      <Divider />

      <Box sx={{ py: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Phone
        </Typography>
        <Typography>{profile?.phone || "Not provided"}</Typography>
      </Box>

      <Divider />

      <Box sx={{ py: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Location
        </Typography>
        <Typography>{location || "Not provided"}</Typography>
      </Box>
    </Box>
  );
}