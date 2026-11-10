import { Button, Chip, Divider, Paper, Switch } from "@mui/material"
import { SectionTitle, SettingRow } from "./Settings.page"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

export const PrivacySection = () => {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 2.5 }}>
      <SectionTitle
        title="Privacy & Security"
        description="Manage your visibility and account security."
      />

      <SettingRow
        title="Last Seen"
        description="Allow others to see when you were last active."
        action={<Chip label="Everyone" size="small" variant="outlined" />}
      />
      <Divider />
      <SettingRow
        title="Online Status"
        description="Show your online status to other users."
        action={<Switch defaultChecked />}
      />
      <Divider />
      <SettingRow
        title="Read Receipts"
        description="Let others know when you've read their messages."
        action={<Switch defaultChecked />}
      />
      <Divider />
      <SettingRow
        title="Two-Step Verification"
        description="Add another layer of protection to your account."
        action={
          <Button size="small" endIcon={<ChevronRightIcon />}>
            Configure
          </Button>
        }
      />
    </Paper>
  )
}