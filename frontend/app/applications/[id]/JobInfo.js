'use client'
import { useIsMobile } from '@/app/hooks/useIsMobile'
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/Edit'

export default function JobInfo({ application }) {
  const isMobile = useIsMobile()

  const accordionStyles = {
    backgroundColor: 'paperCommon.main',
    color: 'primary.main',
  }

  const accordionSummaryStyles = {
    fontWeight: 600,
    borderBottom: '1px solid',
    borderColor: 'dashboard.main',
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
    color: 'primary.main',
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
    wordBreak: 'break-word',
  }

  return (
    <Box sx={{ backgroundColor: 'dashboard.main', padding: isMobile ? 1 : 2 }}>
      <Accordion sx={accordionStyles}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={accordionSummaryStyles}
        >
          <Stack sx={stackStyles}>
            <Typography sx={{ fontWeight: 600 }}>Job Overview Link</Typography>
            <IconButton>
              <EditIcon sx={{ color: 'primary.main', fontSize: 20 }} />
            </IconButton>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Link href={application.job_link} target="_blank" sx={textLinkStyles}>
            {application.job_link || ''}
          </Link>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={accordionStyles}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={accordionSummaryStyles}
        >
          Dates
        </AccordionSummary>
        <AccordionDetails>{application.applied_date}</AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded sx={accordionStyles}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={accordionSummaryStyles}
        >
          <Stack sx={stackStyles}>
            <Typography sx={{ fontWeight: 600 }}>Job Description</Typography>
            <IconButton>
              <EditIcon sx={{ color: 'primary.main', fontSize: 20 }} />
            </IconButton>
          </Stack>
        </AccordionSummary>
        <AccordionDetails
          sx={{ maxHeight: '300px', height: 'auto', overflowY: 'auto' }}
        >
          <Typography>{application.description}</Typography>
          <Typography>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry&apos;s standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
