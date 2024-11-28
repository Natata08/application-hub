'use client'
import { Stack, Card, CardContent, Typography } from '@mui/material'
import MenuButtonContact from '../MenuButtonContact'
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
              fontSize: { xs: '1rem', sm: '1.25rem' },
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

        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '0.875rem', sm: '1rem' },
          }}
        >
          {contact.role}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          {contact.phone}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          {contact.email}
        </Typography>
      </CardContent>
    </Card>
  )
}
