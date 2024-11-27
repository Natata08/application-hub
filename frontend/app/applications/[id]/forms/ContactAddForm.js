'use client'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Typography, Button, Stack, Box } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import InputField from '@/components/ui/InputField'
import { useApplicationContext } from '@/components/Context/ApplicationContext'
import { useNotification } from '@/components/Context/NotificationContext'
import { ModalWrapper } from '@/components/ui/ModalWrapper'

export default function ContactAddForm({ openModal, onClose }) {
  const { application } = useApplicationContext()
  const { showNotification } = useNotification()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleAddContactSubmit = async () => {
    console.log('added')
    onClose()
    showNotification('Contact added successfully!')
    // setLoading(true)
    // setError('')
    // try {
    //   await postContact(console.log('added'))
    //   onClose()
    //   showNotification('Contact added successfully!')
    // } catch (error) {
    //   setError(error.message)
    // } finally {
    //   setLoading(false)
    // }
  }

  return (
    <ModalWrapper
      open={openModal}
      handleClose={onClose}
      title="Add Company Contact"
    >
      <Box
        component="form"
        onSubmit={handleSubmit(handleAddContactSubmit)}
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
          register={register}
          errors={errors}
        />
        <InputField
          id="role"
          label="Position"
          register={register}
          errors={errors}
        />
        <InputField
          id="phone"
          label="Phone"
          register={register}
          errors={errors}
        />
        <InputField
          id="email"
          label="Email"
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
