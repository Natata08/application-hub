'use client'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import { Button, Stack, Box, Alert } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import InputField from '@/components/ui/InputField'
import { useNotification } from '@/components/Context/NotificationContext'
import { ModalWrapper } from '@/components/ui/ModalWrapper'
import { useApplicationContext } from '@/components/Context/ApplicationContext'
import {
  addContactByApplicationId,
  patchContactByApplicationId,
} from '@/utils/api'
import { MuiTelInput } from 'mui-tel-input'

export default function ContactForm({
  openModal,
  onClose,
  mode,
  onContactAdd,
  onContactEdited,
  contact,
  currentName,
}) {
  const { application } = useApplicationContext()
  const { showNotification } = useNotification()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const applicationId = application.application_id

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const handleSubmitForm = async (contactData) => {
    setLoading(true)
    setError('')
    try {
      if (mode === 'edit') {
        const updatedContact = await patchContactByApplicationId(
          applicationId,
          contactData,
          currentName
        )
        if (onContactEdited) {
          onContactEdited(updatedContact)
        }
        showNotification('Contact updated successfully!')
      } else if (mode === 'add') {
        const newContact = await addContactByApplicationId(
          applicationId,
          contactData
        )
        showNotification('Contact added successfully!')
        if (onContactAdd) {
          onContactAdd(newContact)
        }
      }
      onClose()
    } catch (error) {
      setError(error.message)
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
        {error && <Alert severity="error">{error}</Alert>}

        <InputField
          id="name"
          label="Name"
          required
          defaultValue={mode === 'edit' ? contact.name : null}
          register={register}
          errors={errors}
        />
        <InputField
          id="role"
          label="Position"
          defaultValue={mode === 'edit' ? contact.role : null}
          register={register}
          errors={errors}
        />

        <InputField
          id="email"
          label="Email"
          defaultValue={mode === 'edit' ? contact.email : null}
          register={register}
          errors={errors}
          pattern={{
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regex for email validation
            message: 'Please enter a valid email address',
          }}
        />
        <Controller
          name="phone"
          control={control}
          defaultValue={mode === 'edit' ? contact.phone : null}
          render={({ field }) => (
            <MuiTelInput
              {...field}
              label="Phone"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone?.message}
              onChange={(value) => setValue('phone', value)}
              defaultCountry="DK"
            />
          )}
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
