'use client'
import { Box, Button } from '@mui/material'
import { useState, useMemo, useCallback } from 'react'
import EmptyState from './EmptyState'
import RichTextEditor from '@/components/ui/RichTextEditor'

const Notes = ({ applicationId }) => {
  const [value, setValue] = useState('')
  const [lastSavedContent, setLastSavedContent] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

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
