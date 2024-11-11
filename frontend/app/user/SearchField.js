import { InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchField() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        "&:hover": {
          backgroundColor: "action.hover",
        },
        "&:focus-within": {
          backgroundColor: "action.hover",
          borderColor: "secondary.main",
        },
      }}
    >
      <SearchIcon
        sx={{
          padding: "8px",
          color: "text.secondary",
          fontSize: 35,
        }}
      />
      <InputBase
        placeholder='Search'
        sx={{
          "& .MuiInputBase-input": {
            padding: "8px 0",
            fontSize: 14,
            "&::placeholder": {
              color: "text.secondary",
              opacity: 1,
            },
          },
        }}
      />
    </Box>
  );
}
