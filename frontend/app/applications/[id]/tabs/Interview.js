'use client'
import { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Typography,
  Link,
  Chip,
  Button,
  Stack,
  Card,
  Alert,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MenuButtonInterview from '../MenuButtonInterview'
import { useIsMobile } from '@/app/hooks/useIsMobile'
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
  const [isVirtual, setIsVirtual] = useState(true)
  const isMobile = useIsMobile()
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
    <Box sx={{ padding: 1 }}>
      <Box sx={{ display: hasContent ? 'block' : 'none' }}>
        {interviews.map((interview) => (
          <InterviewCard key={interview.interviewId} interview={interview} />
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={handleOpenAddModal}
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{
              textTransform: 'none',
              width: isMobile ? '100%' : 'auto',
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
