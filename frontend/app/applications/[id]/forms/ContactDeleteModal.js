'use client'
import { useState } from 'react'
import { useNotification } from '@/components/Context/NotificationContext'
import DeleteModal from '@/components/ui/DeleteModal'
import { deleteContact } from '@/utils/api'

export default function ContactDeleteModal({ openModal, onClose }) {
  const { showNotification } = useNotification()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDelete = async () => {
    setLoading(true)
    setError('')
    try {
      await deleteContact()
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
      title="Are you sure you want to delete this contact?"
      error={error}
      loading={loading}
      onConfirm={handleDelete}
      cancelLabel="No, keep the contact"
      confirmLabel="Yes, delete the contact"
    />
  )
}
