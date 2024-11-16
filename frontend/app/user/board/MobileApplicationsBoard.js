import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ApplicationCard from './ApplicationCard'

export default function MobileApplicationsBoard({ statuses, applications }) {
  return (
    <Box sx={{ width: '100%' }}>
      {statuses.map((status) => (
        <Accordion key={status.name}>
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
              {status.name.toUpperCase()}
              <Chip
                label={
                  applications.filter((app) => app.status === status.name)
                    .length
                }
                color="secondary"
                size="small"
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {applications
                .filter((app) => app.status === status.name)
                .map((application) => (
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
