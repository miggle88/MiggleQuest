import './globals.css'
import type { Metadata } from 'next'
import React from 'react'
import Providers from '@/app/providers'
import NavBar from '@/components/navigation/NavBar'

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
      <div className={'flex flex-col'}>
        <NavBar/>
        {props.children}
      </div>
    </Providers>
    </body>
    </html>
  )
}
