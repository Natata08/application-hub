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
  Fade,
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
import { fetchStatuses } from '@/utils/api'
import { useRouter } from 'next/navigation'

export default function AddApplicationForm() {
  const theme = useTheme()

  const [statuses, setStatuses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [nextRoute, setNextRoute] = useState(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm()
  // All inputs are saved in appData object
  const appData = watch()

  // Helper function for check if the form is empty

  const isFormEmpty = (data) => {
    return Object.entries(data).every(
      ([key, value]) =>
        value === undefined ||
        value === '' ||
        value === null ||
        key === 'status' // Status selection makes form unempty which comes as default, this is for bypassing it
    )
  }

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

  useEffect(() => {
    if (statuses.length > 0) {
      setValue('status', statuses[0].value) // Set default value for the 'status' field
    }
  }, [statuses, setValue]) // This runs when 'statuses' changes

  useEffect(() => {
    // Subscribe to form data changes with watch
    const subscription = watch((appData) => {
      if (!isFormEmpty(appData)) {
        setUnsavedChanges(true)
      } else {
        setUnsavedChanges(false)
      }
    })
    // Cleanup the subscription when the component unmounts or when 'watch' changes
    return () => subscription.unsubscribe()
  }, [watch])

  // Intercept internal navigation
  useEffect(() => {
    const originalPush = router.push
    router.push = async (url, as, options) => {
      if (unsavedChanges) {
        setNextRoute(() => () => originalPush(url, as, options)) // Storing next route
        setShowModal(true) // Showing warning modal
        return // Abort navigation
      }
      originalPush(url, as, options)
    }
    return () => {
      router.push = originalPush // Restore original push method
    }
  }, [unsavedChanges, router])

  const handleAppFormSubmit = async () => {
    setUnsavedChanges(false)
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

  // Modal Handlers

  const handleConfirmLeave = () => {
    setShowModal(false)
    setUnsavedChanges(false)
    if (nextRoute) nextRoute() // Proceed with the stored route
  }

  const handleCancelLeave = () => {
    setShowModal(false)
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
            <InputField
              id="job_description"
              label="Job Description"
              register={register}
              errors={errors}
              multiline
              rows={3}
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

      {/*  Unsaved Changes Modal  */}
      <Modal open={showModal} onClose={handleCancelLeave} closeAfterTransition>
        <Fade in={showModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '30px',
              padding: '30px',
            }}
          >
            <Typography variant="body1" sx={{ mb: 2 }}>
              You have unsaved changes. Are you sure you want to leave without
              saving?
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Button
                variant="contained"
                onClick={handleCancelLeave}
                color="primary"
              >
                Stay
              </Button>
              <Button
                variant="contained"
                onClick={handleConfirmLeave}
                color="secondary"
              >
                Leave
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
