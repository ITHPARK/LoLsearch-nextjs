import './globals.css'

import type { Metadata } from 'next'
import NavBar from '@/components/Shared/NavBar'

export const metadata: Metadata = {
  title: 'League of Legends',
  description: 'Search for Leagueof Legends info App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
