import { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchField from "./SearchField";
import SortControl from "./SortControl";
import TabsControl from "./TabsControl";

export default function ControlPanel() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 2, md: 0 },
        width: "100%",
      }}
    >
      {/* Controls - on top for mobile */}
      <Stack
        direction='row'
        alignItems='center'
        sx={{
          width: "100%",
          order: { xs: 1, md: 2 },
          justifyContent: { xs: "flex-start", md: "flex-end" },
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <SearchField />
        <SortControl />
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          sx={{
            textTransform: "none",
          }}
        >
          Add a job
        </Button>
      </Stack>

      {/* Tabs - below for mobile */}
      <TabsControl value={value} onChange={handleChange} />
    </Box>
  );
}
