import './globals.css'
import type { Metadata } from 'next'
import React from 'react'
import NavBar from '@/components/NavBar'


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
    <div className={'flex flex-col'}>
      <NavBar/>
      {props.children}
    </div>
    </body>
    </html>
  )
}
