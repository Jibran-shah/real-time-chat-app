import { useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

import { useSelector } from "react-redux";

import { useEditProfileForm } from "../../../hooks/form/profile/useEditProfileForm";
import { buildProfileFormData } from "../../../utils/form/profileFormData";
import { useGetProfile, useUpdateProfile } from "../../../hooks/api/profile/profile.hooks";

export default function ProfileSettings() {
  const currentUser = useSelector((state) => state.auth.user);
  const userId = currentUser?.id || currentUser?._id;

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const { data: profile, isLoading } = useGetProfile(userId);
  console.log(profile)
  const updateMutation = useUpdateProfile();

  const form = useEditProfileForm();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = form;

  const avatar = watch("avatar");
  const cover = watch("cover");

  const avatarPreview = avatar
    ? URL.createObjectURL(avatar)
    : profile?.avatar?.file?.url || "";

  const coverPreview = cover
    ? URL.createObjectURL(cover)
    : profile?.cover?.file?.url || "";

  useEffect(() => {
    if (!profile) return;
    reset({
      name: profile.name || "",
      phone: profile.phone || "",
      bio: profile.bio || "",
      country: profile.country || "",
      city: profile.city || "",
      address: profile.address || "",
      avatar: null,
      cover: null,
    });
  }, [profile, reset]);

  const handleFileChange = (event, field) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setValue(field, file, {
      shouldDirty: true,
      shouldValidate: true,
    });

    event.target.value = "";
  };

  const onSubmit = (data) => {
    updateMutation.mutate(buildProfileFormData(data));
  };

  const renderField = (label, name, options = {}) => (
    <TextField
      fullWidth
      size="small"
      label={label}
      multiline={options.multiline || false}
      rows={options.rows || undefined}
      placeholder={options.placeholder || ""}
      error={Boolean(errors[name])}
      helperText={errors[name]?.message}
      {...register(name)}
    />
  );

  if (isLoading) {
    return (
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        <Typography color="text.secondary" fontSize={13}>
          Loading profile...
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
      {/* Section Header */}
      <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
        <PersonOutlineIcon color="primary" />

        <Box>
          <Typography fontSize={17} fontWeight={700}>
            Profile Information
          </Typography>

          <Typography color="text.secondary" fontSize={13} mt={0.5}>
            Manage your personal information and profile.
          </Typography>
        </Box>
      </Stack>

      {/* Cover Photo */}
      <Box
        sx={{
          position: "relative",
          height: 120,
          borderRadius: 1.5,
          bgcolor: "action.hover",
          backgroundImage: coverPreview
            ? `url("${coverPreview}")`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mb: 3,
        }}
      >
        <input
          ref={coverInputRef}
          hidden
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => handleFileChange(event, "cover")}
        />

        <Button
          size="small"
          variant="contained"
          startIcon={<CameraAltOutlinedIcon />}
          onClick={() => coverInputRef.current?.click()}
          sx={{
            position: "absolute",
            right: 12,
            bottom: 12,
            bgcolor: "background.paper",
            color: "text.primary",
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          Change Cover
        </Button>
      </Box>

      {/* Profile Photo */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        mb={3}
      >
        <Box position="relative">
          <Avatar
            src={avatarPreview}
            sx={{
              width: 76,
              height: 76,
              bgcolor: "primary.light",
              fontSize: 26,
            }}
          >
            {profile?.name?.charAt(0)?.toUpperCase()}
          </Avatar>

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              bgcolor: "primary.main",
              color: "white",
              borderRadius: "50%",
              width: 27,
              height: 27,
              display: "grid",
              placeItems: "center",
              border: "3px solid",
              borderColor: "background.paper",
              cursor: "pointer",
            }}
            onClick={() => avatarInputRef.current?.click()}
          >
            <CameraAltOutlinedIcon sx={{ fontSize: 14 }} />
          </Box>
        </Box>

        <Box>
          <Typography fontWeight={650}>
            Your Profile Photo
          </Typography>

          <Typography color="text.secondary" fontSize={12} mt={0.5}>
            JPG, PNG or WebP. Maximum size 5MB.
          </Typography>

          <input
            ref={avatarInputRef}
            hidden
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => handleFileChange(event, "avatar")}
          />

          <Button
            size="small"
            sx={{ mt: 0.5, px: 0 }}
            onClick={() => avatarInputRef.current?.click()}
          >
            Change Photo
          </Button>
        </Box>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Profile Form */}
      <Stack
        component="form"
        spacing={2}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
        >
          {renderField("Full Name", "name")}
          {renderField("Phone Number", "phone")}
        </Stack>

        {renderField("About", "bio", {
          multiline: true,
          rows: 3,
          placeholder: "Tell people a little about yourself...",
        })}

        <Divider />

        <Typography fontWeight={650} fontSize={14}>
          Location Information
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
        >
          {renderField("Country", "country")}
          {renderField("City", "city")}
        </Stack>

        {renderField("Address", "address")}

        <Stack
          direction="row"
          justifyContent="flex-end"
          mt={1}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending
              ? "Saving Changes..."
              : "Save Changes"}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}