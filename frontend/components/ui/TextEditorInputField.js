'use client'
import { FormHelperText, InputLabel, Box, FormControl } from '@mui/material'
import RichTextEditor from './RichTextEditor'

export default function TextEditorInputField({
  id,
  label,
  defaultValue,
  errors,
  onChange,
}) {
  return (
    <FormControl
      fullWidth
      sx={{ paddingTop: 2, marginBottom: 2 }}
      variant="standard"
    >
      <InputLabel
        shrink
        htmlFor={id}
        sx={{
          paddingLeft: 2,
          color: 'text.secondary',
          transition: 'color 0.3s ease',
          '&:hover': {
            color: 'accent.main',
          },
          '&.Mui-focused': {
            color: 'accent.main',
          },
        }}
      >
        {label}
      </InputLabel>
      <RichTextEditor
        value={defaultValue}
        onChange={(value) => onChange(value)}
        isEditing={true}
        sx={{
          '.ql-container': {
            fontSize: '1rem',
          },
          '.ql-toolbar': {
            '&:hover': {
              borderColor: 'accent.main',
            },
          },
        }}
      />
      {errors?.[id] && (
        <FormHelperText error>{errors[id]?.message}</FormHelperText>
      )}
    </FormControl>
  )
}
