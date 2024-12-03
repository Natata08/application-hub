'use client'
import { useState } from 'react'
import { useNotification } from '@/components/Context/NotificationContext'
import DeleteModal from '@/components/ui/DeleteModal'
import { deleteInterviewByApplicationId } from '@/utils/api'
import { useApplicationContext } from '@/components/Context/ApplicationContext'

export default function InterviewDeleteModal({
  openModal,
  onClose,
  onInterviewDeleted,
  interviewId,
}) {
  const { application } = useApplicationContext()
  const { showNotification } = useNotification()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const applicationId = application.application_id

  const handleDelete = async () => {
    setLoading(true)
    setError('')
    try {
      await deleteInterviewByApplicationId(applicationId, interviewId)
      onInterviewDeleted(interviewId)
      showNotification('Contact was deleted!')
      onClose()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DeleteModal
      openModal={openModal}
      onClose={onClose}
      title="Are you sure you want to delete this interview?"
      error={error}
      loading={loading}
      onConfirm={handleDelete}
      cancelLabel="No, keep the interview"
      confirmLabel="Yes, delete the interview"
    />
  )
}
