'use client'
import { Stack, Card, CardContent, Typography } from '@mui/material'
import MenuButtonContact from '../MenuButtonContact'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
export default function ContactCard({
  contact,
  onContactDeleted,
  onContactEdited,
}) {
  return (
    <Card sx={{ minWidth: 275, minHeight: 150 }}>
      <CardContent>
        <Stack
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Typography
            variant="h5"
            component="h5"
            sx={{
              fontSize: '1.25rem',
              fontWeight: 600,
            }}
          >
            {contact.name}
          </Typography>

          <MenuButtonContact
            currentName={contact.name}
            onContactDeleted={onContactDeleted}
            onContactEdited={onContactEdited}
            contact={contact}
          />
        </Stack>

        {contact.role ? (
          <Typography
            variant="body2"
            sx={{
              color: 'secondary.main',
              fontSize: '1rem',
            }}
          >
            {contact.role}
          </Typography>
        ) : (
          <Typography
            component="p"
            variant="overline"
            color="comment.main"
            sx={{ height: '24px' }}
          >
            position
          </Typography>
        )}

        {contact.phone ? (
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'start',
            }}
          >
            <PhoneIcon sx={{ fontSize: 20, marginRight: 1 }} />
            <Typography variant="body1">{contact.phone}</Typography>
          </Stack>
        ) : (
          <Typography
            component="p"
            variant="overline"
            color="comment.main"
            sx={{ height: '24px' }}
          >
            phone
          </Typography>
        )}

        {contact.email ? (
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'start',
            }}
          >
            <EmailIcon sx={{ fontSize: 20, marginRight: 1 }} />
            <Typography variant="body1">{contact.email}</Typography>
          </Stack>
        ) : (
          <Typography
            component="p"
            variant="overline"
            color="comment.main"
            sx={{ height: '24px' }}
          >
            email
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
