'use client'
import { useIsMobile } from '@/app/hooks/useIsMobile'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  Button,
  Link,
  IconButton,
  Typography,
  Stack,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { enGB } from 'date-fns/locale'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/Edit'
import DatePickerField from '@/components/ui/DatePickerField'

export default function JobInfo({ application }) {
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

  const onSubmit = (data) => {
    console.log('Submitted Data:', data)
  }

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
            <Stack sx={stackStyles}>
              <Typography sx={{ fontWeight: 600 }}>Job Link</Typography>
              <IconButton>
                <EditIcon sx={{ color: 'accent.main', fontSize: 20 }} />
              </IconButton>
            </Stack>
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
              <Typography sx={{ color: 'secondary.main' }}>No data</Typography>
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
              <IconButton>
                <EditIcon sx={{ color: 'accent.main', fontSize: 20 }} />
              </IconButton>
            </Stack>
          </AccordionSummary>
          <AccordionDetails
            sx={{ maxHeight: '300px', height: 'auto', overflowY: 'auto' }}
          >
            <Typography>{application.job_description}</Typography>
            <Typography>
              {application.job_description}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry&apos;s
              standard dummy text ever since the 1500s, when an unknown printer
              took a galley of type and scrambled it to make a type specimen
              book. It has survived not only five centuries, but also the leap
              into electronic typesetting, remaining essentially unchanged. It
              was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </LocalizationProvider>
  )
}
