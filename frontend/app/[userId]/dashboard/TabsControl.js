import { Tabs, Tab } from "@mui/material";

export default function TabsControl({ value, onChange }) {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      sx={{
        minWidth: 200,
        order: { xs: 2, md: 1 },
        "& .MuiTab-root": {
          textTransform: "none",
        },
        "& .MuiTabs-indicator": {
          backgroundColor: "secondary.main",
        },
      }}
    >
      <Tab label='In progress' />
      <Tab label='Done' />
    </Tabs>
  );
}
