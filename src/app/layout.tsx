import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Momento - AI Memory Journal',
  description: 'Combine your photos with personal stories. Let AI help you discover the deeper meaning behind your memories.',
  icons: {
    icon: '📖',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
