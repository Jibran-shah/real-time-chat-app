import { Stack, Button } from "@mui/material";

export default function ProfileActionsBar({
  isOwnProfile,
  onMessage,
  onLogout,
  onDelete,
  isLoggingOut,
  onEdit,
}) {
  return (
    <Stack spacing={1} sx={{ mt: 3 }}>
      {!isOwnProfile ? (
        <Button variant="contained" onClick={onMessage}>
          Message
        </Button>
      ) : (
        <>
          <Button variant="outlined" onClick={onEdit}>
            Edit Profile
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={onLogout}
            disabled={isLoggingOut}
          >
            Logout
          </Button>

          <Button color="error" onClick={onDelete}>
            Delete Profile
          </Button>
        </>
      )}
    </Stack>
  );
}