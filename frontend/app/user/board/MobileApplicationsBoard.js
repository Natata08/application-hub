import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ApplicationCard from './ApplicationCard'

export default function MobileApplicationsBoard({ applicationsByStatus }) {
  return (
    <Box sx={{ width: '100%' }}>
      {applicationsByStatus.map(({ status, applications }) => (
        <Accordion key={status}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              bgcolor: 'background.dashboard',
              '& .MuiAccordionSummary-content': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {status.toUpperCase()}
              <Chip
                label={applications.length}
                color="secondary"
                size="small"
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {applications.map((application) => (
                <ApplicationCard
                  key={application.application_id}
                  application={application}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}
