'use client'
import { useState, useCallback } from 'react'
import { useIsMobileSmall } from '@/app/hooks/useIsMobile'
import {
  Box,
  Typography,
  Paper,
  Link,
  Chip,
  Button,
  Stack,
  Card,
} from '@mui/material'
import EmptyState from './EmptyState'
import MenuButton from '../MenuButton'

const Interview = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [isVirtual, setIsVirtual] = useState(true)
  const [value, setValue] = useState('')
  const isMobile = useIsMobileSmall()
  const hasContent = value
  const handleEdit = useCallback(() => {
    setIsEditing(true)
  }, [])

  return (
    <>
      <Box sx={{ marginTop: 4 }}>
        {/* {!hasContent && !isEditing && (
        <EmptyState onAction={handleEdit} subject="interview" buttonText="Add Interview" />
      )} */}

        <Card
          sx={{
            padding: 2,
            marginBottom: 1,
            position: 'relative',
            paddingRight: 8,
          }}
        >
          <Box sx={{ position: 'absolute', top: 10, right: 8 }}>
            <MenuButton />
          </Box>
          <Stack
            sx={{
              alignItems: 'center',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: isMobile ? 'center' : 'space-between',
              alignItems: isMobile ? 'center' : 'center',
              width: '100%',
            }}
          >
            <Typography
              variant="body1"
              sx={{ textAlign: { xs: 'center', sm: 'left' } }}
            >
              28/11/2024
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textTransform: 'uppercase',
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              Initial Screening
            </Typography>
            <Chip label={isVirtual ? 'Online' : 'In-person'} />
            <Box>
              {isVirtual === true ? (
                <Link
                  href="https://github.com"
                  target="_blank"
                  sx={{
                    display: 'block',
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                    wordBreak: 'break-word',
                    fontSize: '1rem',
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  https://github.com
                </Link>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    textTransform: 'uppercase',
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  Copenhagen
                </Typography>
              )}
            </Box>
          </Stack>
        </Card>

        <Card
          sx={{
            padding: 2,
            marginBottom: 1,
            position: 'relative',
            paddingRight: 8,
          }}
        >
          <Box sx={{ position: 'absolute', top: 10, right: 8 }}>
            <MenuButton />
          </Box>
          <Stack
            sx={{
              alignItems: 'center',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: isMobile ? 'center' : 'space-between',
              alignItems: isMobile ? 'center' : 'center',
              width: '100%',
            }}
          >
            <Typography
              variant="body1"
              sx={{ textAlign: { xs: 'center', sm: 'left' } }}
            >
              28/11/2024
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textTransform: 'uppercase',
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              Initial Screening
            </Typography>
            <Chip label={isVirtual === false ? 'Online' : 'In-person'} />
            <Box>
              {isVirtual === false ? (
                <Link
                  href="https://github.com"
                  target="_blank"
                  sx={{
                    display: 'block',
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                    wordBreak: 'break-word',
                    fontSize: '1rem',
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  https://github.com
                </Link>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    textTransform: 'uppercase',
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  Copenhagen
                </Typography>
              )}
            </Box>
          </Stack>
        </Card>
      </Box>
    </>
  )
}

export default Interview

{
  /* <Paper sx={{padding: 4}}>
<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
    <Chip label={isVirtual ? "Online" : "In-person" } />
  </Box>

 <Stack sx={{
  alignItems: 'center',
  flexDirection: 'row',
  gap: 2 }}>
      <Typography
        variant='overline'
        gutterBottom
        sx={{ color: 'secondary.main', width: '150px' }}
      >
        Date Interview
      </Typography>
        <Typography variant='body1'>
            28/11/2024
        </Typography>
    </Stack>
    



<Stack sx={{
  alignItems: 'center',
  flexDirection: 'row',
  gap: 2}}>
      <Typography
        variant='overline'
        gutterBottom
        sx={{ color: 'secondary.main', width: '150px' }}
      >
        Type Interview
      </Typography>
        <Typography variant='body1' sx={{textTransform: 'uppercase'}}>
            Initial
        </Typography>
    </Stack>


<Stack sx={{
  alignItems: isMobile ? 'start' : 'center' ,
  flexDirection: isMobile ? 'column' : 'row',
  gap: isMobile ? 0 : 2}}>
      <Typography
        variant="overline"
        gutterBottom
        sx={{ color: 'secondary.main', minWidth: '150px' }}
      >
        {isVirtual ? 'Meeting Link' : 'Location'}
      </Typography>
      {isVirtual ? 
        (<Link
      
      href='https://github.com'
            target="_blank"
            sx={{ 
              display: 'block',
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
              wordBreak: 'break-word',
              fontSize: '1rem'}}
          >
            https://github.com
          </Link>) :
           (<Typography variant='body1' sx={{textTransform: 'uppercase'}}>
            Copenhagen
        </Typography>)}
      
    </Stack>



    


    <Stack sx={{ mt: 2, flexDirection: 'row', justifyContent: 'flex-end', gap: 1 }}>
    <Button
  variant="outlined"
  color="error"
  size="small"
>
  Delete
</Button>
<Button variant="contained" size="small">
  Edit
</Button>
    </Stack>
    




</Paper> */
}
