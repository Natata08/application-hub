import { Paper, Typography, Box } from "@mui/material";

export default function ApplicationCard() {
  return (
    <Paper
      sx={{
        p: 2,

        borderRadius: 2,
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <Typography variant='body2' sx={{ color: "text.secondary", mb: 1 }}>
        Company
      </Typography>
      <Typography
        variant='h6'
        component='h3'
        sx={{ color: "text.primary", mb: 2 }}
      >
        Web Developer
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Typography variant='body2' sx={{ color: "text.secondary" }}>
          1w
        </Typography>
      </Box>
    </Paper>
  );
}
