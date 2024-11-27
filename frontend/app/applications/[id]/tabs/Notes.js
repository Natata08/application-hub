'use client'
import { Box, Button } from '@mui/material'
import { useState, useEffect, useCallback, useMemo } from 'react'
import EmptyState from './EmptyState'
import RichTextEditor from '@/components/ui/RichTextEditor'
import { useApplicationContext } from '@/components/Context/ApplicationContext'
import {
  getNoteByApplicationId,
  createOrUpdateNote,
  deleteNote,
} from '@/utils/api'

const Notes = () => {
  const [value, setValue] = useState('')
  const [lastSavedContent, setLastSavedContent] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)

  const { application } = useApplicationContext()
  const applicationId = application.application_id

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const note = await getNoteByApplicationId(applicationId)
        if (note) {
          setValue(note.content)
          setLastSavedContent(note.content)
        }
      } catch (error) {
        console.error('Error fetching note:', error)
        setError(error.message)
      }
    }

    fetchNote()
  }, [applicationId])

  const hasContent = value && value !== '<p><br></p>'

  const handleSave = useCallback(async () => {
    setIsSaving(true)
    try {
      await createOrUpdateNote({
        id: applicationId,
        content: value,
      })
      setLastSavedContent(value)
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving notes:', error)
      setError(error.message)
    } finally {
      setIsSaving(false)
    }
  }, [value, applicationId])

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

  const handleDelete = useCallback(async () => {
    try {
      await deleteNote(applicationId)
      setValue('')
      setLastSavedContent(null)
      setIsEditing(false)
    } catch (error) {
      console.error('Error deleting note:', error)
      setError(error.message)
    }
  }, [applicationId])

  const renderEditor = useMemo(
    () => (
      <RichTextEditor
        value={value}
        onChange={setValue}
        isEditing={isEditing}
        sx={{
          display: hasContent || isEditing ? 'block' : 'none',
        }}
      />
    ),
    [value, hasContent, isEditing]
  )

  return (
    <Box sx={{ marginTop: 2, padding: 1 }}>
      {renderEditor}
      {!hasContent && !isEditing && (
        <EmptyState onAction={handleEdit} subject="notes" buttonText="Add" />
      )}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        {isEditing ? (
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
        ) : (
          hasContent && (
            <>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button variant="contained" size="small" onClick={handleEdit}>
                Edit
              </Button>
            </>
          )
        )}
      </Box>
    </Box>
  )
}

export default Notes
