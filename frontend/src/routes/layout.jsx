import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import BottomBar from "../components/common/layout/BottomBar";

export default function Layout() {
  return (
    <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
        <Outlet />
      </Box>
      <BottomBar />
    </Box>
  );
}