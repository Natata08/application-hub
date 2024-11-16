'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Stack,
  Typography,
  Button,
  Paper,
  Box,
  Link,
  Alert,
} from '@mui/material'
import InputField from '@/components/ui/InputField'
import { makeSignUpApiCall } from '@/utils/makeSignUpApiCall'
import { useRouter } from 'next/navigation'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import { useAuth } from '@/components/Context/authentication'

export default function SignUpForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const userData = watch()

  const handleFormSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await makeSignUpApiCall(userData)
      login(data.userInfo, data.token)
      router.push('/user')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        px: 2,
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
        autoComplete="off"
        sx={{
          p: { xs: 2, sm: 4, md: 6 },
          width: '100%',
          maxWidth: { xs: 340, sm: 400, md: 600 },
        }}
      >
        <Typography
          sx={{ paddingBottom: 2, fontSize: { xs: '1.5rem', sm: '2rem' } }}
          gutterBottom
          variant="h4"
          component="div"
          textAlign="center"
        >
          Welcome to job application manager
        </Typography>

        {error && (
          <Alert sx={{ mb: 2 }} severity="error">
            {error}
          </Alert>
        )}

        <InputField
          id="first_name"
          label="First name"
          register={register}
          errors={errors}
          required
          pattern={{
            value: /^.{2,}$/,
            message: 'First name must contain at least 2 characters long',
          }}
          minLength={2}
        />

        <InputField
          id="last_name"
          label="Last name"
          register={register}
          errors={errors}
          required
          pattern={{
            value: /^.{2,}$/,
            message: 'Last name must contain at least 2 characters long',
          }}
          minLength={2}
        />

        <InputField
          id="email"
          label="E-mail"
          register={register}
          errors={errors}
          required
          pattern={{
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address',
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
            value:
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message:
              'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character, and contain no spaces',
          }}
          minLength={8}
        />
        {loading ? (
          <LoadingButton
            loading
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            fullWidth
          >
            Submitting...
          </LoadingButton>
        ) : (
          <Button variant="contained" type="submit" fullWidth>
            Sign up
          </Button>
        )}

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            paddingTop: 2,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography
            gutterBottom
            variant="body1"
            component="p"
            fontSize={{ xs: '0.875rem', sm: '1rem' }}
            sx={{ paddingTop: '6px' }}
            textAlign="center"
          >
            Already using Application Hub?
          </Typography>
          <Link href={`/login`} display="block">
            <Button variant="text">Log in</Button>
          </Link>
        </Stack>
      </Paper>
    </Box>
  )
}
