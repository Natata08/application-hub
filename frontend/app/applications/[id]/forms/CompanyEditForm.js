'use client'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Typography, Button, Stack, Box } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import InputField from '@/components/ui/InputField'
import { patchCompany } from '@/utils/api'
import { useApplicationContext } from '@/components/Context/ApplicationContext'
import { useNotification } from '@/components/Context/NotificationContext'
import { ModalWrapper } from '@/components/ui/ModalWrapper'

export default function CompanyEditForm({ openModal, onClose }) {
  const { application, updateApplication } = useApplicationContext()
  const { showNotification } = useNotification()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleEditCompanySubmit = async (updatedData) => {
    setLoading(true)
    setError('')
    try {
      await patchCompany({
        id: application.application_id,
        updatedData,
      })
      updateApplication(updatedData)
      onClose()
      showNotification('Company updated successfully!')
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
      title="Edit a Company Information"
    >
      <Box
        component="form"
        onSubmit={handleSubmit(handleEditCompanySubmit)}
        noValidate
        autoComplete="off"
      >
        {error && (
          <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <InputField
          id="company_name"
          label="Company Name"
          defaultValue={application.company_name}
          required
          register={register}
          errors={errors}
        />
        <InputField
          id="company_location"
          label="Location"
          defaultValue={application.company_location}
          register={register}
          errors={errors}
        />
        <InputField
          id="company_website"
          label="Company Website"
          defaultValue={application.company_website}
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
