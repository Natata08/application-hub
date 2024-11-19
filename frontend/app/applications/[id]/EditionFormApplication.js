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
} from '@mui/material'
import InputField from '@/components/ui/InputField'
import DatePickerField from '@/components/ui/DatePickerField'
import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect } from 'react'

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
  overflowY: 'auto',
  padding: '16px',
  width: '100%',
  '@media (max-width: 900px)': {
    maxWidth: '90%',
  },
}

export default function EditionFormApplication({ openModal, onClose }) {
  const isMobile = useIsMobile()
  const theme = useTheme()
  const [isAppFormOpen, setIsAppFormOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

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

  // Open and close the modal depending on  `openModal` value - openModal value comes from parent component
  useEffect(() => {
    if (openModal) {
      setIsAppFormOpen(true)
    } else {
      setIsAppFormOpen(false)
    }
  }, [openModal])

  const handleAppFormSubmit = async () => {
    setLoading(true)

    try {
      await addApplication(appData)
      setIsConfirmOpen(true)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEditApplication = () => {
    //setOpenModal(false)
  }

  return (
    <Modal open={openModal} onClose={onClose}>
      <Paper
        sx={style}
        component="form"
        onSubmit={handleSubmit(handleAppFormSubmit)}
        noValidate
        autoComplete="off"
      >
        <Typography
          gutterBottom
          variant="h4"
          sx={{
            marginBottom: 0,
            paddingY: 4,
            textAlign: 'center',
            fontSize: { xs: '1.5rem', sm: '2rem' },
          }}
        >
          Edit data
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
        <Button variant="contained" type="submit" fullWidth>
          {loading ? 'Submitting...' : 'Save'}
        </Button>
        <Button variant="contained" fullWidth>
          Cancel
        </Button>
      </Paper>
    </Modal>
  )
}
