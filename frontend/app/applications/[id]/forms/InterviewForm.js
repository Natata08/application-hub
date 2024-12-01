'use client'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import {
  LocalizationProvider,
  DateTimePicker,
  renderTimeViewClock,
} from '@mui/x-date-pickers'
import { enGB } from 'date-fns/locale'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import {
  Button,
  Stack,
  Box,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import InputField from '@/components/ui/InputField'
import { useNotification } from '@/components/Context/NotificationContext'
import { ModalWrapper } from '@/components/ui/ModalWrapper'
import { useApplicationContext } from '@/components/Context/ApplicationContext'
import { addInterviewByApplicationId } from '@/utils/api'

const interviewTypes = [
  { value: 'Initial Screening' },
  { value: 'Technical' },
  { value: 'Behavioral' },
  { value: 'Case Study/Take-Home Assignment' },
  { value: 'Panel' },
  { value: 'Cultural Fit/HR' },
  { value: 'Final' },
  { value: 'Other' },
]

export default function InterviewForm({
  openModal,
  onClose,
  mode,
  onInterviewAdd,
}) {
  const { application } = useApplicationContext()
  const { showNotification } = useNotification()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isVirtual, setIsVirtual] = useState(false)
  const applicationId = application.application_id

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm()

  const handleSubmitForm = async (interviewData) => {
    console.log('Form Data:', interviewData)
    setLoading(true)
    setError('')
    try {
      const formattedData = {
        ...interviewData,
        scheduled_at: interviewData.scheduledAt.toISOString(),
        is_virtual: isVirtual,
      }

      if (mode === 'edit') {
        console.log('function edit')
        showNotification('Interview updated successfully!')
      } else if (mode === 'add') {
        const newInterview = await addInterviewByApplicationId(
          applicationId,
          formattedData
        )
        showNotification('Interview added successfully!')
        if (onInterviewAdd) {
          onInterviewAdd(newInterview)
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
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <ModalWrapper
        open={openModal}
        handleClose={onClose}
        title={mode === 'edit' ? 'Edit Interview' : 'Add Interview'}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(handleSubmitForm)}
          noValidate
          autoComplete="off"
        >
          {error && <Alert severity="error">{error}</Alert>}

          <Controller
            name="scheduledAt"
            control={control}
            rules={{ required: 'Interview type is required' }}
            render={({ field }) => (
              <DateTimePicker
                sx={{ width: '100%' }}
                {...field}
                label="Interview Date"
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                slotProps={{
                  textField: {
                    helperText: errors.message,
                  },
                }}
                TextFieldComponent={(params) => (
                  <InputField
                    {...params}
                    errors={errors}
                    required
                    id="scheduledAt"
                    // helperText={errors.scheduledAt ? errors.scheduledAt.message : ''}
                    // error={!!errors.scheduledAt}
                  />
                )}
              />
            )}
          />

          <FormControl fullWidth required margin="normal" error={!!errors.type}>
            <InputLabel required id="type-label">
              Type Interview
            </InputLabel>
            <Controller
              name="type"
              control={control}
              defaultValue={
                interviewTypes.length > 0 ? interviewTypes[0].value : ''
              }
              rules={{ required: 'Interview type is required' }}
              render={({ field }) => (
                <Select labelId="type-label" label="Type Interview" {...field}>
                  {interviewTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.value}
                    </MenuItem>
                  ))}
                  {errors.type && (
                    <FormHelperText>{errors.type.message}</FormHelperText>
                  )}
                </Select>
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel
              id="isVirtual"
              color="accent.main"
              sx={{ paddingLeft: 2, paddingTop: 1 }}
            >
              Format Interview
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="isVirtual"
              value={isVirtual}
              onChange={(e) => {
                setIsVirtual(e.target.value === 'true')
              }}
              sx={{ paddingLeft: 2, paddingTop: 1 }}
            >
              <FormControlLabel
                value={true}
                control={
                  <Radio sx={{ '&.Mui-checked': { color: 'accent.main' } }} />
                }
                label="Online"
              />
              <FormControlLabel
                value={false}
                control={
                  <Radio sx={{ '&.Mui-checked': { color: 'accent.main' } }} />
                }
                label="In-Person"
              />
            </RadioGroup>
          </FormControl>

          <InputField
            id="location"
            label={isVirtual ? 'Meeting Link' : 'Location'}
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
    </LocalizationProvider>
  )
}
