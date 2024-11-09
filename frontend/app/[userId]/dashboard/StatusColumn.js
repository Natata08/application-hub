import { Box, Typography, Paper } from "@mui/material";
import ApplicationCard from "./ApplicationCard";

export default function StatusColumn({ status }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        width: "100%",
        minWidth: 180,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2,
          border: 1,
          borderColor: "primary.main",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "background.default",
        }}
      >
        <Typography
          variant='h6'
          sx={{
            color: "text.primary",
            fontWeight: "medium",
            letterSpacing: 2,
          }}
        >
          {status.name}
        </Typography>
        <Typography
          variant='h6'
          sx={{ color: "text.secondary", fontWeight: "medium" }}
        >
          {`${status.count} jobs`}
        </Typography>
      </Paper>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <ApplicationCard />
        <ApplicationCard />
        <ApplicationCard />
      </Box>
    </Box>
  );
}
