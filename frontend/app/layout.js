import ThemeApp from '@/components/styles/ThemeApp'
import NavBar from '@/components/ui/NavBar'
import Footer from '@/components/ui/Footer'
import { Box } from '@mui/material'
import { AuthProvider } from '@/components/Context/Authentication'
import SecondaryFooter from '@/components/ui/SecondaryFooter'
import RouteGuard from '@/components/RouteGuard'

export const metadata = {
  title: 'ApplicationHub App',
  description:
    'A versatile platform for managing and tracking job applications',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeApp>
          <AuthProvider>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
              }}
            >
              <NavBar />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                }}
              >
                <RouteGuard>{children}</RouteGuard>
              </Box>
              <Footer />
              <SecondaryFooter />
            </Box>
          </AuthProvider>
        </ThemeApp>
      </body>
    </html>
  )
}
