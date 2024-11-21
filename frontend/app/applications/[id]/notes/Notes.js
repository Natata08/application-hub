'use client'
import { Box, Button } from '@mui/material'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material'
import EmptyNotes from './EmptyNotes'

const Notes = ({ applicationId }) => {
  const [value, setValue] = useState('')
  const [lastSavedContent, setLastSavedContent] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const theme = useTheme()

  const editorStyles = {
    '.ql-container': {
      height: '300px',
      backgroundColor: theme.palette.background.paper,
      borderRadius: '0 0 4px 4px',
      border: `1px solid ${theme.palette.divider}`,
      borderTop: 0,
      fontSize: '0.8rem',
    },
    '.ql-toolbar': {
      backgroundColor: theme.palette.background.paper,
      borderRadius: '4px 4px 0 0',
      border: `1px solid ${theme.palette.divider}`,
    },
    '.ql-stroke': {
      stroke: `${theme.palette.text.primary} !important`,
    },
    '.ql-fill': {
      fill: `${theme.palette.text.primary} !important`,
    },
    '.ql-picker': {
      color: `${theme.palette.text.primary} !important`,
    },
    '.ql-picker-options': {
      backgroundColor: `${theme.palette.background.paper} !important`,
      border: `1px solid ${theme.palette.divider}`,
    },
    '.ql-tooltip': {
      backgroundColor: `${theme.palette.background.paper} !important`,
      color: `${theme.palette.text.primary} !important`,
      border: `1px solid ${theme.palette.divider}`,
    },
    // Style for active buttons
    '.ql-active': {
      '.ql-stroke': {
        stroke: `${theme.palette.secondary.main} !important`,
      },
      '.ql-fill': {
        fill: `${theme.palette.secondary.main} !important`,
      },
    },
    // Hover states
    '.ql-toolbar button:hover': {
      '.ql-stroke': {
        stroke: `${theme.palette.secondary.main} !important`,
      },
      '.ql-fill': {
        fill: `${theme.palette.secondary.main} !important`,
      },
    },
    '.ql-toolbar .ql-picker-label:hover': {
      color: `${theme.palette.secondary.main} !important`,
    },
    // Style for header dropdown
    '.ql-picker.ql-header': {
      '.ql-picker-label:hover': {
        color: `${theme.palette.secondary.main} !important`,
      },
      '.ql-picker-item:hover': {
        color: `${theme.palette.secondary.main} !important`,
      },
      '.ql-picker-item.ql-selected': {
        color: `${theme.palette.secondary.main} !important`,
      },
      '.ql-picker-label.ql-active': {
        color: `${theme.palette.secondary.main} !important`,
      },
    },
  }

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
    readOnly: !isEditing,
  })

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setValue(quill.root.innerHTML)
      })
    }
  }, [quill])

  useEffect(() => {
    if (quill) {
      // Set text color
      quill.root.style.color = theme.palette.text.primary

      // Handle toolbar visibility
      const toolbar = document.querySelector('.ql-toolbar')
      if (toolbar) {
        toolbar.style.display = isEditing ? 'block' : 'none'
      }

      // Handle container styling
      const container = document.querySelector('.ql-container')
      if (container) {
        container.style.border = isEditing
          ? `1px solid ${theme.palette.divider}`
          : 'none'
        quill.enable(isEditing)
      }
    }
  }, [
    quill,
    theme.palette.mode,
    isEditing,
    theme.palette.text.primary,
    theme.palette.divider,
  ])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      console.log('notes:', value)
      setLastSavedContent(quill.getContents())
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving notes:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    if (quill && lastSavedContent) {
      quill.setContents(lastSavedContent)
    }
  }

  return (
    <Box sx={{ marginTop: 2, padding: 1 }}>
      <Box sx={editorStyles}>
        {!value && !isEditing ? <EmptyNotes /> : <div ref={quillRef} />}
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        {!isEditing ? (
          <Button variant="contained" size="small" onClick={handleEdit}>
            Edit
          </Button>
        ) : (
          <>
            <Button variant="outlined" size="small" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}

export default Notes
