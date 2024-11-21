'use client'
import { Typography, Button, Paper, Modal, Stack, Box } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import InputField from '@/components/ui/InputField'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useApplicationContext } from '@/components/Context/ApplicationContext'
import { editApplicationAndCompany } from '@/utils/api'

export default function EditFormCompany({ onClose }) {
  const { application, updateApplication } = useApplicationContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const updatedApplicationAndCompanyData = watch()

  const handleEditApplicationSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      await editApplicationAndCompany({
        id: application.application_id,
        updatedApplicationAndCompanyData,
      })
      onClose()
      updateApplication(updatedApplicationAndCompanyData)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleEditApplicationSubmit)}
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
        label="Website Company"
        defaultValue={application.company_website}
        register={register}
        errors={errors}
      />

      <InputField
        id="job_link"
        defaultValue={application.job_link}
        register={register}
        errors={errors}
        multiline
        rows={1}
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
  )
}
