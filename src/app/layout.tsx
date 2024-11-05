import './globals.css'

import type { Metadata } from 'next'
import NavBar from '@/components/shared/NavBar'
import RecoilProvider from '@/provider/RecoilProvider'

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
    <RecoilProvider>
      <html lang="en">
        <body className="pt-[60px]" suppressHydrationWarning>
          <NavBar />
          <div className="mx-auto w-full max-w-[1080px]">{children}</div>
        </body>
      </html>
    </RecoilProvider>
  )
}
