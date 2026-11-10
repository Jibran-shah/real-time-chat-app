import { Divider, Paper, Switch } from "@mui/material"
import { SectionTitle, SettingRow } from "./Settings.page"

export const NotificationSection = () => {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 2.5 }}>
      <SectionTitle
        title="Notifications"
        description="Control how you receive notifications."
      />

      <SettingRow
        title="Message Notifications"
        description="Receive notifications for new messages."
        action={<Switch defaultChecked />}
      />
      <Divider />

      <SettingRow
        title="Group Notifications"
        description="Receive notifications from group chats."
        action={<Switch defaultChecked />}
      />
      <Divider />
      <SettingRow
        title="Sound"
        description="Play a sound when receiving messages."
        action={<Switch defaultChecked />}
      />
      <Divider />
      <SettingRow
        title="Message Previews"
        description="Show message content in notifications."
        action={<Switch />}
      />
    </Paper>
  )
}
          