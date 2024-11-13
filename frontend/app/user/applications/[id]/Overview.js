'use client'
import { useParams } from 'next/navigation'
import {
  CircularProgress,
  Alert,
  Box,
  Typography,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material'
//import { useApplicationById } from '@/app/hooks/useApplicationById'

const Overview = () => {
  const params = useParams()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  // const id = params.id
  // const { application, isLoading, error } = useApplicationById(id)
  // if (isLoading) {
  //   return (
  //     <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
  //       <CircularProgress />
  //     </Box>
  //   )
  // }
  // if (error) {
  //   return (
  //     <Alert severity="error" sx={{ m: 4 }}>
  //       {error}
  //     </Alert>
  //   )
  // }
  // if (!application) return <Typography>No data available.</Typography>

  // if (!application) {
  //   return <Typography>No application data available</Typography>
  // }

  return (
    <Box
      sx={{
        backgroundColor: '#C5D5D4',
        padding: isMobile ? 1 : 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: 3,
          color: 'primary.main',
          textAlign: isMobile ? 'center' : 'left',
          fontWeight: 600,
        }}
      >
        Overview
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: '#F7F7F7',
          boxShadow: '0px 2px 6px primary.main33',
          overflowX: 'auto',
        }}
      >
        <Table>
          <TableBody>
            {[
              {
                title: 'Lob description',
                content: 'job_description',
              },
              {
                title: 'Job link',
                content: (
                  <Link
                    href="https://www.lego.com/careers/intern-frontend"
                    target="_blank"
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                      wordBreak: 'break-word',
                    }}
                  >
                    job_link
                  </Link>
                ),
              },
              {
                title: 'The expected salary',
                content: 'salary',
                //application.salary === 0 ? 'Unpaid' : application.salary,
              },
              {
                title: 'Applied date',
                content: 'applied_date',
              },
              {
                title: 'Deadline for applying',
                content: 'deadline_date',
              },
              {
                title: 'Website company',
                content: (
                  <Link
                    href="https://www.lego.com"
                    target="_blank"
                    sx={{
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                      wordBreak: 'break-word',
                    }}
                  >
                    website
                  </Link>
                ),
              },
              {
                title: 'Location company',
                content: 'location',
              },
              {
                title: 'Contact name',
                content: 'contact_name',
              },
              {
                title: 'Contact details',
                content: (
                  <>
                    <Typography>Phone: contact_phone</Typography>
                    <Typography>Email: contact_email</Typography>
                  </>
                ),
              },
            ].map(({ title, content }) => (
              <TableRow
                key={title}
                sx={{
                  display: isMobile ? 'block' : 'table-row',
                  padding: isMobile ? '8px 0' : 0,
                  borderBottom: isMobile ? '1px solid #C5D5D4' : 'none',
                }}
              >
                <TableCell
                  sx={{
                    width: isMobile ? '100%' : '240px',
                    fontWeight: 600,
                    color: 'secondary.main',
                    borderBottom: isMobile
                      ? 'none'
                      : '1px solid dashboard.main',
                    padding: isMobile ? '4px' : '16px',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    display: isMobile ? 'block' : 'table-cell',
                  }}
                >
                  {title}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: isMobile
                      ? 'none'
                      : '1px solid dashboard.main',
                    padding: isMobile ? '4px' : '16px',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    color: 'primary.main',
                    display: isMobile ? 'block' : 'table-cell',
                  }}
                >
                  {content}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Overview
