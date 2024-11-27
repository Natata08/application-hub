import {
  Typography,
  Button,
  Paper,
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material'
import InputField from '@/components/ui/InputField'
import DatePickerField from '@/components/ui/DatePickerField'
import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { enGB } from 'date-fns/locale'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useTheme } from '@mui/material/styles'
import { addApplication } from '@/utils/api'
import { fetchApplicationStatuses } from '@/utils/api'
import { useRouter } from 'next/navigation'
import UnsavedChangesModal from './UnsavedChangesModal'
import TextEditorInputField from '@/components/ui/TextEditorInputField'

export default function AddApplicationForm() {
  const theme = useTheme()
  const router = useRouter()

  const [statuses, setStatuses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dirtyState, setDirtyState] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    control,
    setValue,
  } = useForm()

  useEffect(() => {
    setDirtyState(isDirty)
  }, [isDirty])

  // Fetch status data
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

  useEffect(() => {
    if (statuses.length > 0) {
      setValue('status', statuses[0].value)
    }
  }, [statuses, setValue])

  const handleAppFormSubmit = async (appData) => {
    console.log(appData)
    setDirtyState(false)
    setLoading(true)
    setError('')
    try {
      const result = await addApplication(appData)
      router.push(`/applications/${result.application_id}`)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
        <Box
          sx={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflowY: 'auto',
            px: 2,
          }}
        >
          <Paper
            component="form"
            onSubmit={handleSubmit(handleAppFormSubmit)}
            noValidate
            autoComplete="off"
            sx={{
              margin: '30px 0 50px 0',
              width: {
                xs: '90%',
                sm: '80%',
                md: 500,
              },

              borderRadius: '30px',
              overflowY: 'auto',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: { xs: 3, sm: 3, md: 4 },
            }}
          >
            <Typography
              sx={{
                paddingBottom: { xs: 0, sm: 2 },
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
              }}
              gutterBottom
              variant="h4"
              component="div"
              textAlign="center"
            >
              Add a Job Application
            </Typography>

            {error && (
              <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            {/* Input fields for the form */}
            <InputField
              id="job_title"
              label="Job Title"
              register={register}
              errors={errors}
              required
              minLength={2}
            />
            <InputField
              id="company_name"
              label="Company Name"
              register={register}
              required
              errors={errors}
            />
            <InputField
              id="job_link"
              label="Job Link"
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
                label="Application Date"
                errors={errors}
                sx={{ width: { xs: '100%', sm: '50%' } }}
              />
              <DatePickerField
                control={control}
                name="deadline_date"
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
                defaultValue={statuses.length > 0 ? statuses[0].value : ''}
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

            <Controller
              name="job_description"
              control={control}
              render={({ field: { onChange } }) => (
                <>
                  <Box
                    sx={{
                      mt: 2,
                    }}
                  >
                    <TextEditorInputField
                      id="job_description"
                      label="Job Description"
                      defaultValue={''}
                      onChange={onChange}
                      error={errors.job_description}
                    />
                  </Box>
                </>
              )}
            />

            <Typography
              sx={{
                mt: 1,
                mb: 1,
                p: 1,
                color: theme.palette.text.secondary,
                fontSize: { xs: 12 },
              }}
            >
              * You can upload the documents or customize all the details after
              creating the application.
            </Typography>
            {/* Submit Button */}
            <Button variant="contained" type="submit" fullWidth>
              {loading ? 'Submitting...' : 'Add Application'}
            </Button>
          </Paper>
        </Box>
      </LocalizationProvider>
      <UnsavedChangesModal dirtyFields={dirtyFields} dirtyState={dirtyState} />
    </>
  )
}
