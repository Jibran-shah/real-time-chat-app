import { Box, Chip, Paper, Stack, Typography } from "@mui/material"
import { SectionTitle } from "./Settings.page"
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined"

export const DevicesSection = () => {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 2.5 }}>
      <SectionTitle
        title="Linked Devices"
        description="Manage devices connected to your account."
      />

      <Stack direction="row"  spacing={2} sx={{
        alignItems:"center"
      }}>
        <DevicesOutlinedIcon color="action" />
        <Box sx={{
          flex:1
        }}>
          <Typography fontWeight={600} fontSize={14}>
            Windows Desktop
          </Typography>
          <Typography fontSize={12} color="text.secondary">
            Current session · Active now
          </Typography>
        </Box>
        <Chip label="Current" color="success" size="small" />
      </Stack>
    </Paper>
  )
}