import { Chip, Divider, Paper, Switch } from "@mui/material"
import { SectionTitle, SettingRow } from "./Settings.page"

export const AppearanceSection = () => {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 2.5 }}>
      <SectionTitle
        title="Appearance"
        description="Customize how your chat application looks."
      />

      <SettingRow
        title="Dark Mode"
        description="Use a dark interface throughout the application."
        action={<Switch />}
      />
      <Divider />
      <SettingRow
        title="Compact Mode"
        description="Reduce spacing between chat messages."
        action={<Switch />}
      />
      <Divider />
      <SettingRow
        title="Font Size"
        description="Adjust the text size in conversations."
        action={
          <Chip label="Medium" size="small" variant="outlined" />
        }
      />
    </Paper>
  )
}