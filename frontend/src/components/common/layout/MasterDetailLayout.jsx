import { useState } from "react";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function MasterDetailLayout({ sidebar, main, hasSelection }) {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));
  const [showMain, setShowMain] = useState(false);

  const openMain = () => setShowMain(true);
  const closeMain = () => setShowMain(false);

  const sidebarContent =
    typeof sidebar === "function" ? sidebar(openMain) : sidebar;

  if (!isMobile) {
    return (
      <Box sx={{ display: "flex", gap: 2, height: "100%", width: "100%" }}>
        {sidebarContent}
        <Box sx={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
          {main}
        </Box>
      </Box>
    );
  }

  if (!showMain) {
    return <Box sx={{ height: "100%" }}>{sidebarContent}</Box>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", backgroundColor:"red", border:"10px solid red" }}>
      <IconButton onClick={closeMain} sx={{ alignSelf: "flex-start" }}>
        <ArrowBackIcon />
      </IconButton>

      <Box sx={{ flex: 1, minHeight: 0 }}>
        {main}
      </Box>
    </Box>
  );
}