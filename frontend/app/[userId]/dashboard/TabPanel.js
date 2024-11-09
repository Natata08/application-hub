import { Box } from "@mui/material";

export default function TabPanel({ children, value, index, ...props }) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`applications-tabpanel-${index}`}
      aria-labelledby={`applications-tab-${index}`}
      {...props}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}
