'use client'
import { useState, useEffect, useCallback } from 'react'
import { Box, Button, Alert, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import InterviewForm from '../forms/InterviewForm'
import { useApplicationContext } from '@/components/Context/ApplicationContext'
import { getInterviewsByApplicationId } from '@/utils/api'
import EmptyState from './EmptyState'
import InterviewCard from './InterviewCard'
import Loader from '@/components/ui/Loader'

const Interview = () => {
  const { application } = useApplicationContext()
  const [interviews, setInterviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const applicationId = application.application_id
  const hasContent = interviews.length > 0

  const handleOpenAddModal = useCallback(() => {
    setOpenModalAdd(true)
  }, [])
  const handleCloseAddModal = () => setOpenModalAdd(false)

  const handleAddInterviewSuccess = (newInterview) => {
    setInterviews((prevInterviews) => [...prevInterviews, newInterview])
  }
  const handleInterviewDeleted = (interviewId) => {
    setInterviews((prevInterviews) =>
      prevInterviews.filter(
        (interview) => interview.interviewId !== interviewId
      )
    )
  }

  const handleInterviewEdited = (updatedInterview) => {
    setInterviews((prevInterviews) => {
      const updatedInterviews = prevInterviews.map((interview) =>
        interview.interviewId === updatedInterview.interviewId
          ? { ...interview, ...updatedInterview }
          : interview
      )
      return updatedInterviews
    })
  }

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const interviews = await getInterviewsByApplicationId(applicationId)
        if (interviews) {
          setInterviews(interviews)
        }
      } catch (error) {
        console.error('Error fetching interviews:', error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInterviews()
  }, [applicationId])

  if (isLoading) {
    return <Loader height="200px" />
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: hasContent ? 'block' : 'none' }}>
        <Stack
          sx={{
            flexDirection: 'column',
            gap: { xs: 1, sm: 2 },
            justifyContent: 'stretch',
            alignItems: { xs: 'stretch', sm: 'start' },
            pb: 2,
          }}
        >
          {interviews.map((interview) => (
            <InterviewCard
              key={interview.interviewId}
              interview={interview}
              onInterviewDeleted={handleInterviewDeleted}
              onInterviewEdited={handleInterviewEdited}
            />
          ))}
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={handleOpenAddModal}
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{
              textTransform: 'none',
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Add Interview
          </Button>
        </Box>
      </Box>

      {!hasContent && (
        <EmptyState
          onAction={handleOpenAddModal}
          subject="interviews"
          buttonText="Add Interviews"
        />
      )}

      <InterviewForm
        mode="add"
        openModal={openModalAdd}
        onClose={handleCloseAddModal}
        onInterviewAdd={handleAddInterviewSuccess}
      />
    </Box>
  )
}

export default Interview
