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
  MenuItem,
  FormHelperText,
  TextField,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import InputField from '@/components/ui/InputField'
import { useNotification } from '@/components/Context/NotificationContext'
import { ModalWrapper } from '@/components/ui/ModalWrapper'
import { useApplicationContext } from '@/components/Context/ApplicationContext'
import {
  addInterviewByApplicationId,
  patchInterviewByApplicationId,
} from '@/utils/api'
import { isValidURL } from '@/utils/validators'

const interviewTypes = [
  'Initial Screening',
  'Technical',
  'Behavioral',
  'Take-Home Assignment',
  'Panel',
  'Cultural Fit/HR',
  'Final',
  'Other',
]

export default function InterviewForm({
  openModal,
  onClose,
  mode,
  onInterviewAdd,
  onInterviewEdited,
  interviewId,
  interview,
}) {
  const { application } = useApplicationContext()
  const { showNotification } = useNotification()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isVirtual, setIsVirtual] = useState(
    mode === 'edit' ? interview.isVirtual : true
  )
  const applicationId = application.application_id

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm()

  const handleSubmitForm = async (interviewData) => {
    setLoading(true)
    setError('')
    try {
      const formattedData = {
        ...interviewData,
        scheduled_at: interviewData.scheduledAt.toISOString(),
        is_virtual: isVirtual,
      }

      if (mode === 'edit') {
        const updatedInterview = await patchInterviewByApplicationId(
          applicationId,
          formattedData,
          interviewId
        )
        if (onInterviewEdited) {
          onInterviewEdited(updatedInterview)
        }
        showNotification('Interview updated successfully!')
      } else if (mode === 'add') {
        const newInterview = await addInterviewByApplicationId(
          applicationId,
          formattedData
        )
        if (onInterviewAdd) {
          onInterviewAdd(newInterview)
        }
        showNotification('Interview added successfully!')
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
            control={control}
            name="scheduledAt"
            defaultValue={
              mode === 'edit' ? new Date(interview.scheduledAt) : null
            }
            rules={{
              required: {
                value: true,
                message: 'Interview Date is required',
              },
            }}
            render={({ field }) => (
              <>
                <DateTimePicker
                  closeOnSelect
                  label="Interview Date*"
                  value={field.value}
                  defaultValue={field.value}
                  onChange={(date) => {
                    field.onChange(date)
                  }}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  slotProps={{
                    textField: {
                      id: 'scheduledAt',
                      variant: 'outlined',
                      fullWidth: true,
                      helperText: errors.scheduledAt?.message,
                      error: !!errors.scheduledAt,
                      onBlur: field.onBlur,
                    },
                  }}
                />
              </>
            )}
          />

          <TextField
            id="type"
            select
            label="Interview Type"
            fullWidth
            required
            defaultValue={mode === 'edit' ? interview.type : ''}
            {...register('type', {
              required: 'Interview Type is required',
            })}
            helperText={errors.type?.message}
            error={errors.type}
          >
            {interviewTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          <FormControl>
            <FormLabel
              id="isVirtual-label"
              color="accent.main"
              sx={{ paddingLeft: 2, paddingTop: 1 }}
            >
              Interview Format*
            </FormLabel>
            <Controller
              name="isVirtual"
              control={control}
              defaultValue={mode === 'edit' ? interview.isVirtual : true}
              render={({ field }) => (
                <>
                  <RadioGroup
                    {...field}
                    value={isVirtual}
                    onChange={(e) => {
                      setIsVirtual(e.target.value === 'true')
                    }}
                    row
                    aria-labelledby="isVirtual-label"
                    sx={{ paddingLeft: 2, paddingTop: 1 }}
                  >
                    <FormControlLabel
                      value={true}
                      control={
                        <Radio
                          sx={{ '&.Mui-checked': { color: 'accent.main' } }}
                        />
                      }
                      label="Online"
                    />
                    <FormControlLabel
                      value={false}
                      control={
                        <Radio
                          sx={{ '&.Mui-checked': { color: 'accent.main' } }}
                        />
                      }
                      label="In-Person"
                    />
                  </RadioGroup>
                  {!!errors.isVirtual && (
                    <FormHelperText>{errors.isVirtual.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>

          <Controller
            name="location"
            control={control}
            defaultValue={mode === 'edit' ? interview.location : null}
            render={({ field }) => (
              <InputField
                {...field}
                id="location"
                label={isVirtual ? 'Meeting Link' : 'Location'}
                register={register}
                errors={errors}
                validationRules={
                  isVirtual
                    ? {
                        validate: {
                          isValidURL: (value) => isValidURL(value),
                        },
                      }
                    : {}
                }
              />
            )}
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
