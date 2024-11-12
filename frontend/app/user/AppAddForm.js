import { Typography, Button, Paper, Box, Modal } from '@mui/material'
import InputField from '@/components/ui/InputField'
import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useTheme } from '@mui/material/styles'

export default function AddAppForm({ openModal, onClose }) {
  const theme = useTheme()
  const [isAppFormOpen, setIsAppFormOpen] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm()
  const AppFormData = watch()

  // Open the modal when `openModal` is true - where we get the value from parent component
  useEffect(() => {
    if (openModal) {
      setIsAppFormOpen(true)
    }
  }, [openModal])

  const handleAppFormSubmit = async () => {
    console.log(AppFormData)
  }

  // Handle modal close
  const handleCloseModal = () => {
    setIsAppFormOpen(false)
    if (onClose) {
      onClose() // Notify parent to reset the state
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
              defaultValue="Job Title"
              register={register}
              errors={errors}
              required
              minLength={2}
            />
            <InputField
              id="job_link"
              label="Job Link"
              defaultValue="Job link"
              register={register}
              errors={errors}
              required
              minLength={2}
            />
            <InputField
              id="salary"
              label="Salary Gross Monthly - DKK (optional)"
              defaultValue="Expected Salary"
              register={register}
              errors={errors}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Controller
                name="application_date"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <DatePicker
                    label="Application Date"
                    {...field}
                    TextFieldComponent={(params) => (
                      <InputField
                        {...params} // Spread the params here
                        errors={errors} // Pass errors to your custom InputField
                        id="application_date" // Pass id or other props
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
                    label="Deadline Date"
                    {...field}
                    TextFieldComponent={(params) => (
                      <InputField
                        {...params} // Pass inputProps and inputRef correctly
                        errors={errors} // Pass errors to InputField
                        id="deadline_date" // Provide an id or other props
                      />
                    )}
                  />
                )}
              />
            </Box>
            <InputField
              id="job_description"
              label="Job Description (Optional)"
              defaultValue="Job Description"
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
            <Button variant="contained" type="submit" fullWidth>
              Add Application
            </Button>
          </Paper>
        </LocalizationProvider>
      </Modal>
    </>
  )
}
