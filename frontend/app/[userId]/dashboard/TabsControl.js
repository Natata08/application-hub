import { Tabs, Tab } from "@mui/material";

export default function TabsControl({ tabValue, onTabChange }) {
  return (
    <Tabs
      value={tabValue}
      onChange={onTabChange}
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
