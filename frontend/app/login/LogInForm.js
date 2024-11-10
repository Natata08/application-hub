"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Stack,
  Typography,
  Button,
  Paper,
  Box,
  Link
} from "@mui/material";
import InputField from "@/components/ui/InputField";
import { useLogIn } from "@/components/fetches/useLogIn";

export default function LogInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const contactData = watch();

  const handleFormSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      await useLogIn(contactData);
      router.push("/user");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      px: 2
    }}>
      <Paper
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
        autoComplete="off"
        sx={{
          p: { xs: 2, sm: 4, md: 6 },
          width: "100%",
          maxWidth: { xs: 340, sm: 400, md: 600 },
        }}
      >
        <Typography sx={{ paddingBottom: 2, fontSize: { xs: "1.5rem", sm: "2rem" } }}
          gutterBottom
          variant="h4"
          component="div"
          textAlign ="center"
        >
          Welcome back to job application manager
        </Typography>

        {error && (
          <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
    
          <InputField         
            id="email"
            label="E-mail"
            defaultValue="you@yourmail.com"
            register={register}
            errors={errors}
            required
            pattern={{
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            }}
          />

          <InputField         
            type="password"
            id="password"
            label="Password"
            register={register}
            errors={errors}
            required
            pattern={{
              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character, and contain no spaces",
            }}
            minLength={8}
          />

          <Button variant="contained" type="submit" fullWidth>
            {loading ? "Submitting..." : "Log in"}
          </Button>

          <Stack
            direction={{xs: "column", sm: "row"}}
            sx={{
              paddingTop: 2,
              justifyContent: "center",
              alignItems: "center",
              gap: 1
            }}
          >
            <Typography 
              gutterBottom 
              variant="body1" 
              component="p" 
              fontSize={{ xs: "0.875rem", sm: "1rem" }} 
              sx={{paddingTop: "6px" }}
              textAlign ="center"
            >
              Don't you have an account?
            </Typography>
            <Link href={`/register`} display="block">
              <Button variant="text">Sign up</Button>
            </Link>
          </Stack>
      </Paper>
    </Box>
  );
}