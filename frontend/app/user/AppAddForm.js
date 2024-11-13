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
} from '@mui/material'
import InputField from '@/components/ui/InputField'
import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useTheme } from '@mui/material/styles'
import { addApplication } from '@/utils/api'
import { getLocalStorageItem } from '@/utils/localStorage'
import { fetchStatuses } from '@/utils/api'

export default function AddAppForm({ openModal, onClose }) {
  const theme = useTheme()
  const [isAppFormOpen, setIsAppFormOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [statuses, setStatuses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm()
  // All inputs are saved in appData object
  const appData = watch()
  // Getting user_id from the token saved on localstorage
  const userInfo = getLocalStorageItem('userInfo')
  const user_id = userInfo && userInfo.id ? userInfo.id : null

  const dataToSend = {
    appData: appData,
    user_id: user_id,
  }

  // Open and close the modal depending on  `openModal` value - openModal value comes from parent component
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const statusData = await fetchStatuses()
        setStatuses(statusData) // Set statuses to state
      } catch (err) {
        setError('Failed to fetch statuses')
      }
    }
    fetchStatus()

    if (openModal) {
      setIsAppFormOpen(true)
    } else {
      setIsAppFormOpen(false)
    }
  }, [openModal])
  // Handle Submit
  const handleAppFormSubmit = async () => {
    setLoading(true)
    try {
      await addApplication(dataToSend)
      setIsConfirmOpen(true)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Handle modal close
  const handleCloseModal = () => {
    setIsAppFormOpen(false)
    if (onClose) {
      onClose() // Notify parent to reset the state Parent component is : app/user/page.js
    }
  }
  // Handle confirmation modal close
  const handleConfirmClose = () => {
    setIsConfirmOpen(false)
    setIsAppFormOpen(false)
    if (onClose) {
      onClose()
    }
  }

  return (
    <>
      <Modal
        open={isAppFormOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Paper
            component="form"
            onSubmit={handleSubmit(handleAppFormSubmit)}
            noValidate
            autoComplete="off"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              sx={{ paddingBottom: 2, fontSize: { xs: '1.5rem', sm: '2rem' } }}
              gutterBottom
              variant="h4"
              component="div"
              textAlign="center"
            >
              Add an Application
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
              label="Job Link (Optional)"
              register={register}
              errors={errors}
              minLength={2}
            />
            {/* Date Picker Wrapper */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Controller
                name="applied_date"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <DatePicker
                    label="Application Date (Optional)"
                    {...field}
                    TextFieldComponent={(params) => (
                      <InputField
                        {...params}
                        errors={errors}
                        id="application_date"
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="deadline_date"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <DatePicker
                    label="Deadline Date (Optional)"
                    {...field}
                    TextFieldComponent={(params) => (
                      <InputField
                        {...params}
                        errors={errors}
                        id="deadline_date"
                      />
                    )}
                  />
                )}
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
                defaultValue={statuses.length > 0 ? statuses[4].value : ''}
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
              label="Job Description (Optional)"
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
                fontSize: '13px',
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
        </LocalizationProvider>
      </Modal>
      {/* Confirmation Modal*/}
      <Modal
        open={isConfirmOpen}
        onClose={handleConfirmClose}
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-description"
      >
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ textAlign: 'center', fontSize: '1.5rem' }}
          >
            Application Added Successfully!
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={handleConfirmClose}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Paper>
      </Modal>
    </>
  )
}
