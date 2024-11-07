import { Box, Container } from "@mui/material";
import LogInForm from "./LogInForm";

export const LogIn = () => {
  return (
    <Box component="main">
      <Container>
        <LogInForm /> 
      </Container>
    </Box>
  );
};

export default LogIn;