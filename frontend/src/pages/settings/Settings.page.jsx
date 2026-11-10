import ProfileSettings from "../../components/page/profile/ProfileSettings";
import { NotificationSection } from "./NotificationSection";
import { PrivacySection } from "./PrivacySection";
import { AppearanceSection } from "./AppearanceSection";
import { ChatsSection } from "./ChatsSection";
import { StorageSection } from "./StorageSection";
import { DevicesSection } from "./DevicesSection";
import { Footer } from "./Footer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useLogout } from "../../hooks/api/auth/auth.hooks";
import { logout } from "../../store/slices/auth.slice";

export const SettingRow = ({ title, description, action }) => (
  <Stack
    direction="row"
    gap={2}
    sx={{
      alignItems:"center",
      justifyContent:"space-between",
      py:2
    }}
  >
    <Box>
      <Typography fontWeight={600} fontSize={14}>
        {title}
      </Typography>
      <Typography color="text.secondary" fontSize={12} mt={0.4}>
        {description}
      </Typography>
    </Box>
    {action}
  </Stack>
);

export const SectionTitle = ({ title, description }) => (
  <Box mb={2}>
    <Typography fontSize={17} fontWeight={700}>
      {title}
    </Typography>
    <Typography color="text.secondary" fontSize={13} mt={0.5}>
      {description}
    </Typography>
  </Box>
);

const sections = [
  {
    label: "Profile",
    icon: <PersonOutlineIcon />,
    component: ProfileSettings,
  },
  {
    label: "Notifications",
    icon: <NotificationsNoneIcon />,
    component: NotificationSection,
  },
  {
    label: "Privacy & Security",
    icon: <LockOutlinedIcon />,
    component: PrivacySection,
  },
  {
    label: "Appearance",
    icon: <PaletteOutlinedIcon />,
    component: AppearanceSection,
  },
  {
    label: "Chats",
    icon: <ChatBubbleOutlineIcon />,
    component: ChatsSection,
  },
  {
    label: "Storage",
    icon: <StorageOutlinedIcon />,
    component: StorageSection,
  },
  {
    label: "Devices",
    icon: <DevicesOutlinedIcon />,
    component: DevicesSection,
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("Profile");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: () => {
        dispatch(logout());
        navigate("/login", { replace: true });
      },
    });
  };

  const ActiveComponent =
    sections.find((section) => section.label === activeSection)?.component;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        p: { xs: 2, sm: 3, md: 4 },
        bgcolor: "background.default",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="flex-start"
        spacing={3}
      >
        {/* Sidebar */}
        <Paper
          variant="outlined"
          sx={{
            width: { xs: "100%", md: 250 },
            flexShrink: 0,
            borderRadius: 2,
            p: 1,
          }}
        >
          <List disablePadding>
            {sections.map((item) => {
              const selected = activeSection === item.label;

              return (
                <ListItemButton
                  key={item.label}
                  selected={selected}
                  onClick={() => setActiveSection(item.label)}
                  sx={{
                    borderRadius: 1.5,
                    mb: 0.5,
                    py: 1.1,

                    "&.Mui-selected": {
                      bgcolor: "action.selected",
                      color: "primary.main",
                    },

                    "&.Mui-selected:hover": {
                      bgcolor: "action.selected",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 38,
                      color: selected ? "primary.main" : "text.secondary",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 13,
                      fontWeight: selected ? 650 : 500,
                    }}
                  />

                  {selected && (
                    <ChevronRightIcon fontSize="small" />
                  )}
                </ListItemButton>
              );
            })}
          </List>

          <Divider sx={{ my: 1 }} />

          {/* Logout */}
          <ListItemButton
            disabled={isLoggingOut}
            onClick={handleLogout}
            sx={{
              borderRadius: 1.5,
              color: "error.main",
              py: 1.1,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 38,
                color: "error.main",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>

            <ListItemText
              primary={isLoggingOut ? "Logging out..." : "Logout"}
              primaryTypographyProps={{
                fontSize: 13,
                fontWeight: 600,
              }}
            />
          </ListItemButton>
        </Paper>

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            width: "100%",
          }}
        >
          {ActiveComponent && <ActiveComponent />}

          <Box mt={2.5}>
            <Footer />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}