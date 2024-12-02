'use client'
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  Typography,
  Stack,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useIsMobile } from '@/app/hooks/useIsMobile'
import { useApplicationContext } from '@/components/Context/ApplicationContext'
import RichText from '@/components/ui/RichText'
import { formatDate } from '@/utils/formatDate'

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

  const textLinkStyles = {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
    wordBreak: 'break-word',
    fontSize: '1rem',
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="dates-content"
          id="dates-header"
          sx={accordionSummaryStyles}
        >
          Dates
        </AccordionSummary>
        <AccordionDetails>
          <Stack
            sx={{
              justifyContent: 'start',
              alignItems: 'start',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 1,
              }}
            >
              <Typography
                variant="body1"
                sx={{ color: 'secondary.main', minWidth: '120px' }}
              >
                Applied Date
              </Typography>

              {application.applied_date ? (
                <Typography variant="body1">
                  {formatDate(application.applied_date)}
                </Typography>
              ) : (
                <Typography variant="overline" color="comment.main">
                  date
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 1,
              }}
            >
              <Typography
                variant="body1"
                sx={{ color: 'secondary.main', minWidth: '120px' }}
              >
                Deadline Date
              </Typography>

              {application.deadline_date ? (
                <Typography variant="body1">
                  {formatDate(application.deadline_date)}
                </Typography>
              ) : (
                <Typography variant="overline" color="comment.main">
                  date
                </Typography>
              )}
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="job_link-content"
          id="job_link-header"
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
            <Typography variant="overline" color="comment.main">
              job link
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="job_description-content"
          id="job_description-header"
          sx={accordionSummaryStyles}
        >
          <Typography sx={{ fontWeight: 600 }}>Job Description</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ maxHeight: 'auto', minHeight: '300px', overflowY: 'auto' }}
        >
          {application.job_description ? (
            <Box>
              <RichText htmlContent={application.job_description} />
            </Box>
          ) : (
            <Typography variant="overline" color="comment.main">
              job description
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
