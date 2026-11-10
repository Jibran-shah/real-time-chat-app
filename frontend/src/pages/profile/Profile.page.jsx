import {
  Avatar,
  Box,
  IconButton,
  Typography,
  CircularProgress,
  Divider,
  Stack,
  Button,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useGetProfile } from "../../hooks/api/profile/profile.hooks";
import { useLogout } from "../../hooks/api/auth/auth.hooks";
import { logout } from "../../store/slices/auth.slice";

export default function ProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.user);
  const targetUserId = userId || currentUser?.id;
  const isOwnProfile = currentUser?.id === targetUserId;

  const { data:profile, isLoading, isError } = useGetProfile(targetUserId);
  const { mutate: logoutUser, isPending } = useLogout();

  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: () => {
        dispatch(logout());
        navigate("/login", { replace: true });
      },
    });
  };

  if (isLoading) return <CircularProgress />;
  if (isError || !profile) {
    return <Typography>Error loading profile</Typography>;
  }

  const name = profile?.name;

  const user = profile.user;

  const location = [profile?.city, profile?.country]
    .filter(Boolean)
    .join(", ");

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        height: "100%",
        minHeight: 0,
        overflowY: "auto",
        bgcolor: "background.paper",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h6">Profile</Typography>
      </Box>

      {/* Profile Header */}
      <Box sx={{ textAlign: "center", py: 3 }}>
        <Avatar
          src={profile?.avatar?.file?.url}
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

      {/* Profile Information */}
      <Box sx={{ px: 2 }}>
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

        {/* Profile Actions */}
        <Stack spacing={1} sx={{ mt: 3 }}>
          {!isOwnProfile ? (
            <Button
              variant="contained"
              onClick={() => navigate(`/chats/new/${user.id}`)}
            >
              Message
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => navigate("/profile/edit")}
              >
                Edit Profile
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
                disabled={isPending}
              >
                Logout
              </Button>

              <Button
                color="error"
                onClick={() => navigate("/profile/delete")}
              >
                Delete Profile
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </Box>
  );
}