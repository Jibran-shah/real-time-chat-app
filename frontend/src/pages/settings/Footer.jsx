import { Button, Paper, Stack, Typography } from "@mui/material"

export const Footer = () => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <Typography fontWeight={700} fontSize={14}>
        Chat Application
      </Typography>
      <Typography color="text.secondary" fontSize={12} mt={0.5}>
        Version 1.0.0
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          mt:1.5,
          justifyContent:"center"
        }}
      >
        <Button size="small">Privacy Policy</Button>
        <Button size="small">Terms of Service</Button>
      </Stack>
    </Paper>
  )
}