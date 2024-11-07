import { Box, Container } from "@mui/material";
import SignUpForm from "./SignUpForm";

export const SignUp = () => {
  return (
    <Box component="main">
      <Container>
        <SignUpForm /> 
      </Container>
    </Box>
  );
};

export default SignUp;