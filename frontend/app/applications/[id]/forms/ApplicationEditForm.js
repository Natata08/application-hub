'use client'
import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { enGB } from 'date-fns/locale'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import {
  Button,
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Stack,
  Alert,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import InputField from '@/components/ui/InputField'
import DatePickerField from '@/components/ui/DatePickerField'
import { patchApplication, fetchApplicationStatuses } from '@/utils/api'
import { useApplicationContext } from '@/components/Context/ApplicationContext'
import { useNotification } from '@/components/Context/NotificationContext'
import { ModalWrapper } from '@/components/ui/ModalWrapper'
import TextEditorInputField from '@/components/ui/TextEditorInputField'
import { isValidURL } from '@/utils/validators'

export default function ApplicationEditForm({ openModal, onClose }) {
  const { application, updateApplication } = useApplicationContext()
  const { showNotification } = useNotification()
  const [statuses, setStatuses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const statusData = await fetchApplicationStatuses()
        setStatuses(statusData)
      } catch (err) {
        setError('Failed to fetch statuses')
      }
    }
    fetchStatus()
  }, [])

  const handleEditApplicationSubmit = async (updatedData) => {
    setLoading(true)
    setError('')
    try {
      await patchApplication({
        id: application.application_id,
        updatedData,
      })
      updateApplication(updatedData)
      onClose()
      showNotification('Application updated successfully!')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <ModalWrapper
        open={openModal}
        handleClose={onClose}
        title="Edit a Job Application"
      >
        <Box
          component="form"
          onSubmit={handleSubmit(handleEditApplicationSubmit)}
          noValidate
          autoComplete="off"
        >
          {error && <Alert severity="error">{error}</Alert>}

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
            id="job_link"
            label="Job Link"
            register={register}
            errors={errors}
            validationRules={{
              minLength: {
                value: 2,
                message: 'Job Link must be at least 2 characters long',
              },
              validate: {
                isValidURL: (value) => isValidURL(value),
              },
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1,
              justifyContent: 'space-between',
              alignItems: { xs: 'stretch', sm: 'center' },
            }}
          >
            <DatePickerField
              control={control}
              name="applied_date"
              defaultValue={
                application.applied_date
                  ? new Date(application.applied_date)
                  : ''
              }
              label="Application Date"
              errors={errors}
              sx={{ width: { xs: '100%', sm: '50%' } }}
            />
            <DatePickerField
              control={control}
              name="deadline_date"
              defaultValue={
                application.deadline_date
                  ? new Date(application.deadline_date)
                  : ''
              }
              label="Deadline Date"
              errors={errors}
              sx={{ width: { xs: '100%', sm: '50%' } }}
            />
          </Box>
          <FormControl
            fullWidth
            margin="normal"
            required
            error={!!errors.status}
          >
            <InputLabel id="status-label">Application Status</InputLabel>
            <Controller
              name="status"
              control={control}
              defaultValue={application.status}
              render={({ field }) => (
                <Select
                  labelId="status-label"
                  label="Application Status"
                  {...field}
                >
                  {statuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

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

          <Controller
            name="job_description"
            control={control}
            render={({ field: { onChange } }) => (
              <TextEditorInputField
                id="job_description"
                label="Job Description"
                defaultValue={application.job_description || ''}
                onChange={onChange}
                error={errors.job_description}
              />
            )}
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
        </Box>
      </ModalWrapper>
    </LocalizationProvider>
  )
}
