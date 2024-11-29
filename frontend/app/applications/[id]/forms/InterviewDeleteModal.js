'use client'
import { useState } from 'react'
import { useNotification } from '@/components/Context/NotificationContext'
import DeleteModal from '@/components/ui/DeleteModal'

export default function InterviewDeleteModal({ openModal, onClose }) {
  const { showNotification } = useNotification()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDelete = async () => {
    setLoading(true)
    setError('')
    try {
      console.log('Interview will be deleted')
      showNotification('Interview was deleted!')
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
