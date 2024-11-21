'use client'
import {
  Typography,
  Button,
  Paper,
  Box,
  Modal,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Stack,
} from '@mui/material'
import InputField from '@/components/ui/InputField'
import DatePickerField from '@/components/ui/DatePickerField'
import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { enGB } from 'date-fns/locale'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { addApplication } from '@/utils/api'
import { fetchStatuses } from '@/utils/api'
import { useRouter } from 'next/navigation'
import LoadingButton from '@mui/lab/LoadingButton'
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

export default function EditFormApplication({ openModal, onClose }) {
  const { application, updateApplication } = useApplicationContext()
  const [statuses, setStatuses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm()

  const updatedApplicationAndCompanyData = watch()

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const statusData = await fetchStatuses()
        setStatuses(statusData)
      } catch (err) {
        setError('Failed to fetch statuses')
      }
    }
    fetchStatus()
  }, [])

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
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
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
            id="job_link"
            label="Job Link"
            defaultValue={application.job_link}
            register={register}
            errors={errors}
            minLength={2}
          />
          {/* Date Picker Wrapper */}
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
              defaultValue={new Date(application.applied_date)}
              label="Application Date"
              errors={errors}
              sx={{ width: { xs: '100%', sm: '50%' } }}
            />
            <DatePickerField
              control={control}
              name="deadline_date"
              defaultValue={new Date(application.deadline_date)}
              label="Deadline Date"
              errors={errors}
              sx={{ width: { xs: '100%', sm: '50%' } }}
            />
          </Box>
          {/* Status Select Field */}
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
            id="job_description"
            label="Job Description"
            defaultValue={application.job_description}
            register={register}
            errors={errors}
            multiline
            rows={3}
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
    </LocalizationProvider>
  )
}
