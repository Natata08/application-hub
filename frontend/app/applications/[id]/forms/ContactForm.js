'use client'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Typography, Button, Stack, Box } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import InputField from '@/components/ui/InputField'
import { useNotification } from '@/components/Context/NotificationContext'
import { ModalWrapper } from '@/components/ui/ModalWrapper'

export default function ContactForm({ openModal, onClose, mode }) {
  const { showNotification } = useNotification()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleSubmitForm = async (data) => {
    setLoading(true)
    setError('')
    try {
      if (mode === 'edit') {
        await patchContact(data)
        showNotification('Contact updated successfully!')
      } else if (mode === 'add') {
        await postContact(data)
        showNotification('Contact added successfully!')
      }
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalWrapper
      open={openModal}
      handleClose={onClose}
      title={mode === 'edit' ? 'Edit Company Contact' : 'Add Company Contact'}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(handleSubmitForm)}
        noValidate
        autoComplete="off"
      >
        {error && (
          <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <InputField
          id="name"
          label="Name"
          required
          defaultValue={mode === 'edit' ? 'name' : ''}
          register={register}
          errors={errors}
        />
        <InputField
          id="role"
          label="Position"
          defaultValue={mode === 'edit' ? 'role' : ''}
          register={register}
          errors={errors}
        />
        <InputField
          id="phone"
          label="Phone"
          defaultValue={mode === 'edit' ? 'phone' : ''}
          register={register}
          errors={errors}
        />
        <InputField
          id="email"
          label="Email"
          defaultValue={mode === 'edit' ? 'email' : ''}
          register={register}
          errors={errors}
        />

        <Stack
          spacing={2}
          direction="row"
          sx={{
            justifyContent: 'end',
            alignItems: 'center',
            paddingTop: { xs: 0, sm: 1 },
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{ width: '92px' }}
            size="small"
          >
            Cancel
          </Button>

          {loading ? (
            <LoadingButton
              size="small"
              loading={loading}
              variant="outlined"
              disabled
            >
              Disabled
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              type="submit"
              sx={{ width: '92px' }}
              size="small"
            >
              Save
            </Button>
          )}
        </Stack>
      </Box>
    </ModalWrapper>
  )
}
