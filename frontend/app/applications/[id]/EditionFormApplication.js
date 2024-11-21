'use client'
import { Typography, Button, Paper, Modal, Stack } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import InputField from '@/components/ui/InputField'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useApplicationContext } from '@/components/Context/ApplicationContext'
import { editApplicationAndCompany } from '@/utils/api'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 800,
  border: '0px solid #FFFF',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  overflow: 'hidden',
  maxHeight: 600,
  height: 'auto',
  overflowY: 'auto',
  padding: '16px',
  width: '100%',
  '@media (max-width: 900px)': {
    maxWidth: '90%',
  },
}

export default function EditionFormApplication({ openModal, onClose }) {
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
    <Modal open={openModal} onClose={onClose}>
      <Paper
        sx={style}
        component="form"
        onSubmit={handleSubmit(handleEditApplicationSubmit)}
        noValidate
        autoComplete="off"
      >
        <Typography
          gutterBottom
          variant="h4"
          sx={{
            marginBottom: 0,
            paddingY: 2,
            textAlign: 'center',
            fontSize: { xs: '1.5rem', sm: '2rem' },
          }}
        >
          Edit a Job Application
        </Typography>
        {error && (
          <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <InputField
          id="job_title"
          label="Job Title"
          defaultValue={application.job_title}
          required
          register={register}
          errors={errors}
          minLength={2}
        />
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
          id="salary"
          label="Salary"
          defaultValue={application.salary}
          register={register}
          errors={errors}
          pattern={{
            value: /^(?:0|[1-9]\d*)([.,]\d+)?$/,
            message: 'Salary must be a positive number or zero',
          }}
        />

        <Stack
          spacing={2}
          direction="row"
          sx={{
            justifyContent: 'end',
            alignItems: 'center',
            paddingTop: { xs: 0, sm: 2 },
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
      </Paper>
    </Modal>
  )
}
