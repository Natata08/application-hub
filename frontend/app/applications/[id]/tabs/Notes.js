'use client'
import { Box, Button } from '@mui/material'
import { useState, useMemo, useCallback } from 'react'
import EmptyState from './EmptyState'
import RichTextEditor from '@/components/ui/RichTextEditor'
import Quill from 'quill'
const Delta = Quill.import('delta')

const Notes = ({ applicationId }) => {
  const [value, setValue] = useState('')
  const [lastSavedContent, setLastSavedContent] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const theme = useTheme()

  const editorStyles = useMemo(
    () => ({
      '.ql-container': {
        minHeight: '200px',
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
      '.ql-editor': {
        minHeight: '200px',
        height: 'auto',
        overflow: 'hidden', // Change from 'auto' to 'hidden'
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
      '.ql-toolbar.ql-snow .ql-formats': {
        marginRight: '10px',
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
    }),
    [
      theme.palette.background.paper,
      theme.palette.divider,
      theme.palette.text.primary,
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
      clipboard: {
        matchers: [
          [
            Node.ELEMENT_NODE,
            function (node, delta) {
              return delta.compose(
                new Delta().retain(delta.length(), {
                  color: false,
                  background: false,
                  font: false,
                  size: false,
                  indent: false,
                  align: false,
                  direction: false,
                })
              )
            },
          ],
        ],
      },
    },
    theme: 'snow',
    readOnly: !isEditing,
  })

  const hasContent = value && value !== '<p><br></p>'

  const handleSave = useCallback(async () => {
    setIsSaving(true)
    try {
      console.log('notes:', value)
      setLastSavedContent(value)
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving notes:', error)
    } finally {
      setIsSaving(false)
    }
  }, [value])

  const handleEdit = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleCancel = useCallback(() => {
    setIsEditing(false)
    if (lastSavedContent) {
      setValue(lastSavedContent)
    } else {
      setValue('')
    }
  }, [lastSavedContent])

  const renderEditor = useMemo(
    () => (
      <RichTextEditor
        onChange={setValue}
        isEditing={isEditing}
        sx={{
          display: hasContent || isEditing ? 'block' : 'none',
        }}
      />
    ),
    [hasContent, isEditing]
  )

  const renderEmptyState = useMemo(
    () => <EmptyState onAction={handleEdit} subject="notes" buttonText="Add" />,
    [handleEdit]
  )

  const renderEditButton = useMemo(
    () => (
      <Button variant="contained" size="small" onClick={handleEdit}>
        Edit
      </Button>
    ),
    [handleEdit]
  )

  const renderSaveCancelButtons = useMemo(
    () => (
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
    ),
    [handleCancel, handleSave, isSaving]
  )

  return (
    <Box sx={{ marginTop: 2, padding: 1 }}>
      {renderEditor}
      {!hasContent && !isEditing && renderEmptyState}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        {isEditing ? renderSaveCancelButtons : hasContent && renderEditButton}
      </Box>
    </Box>
  )
}

export default Notes
