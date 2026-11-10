import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";

import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BottomBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const tabs = [
    { label: "Chats", path: "/chats", icon: <PersonIcon /> },
    { label: "Groups", path: "/groups", icon: <GroupsIcon /> },
    {
      label: isAuthenticated ? "Profile" : "Login",
      path: isAuthenticated ? "/profile" : "/login",
      icon: <AccountCircleIcon />,
    },
    { label: "Settings", path: "/settings", icon: <SettingsIcon /> },
  ];

  const value = tabs.findIndex((tab) =>
    location.pathname.startsWith(tab.path)
  );

  return (
    <Paper
      elevation={0}
      sx={{
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <BottomNavigation
        showLabels
        value={value === -1 ? 0 : value}
        onChange={(_, index) => navigate(tabs[index].path)}
      >
        {tabs.map((tab) => (
          <BottomNavigationAction
            key={tab.path}
            label={tab.label}
            icon={tab.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}