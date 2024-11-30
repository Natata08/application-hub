'use client'
import { Box, Button, Alert } from '@mui/material'
import { useState, useEffect, useCallback, useMemo } from 'react'
import EmptyState from './EmptyState'
import RichTextEditor from '@/components/ui/RichTextEditor'
import Loader from '@/components/ui/Loader'
import { useApplicationContext } from '@/components/Context/ApplicationContext'
import {
  getNoteByApplicationId,
  createOrUpdateNote,
  deleteNote,
} from '@/utils/api'
import { useNotification } from '@/components/Context/NotificationContext'
import DeleteModal from '@/components/ui/DeleteModal'

const Notes = () => {
  const [value, setValue] = useState('')
  const [lastSavedContent, setLastSavedContent] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteError, setDeleteError] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const { application } = useApplicationContext()
  const applicationId = application.application_id

  const { showNotification } = useNotification()

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const note = await getNoteByApplicationId(applicationId)
        if (note.content) {
          setValue(note.content)
          setLastSavedContent(note.content)
        }
      } catch (error) {
        console.error('Error fetching note:', error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNote()
  }, [applicationId])

  const hasContent = value && value !== '<p><br></p>'

  const handleSave = useCallback(async () => {
    if (!hasContent) {
      showNotification('Note content cannot be empty', 'warning')
      return
    }

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
  }, [value, applicationId, hasContent, showNotification])

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

  const handleDeleteClick = useCallback(() => {
    setIsDeleteModalOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(async () => {
    setIsDeleting(true)
    setDeleteError(null)
    try {
      await deleteNote(applicationId)
      setValue('')
      setLastSavedContent(null)
      setIsEditing(false)
      setIsDeleteModalOpen(false)
      showNotification('Note deleted successfully!', 'success')
    } catch (error) {
      console.error('Error deleting note:', error)
      setDeleteError(error.message)
    } finally {
      setIsDeleting(false)
    }
  }, [applicationId, showNotification])

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteModalOpen(false)
  }, [])

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

  const renderEditButtons = useMemo(
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
    [isSaving, handleCancel, handleSave]
  )

  const renderViewButtons = useMemo(
    () => (
      <>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={handleDeleteClick}
        >
          Delete
        </Button>
        <Button variant="contained" size="small" onClick={handleEdit}>
          Edit
        </Button>
      </>
    ),
    [handleDeleteClick, handleEdit]
  )

  if (isLoading) {
    return <Loader height="200px" />
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <Box sx={{ padding: 1 }}>
      {renderEditor}
      {!hasContent && !isEditing && (
        <EmptyState
          onAction={handleEdit}
          subject="notes"
          buttonText="Add Note"
        />
      )}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        {isEditing ? renderEditButtons : hasContent && renderViewButtons}
      </Box>
      <DeleteModal
        openModal={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        title="Are you sure you want to delete this note?"
        error={deleteError}
        loading={isDeleting}
        onConfirm={handleDeleteConfirm}
        cancelLabel="No, keep the note"
        confirmLabel="Yes, delete the note"
      />
    </Box>
  )
}

export default Notes
