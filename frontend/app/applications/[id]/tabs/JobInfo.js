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
    fontSize: isMobile ? '0.875rem' : '1rem',
  }

  return (
    <Box sx={{ padding: isMobile ? 1 : 2 }}>
      <Accordion>
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

      <Accordion>
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
              alignItems: 'center',
              flexDirection: 'row',
              gap: 4,
            }}
          >
            <Box
              sx={{
                p: 0,
              }}
            >
              <Typography
                variant="body2"
                gutterBottom
                sx={{ color: 'secondary.main' }}
              >
                Applied Date
              </Typography>

              {application.applied_date ? (
                <Typography variant={isMobile ? 'body2' : 'body1'}>
                  {new Date(application.applied_date).toLocaleDateString(
                    'en-GB'
                  )}
                </Typography>
              ) : (
                <Typography variant="overline" color="comment.main">
                  no date
                </Typography>
              )}
            </Box>

            <Box sx={{ p: 0 }}>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ color: 'secondary.main' }}
              >
                Deadline Date
              </Typography>

              {application.deadline_date ? (
                <Typography variant={isMobile ? 'body2' : 'body1'}>
                  {new Date(application.deadline_date).toLocaleDateString(
                    'en-GB'
                  )}
                </Typography>
              ) : (
                <Typography variant="overline" color="comment.main">
                  no date
                </Typography>
              )}
            </Box>
          </Stack>
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
            <Typography variant={isMobile ? 'body2' : 'body1'}>
              <RichText htmlContent={application.job_description} />
            </Typography>
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
