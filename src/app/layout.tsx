import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'MiggleQuest',
  description: 'Best game ever',
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
