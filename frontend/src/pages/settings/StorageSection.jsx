import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material"
import { SectionTitle, SettingRow } from "./Settings.page"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

export const StorageSection = () => {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 2.5 }}>
      <SectionTitle
        title="Storage & Data"
        description="Manage application storage and media."
      />

      <Box mb={2}>
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Typography fontSize={13} fontWeight={600}>
            Storage Used
          </Typography>
          <Typography fontSize={13} color="text.secondary">
            2.4 GB / 10 GB
          </Typography>
        </Stack>
        <Box
          sx={{
            height: 8,
            bgcolor: "action.hover",
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: "24%",
              height: "100%",
              bgcolor: "primary.main",
              borderRadius: 5,
            }}
          />
        </Box>
      </Box>

      <SettingRow
        title="Clear Cache"
        description="Remove temporary files to free up space."
        action={<Button size="small" color="error">Clear</Button>}
      />
      <Divider />
      <SettingRow
        title="Manage Media"
        description="Review downloaded images, videos and documents."
        action={<Button size="small" endIcon={<ChevronRightIcon />}>View</Button>}
      />
    </Paper>
  )
}