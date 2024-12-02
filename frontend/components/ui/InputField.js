import { useState } from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export default function InputField({
  errors,
  id,
  label,
  defaultValue,
  helperText,
  required,
  minLength,
  multiline,
  rows,
  pattern,
  type = 'text',
  register,
  ref,
}) {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => {
      return !prevShowPassword
    })
  }

  const handleMouseDownPassword = (event) => event.preventDefault()

  return (
    <TextField
      error={!!errors[id]}
      required={required}
      id={id}
      label={label}
      type={type === 'password' && !showPassword ? 'password' : 'text'}
      defaultValue={defaultValue}
      multiline={multiline}
      rows={rows}
      fullWidth
      variant="outlined"
      ref={ref}
      {...register(id, {
        minLength: {
          value: minLength,
          message: `${label} must be at least ${minLength} characters long`,
        },
        pattern: {
          value: pattern?.value,
          message: pattern?.message,
        },
        required: required ? `${label} is required` : undefined,
      })}
      helperText={errors[id] ? errors[id].message : helperText}
      slotProps={{
        input: {
          endAdornment: type === 'password' && (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
          startAdornment: id === 'salary' && (
            <InputAdornment position="start">DKK</InputAdornment>
          ),
        },
      }}
      autoComplete={type === 'password' ? 'current-password' : 'off'}
    />
  )
}
