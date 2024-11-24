import './globals.css'

import type { Metadata } from 'next'
import NavBar from '@/app/components/shared/NavBar'
import RecoilProvider from '@/provider/RecoilProvider'
import QueryProvider from '@/provider/QueryProvider'

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
    <QueryProvider>
      <RecoilProvider>
        <html lang="en">
          <body className="pt-[60px]" suppressHydrationWarning>
            <NavBar />
            <div className="mx-auto w-full h-full">{children}</div>
          </body>
        </html>
      </RecoilProvider>
    </QueryProvider>
  )
}
