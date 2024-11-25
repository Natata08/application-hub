'use client'
import React, { useEffect, useMemo } from 'react'
import DOMPurify from 'dompurify'
import { Box, FormControl, FormHelperText, InputLabel } from '@mui/material'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import { useTheme } from '@mui/material'

export default function JobDescriptionInput({
  id,
  label,
  defaultValue,
  errors,
  onChange,
  rows = 4,
}) {
  const theme = useTheme()

  const editorStyles = useMemo(
    () => ({
      marginBottom: 2,
      '& .ql-container': {
        minHeight: rows * 24 + 'px',
        maxHeight: 'auto',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '0 0 4px 4px',
        overflowY: 'auto',
        fontSize: '1rem',
        transition: 'border-color 0.3s ease',
        '&:hover': {
          borderColor: theme.palette.accent.main,
        },
      },
      '& .ql-toolbar': {
        marginTop: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '4px 4px 0 0',
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
          borderColor: theme.palette.accent.main,
        },
      },
      '& .ql-stroke': {
        stroke: `${theme.palette.text.primary} !important`,
      },
      '& .ql-fill': {
        fill: `${theme.palette.text.primary} !important`,
      },
      '& .ql-picker': {
        color: `${theme.palette.text.primary} !important`,
      },
      '& .ql-picker-options': {
        backgroundColor: `${theme.palette.background.paper} !important`,
        border: `1px solid ${theme.palette.divider}`,
      },
      '& .ql-tooltip': {
        backgroundColor: `${theme.palette.background.paper} !important`,
        color: `${theme.palette.text.primary} !important`,
        border: `1px solid ${theme.palette.divider}`,
      },
      '& .ql-toolbar.ql-snow .ql-formats': {
        marginRight: '10px',
      },
      // Style for active buttons
      '& .ql-active': {
        '.ql-stroke': {
          stroke: `${theme.palette.secondary.main} !important`,
        },
        '.ql-fill': {
          fill: `${theme.palette.secondary.main} !important`,
        },
      },
      // Hover states
      '& .ql-toolbar button:hover': {
        '& .ql-stroke': {
          stroke: `${theme.palette.secondary.main} !important`,
        },
        '& .ql-fill': {
          fill: `${theme.palette.secondary.main} !important`,
        },
      },
      '& .ql-toolbar & .ql-picker-label:hover': {
        color: `${theme.palette.secondary.main} !important`,
      },
      // Style for header dropdown
      '& .ql-picker.ql-header': {
        '& .ql-picker-label:hover': {
          color: `${theme.palette.secondary.main} !important`,
        },
        '& .ql-picker-item:hover': {
          color: `${theme.palette.secondary.main} !important`,
        },
        '& .ql-picker-item.ql-selected': {
          color: `${theme.palette.secondary.main} !important`,
        },
        '& .ql-picker-label.ql-active': {
          color: `${theme.palette.secondary.main} !important`,
        },
      },
    }),
    [
      rows,
      theme.palette.background.paper,
      theme.palette.text.primary,
      theme.palette.divider,
      theme.palette.accent.main,
      theme.palette.secondary.main,
    ]
  )

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ header: [1, 2, 3, false] }],
        ['clean'],
      ],
    },
    theme: 'snow',
  })

  // Populate default value into the editor
  useEffect(() => {
    if (quill && defaultValue) {
      const sanitizedValue = DOMPurify.sanitize(defaultValue)
      quill.root.innerHTML = sanitizedValue
    }
  }, [quill, defaultValue])

  // Unified text-change handler to clean up styles and save cleaned content
  useEffect(() => {
    if (quill) {
      const handleTextChange = () => {
        const rawHTML = quill.root.innerHTML
        const sanitizedHTML = DOMPurify.sanitize(rawHTML)

        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = sanitizedHTML

        // Remove inline color and background-color styles
        tempDiv.querySelectorAll('*').forEach((el) => {
          el.style.color = ''
          el.style.backgroundColor = ''
        })

        const cleanedHTML = tempDiv.innerHTML
        if (onChange) onChange(cleanedHTML)
      }

      quill.on('text-change', handleTextChange)

      return () => {
        quill.off('text-change', handleTextChange)
      }
    }
  }, [quill, onChange])

  // Handle paste events to sanitize content
  useEffect(() => {
    if (quill) {
      const handlePaste = (event) => {
        event.preventDefault()
        const clipboardData = event.clipboardData || window.Clipboard
        const html =
          clipboardData.getData('text/html') ||
          clipboardData.getData('text/plain')

        // Let Quill handle the content with its clipboard module
        quill.clipboard.dangerouslyPasteHTML(html)

        // After the content is pasted, enforce styles
        setTimeout(() => {
          const editor = quill.root

          // Enforce color and backgroundColor for all child elements
          Array.from(editor.querySelectorAll('*')).forEach((el) => {
            el.style.color = theme.palette.text.primary
            el.style.backgroundColor = theme.palette.background.paper
          })
        }, 0)
      }

      quill.root.addEventListener('paste', handlePaste)

      return () => {
        quill.root.removeEventListener('paste', handlePaste)
      }
    }
  }, [quill, theme.palette.text.primary, theme.palette.background.paper])

  useEffect(() => {
    if (quill) {
      const handleSave = () => {
        const rawHTML = quill.root.innerHTML

        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = rawHTML

        tempDiv.querySelectorAll('*').forEach((el) => {
          el.style.color = ''
          el.style.backgroundColor = ''
        })

        const cleanedHTML = tempDiv.innerHTML
        onChange(cleanedHTML)
      }

      quill.on('text-change', handleSave)

      return () => {
        quill.off('text-change', handleSave)
      }
    }
  }, [quill, onChange])

  return (
    <FormControl variant="standard" fullWidth sx={editorStyles}>
      <InputLabel
        shrink
        htmlFor={id}
        sx={{
          paddingLeft: 2,
          color: theme.palette.text.secondary,
          transition: 'color 0.3s ease',
          '&:hover': {
            color: theme.palette.accent.main,
          },
          '&.Mui-focused': {
            color: theme.palette.accent.main,
          },
        }}
      >
        {label}
      </InputLabel>

      <Box ref={quillRef} />

      {errors?.[id] && (
        <FormHelperText error>{errors[id]?.message}</FormHelperText>
      )}
    </FormControl>
  )
}
