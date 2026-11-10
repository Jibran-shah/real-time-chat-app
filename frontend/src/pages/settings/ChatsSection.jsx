import { Divider, Paper, Switch } from "@mui/material"
import { SectionTitle, SettingRow } from "./Settings.page"

export const ChatsSection = () => {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 2.5 }}>
      <SectionTitle
        title="Chat Preferences"
        description="Manage your conversation experience."
      />

      <SettingRow
        title="Enter to Send"
        description="Press Enter to send messages instead of creating a new line."
        action={<Switch defaultChecked />}
      />
      <Divider />
      <SettingRow
        title="Media Auto Download"
        description="Automatically download images and videos."
        action={<Switch />}
      />
      <Divider />
      <SettingRow
        title="Archive Chats"
        description="Keep archived chats hidden from your main chat list."
        action={<Switch />}
      />
    </Paper>
  )
}