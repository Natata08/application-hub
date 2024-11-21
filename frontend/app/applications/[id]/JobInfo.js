'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  Typography,
  Stack,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { enGB } from 'date-fns/locale'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DatePickerField from '@/components/ui/DatePickerField'
import { useIsMobile } from '@/app/hooks/useIsMobile'
import { useApplicationContext } from '@/components/Context/ApplicationContext'

export default function JobInfo() {
  const { application } = useApplicationContext()
  const isMobile = useIsMobile()

  const accordionSummaryStyles = {
    fontWeight: 600,
    borderBottom: '1px solid',
    borderColor: 'secondary.main',
    minHeight: '40px',
    '& .MuiAccordionSummary-content': {
      margin: 0,
    },
  }

  const stackStyles = {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
  }

  const textLinkStyles = {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
    wordBreak: 'break-word',
    fontSize: isMobile ? '0.875rem' : '1rem',
  }

  const { control, handleSubmit } = useForm({
    defaultValues: {
      applied_date: application.applied_date
        ? new Date(application.applied_date)
        : null,
      deadline_date: application.deadline_date
        ? new Date(application.deadline_date)
        : null,
    },
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <Box sx={{ padding: isMobile ? 1 : 2 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={accordionSummaryStyles}
          >
            <Typography sx={{ fontWeight: 600 }}>Job Link</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {application.job_link ? (
              <Link
                href={application.job_link}
                target="_blank"
                sx={textLinkStyles}
              >
                {application.job_link}
              </Link>
            ) : (
              <Typography sx={{ color: 'secondary.main' }}>Job link</Typography>
            )}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            sx={accordionSummaryStyles}
          >
            Dates
          </AccordionSummary>
          <AccordionDetails>
            <form>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 0, sm: 2 },
                  justifyContent: 'start',
                  alignItems: { xs: 'stretch', sm: 'center' },
                }}
              >
                <DatePickerField
                  control={control}
                  defaultValue={application.applied_date}
                  name="applied_date"
                  label="Applied Date"
                  errors={{}}
                />

                <DatePickerField
                  control={control}
                  defaultValue={application.deadline_date}
                  name="deadline_date"
                  label="Deadline Date"
                  errors={{}}
                />
              </Box>
            </form>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
            sx={accordionSummaryStyles}
          >
            <Stack sx={stackStyles}>
              <Typography sx={{ fontWeight: 600 }}>Job Description</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails
            sx={{ maxHeight: '300px', height: 'auto', overflowY: 'auto' }}
          >
            {application.job_description ? (
              <Typography variant={isMobile ? 'body2' : 'body1'}>
                {application.job_description}
              </Typography>
            ) : (
              <Typography sx={{ color: 'secondary.main' }}>
                Add a job description
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
    </LocalizationProvider>
  )
}
