import './globals.css'
import type { Metadata } from 'next'
import React from 'react'
import Providers from '@/app/providers'
import NavLayout from '@/components/NavLayout'

export const metadata: Metadata = {
  title: 'MiggleQuest',
  description: 'Best game ever',
}

export type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en">
    <body>
    <Providers>
      <NavLayout>
        {props.children}
      </NavLayout>
    </Providers>
    </body>
    </html>
  )
}
