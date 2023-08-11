import './globals.css'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import React from 'react'
import Providers from '@/app/providers'
import NavBar from '@/components/navigation/NavBar'
import { ClientCookiesProvider } from '@/components/CookiesProvider'
import Backdrop from '@/components/Backdrop'
import { BackdropContextProvider } from '@/contexts/BackdropContext'

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
    <ClientCookiesProvider value={cookies().getAll()}>
      <Providers>
        <BackdropContextProvider>
          <Backdrop>
            <div className={'flex flex-col'}>
              <NavBar/>
              {props.children}
            </div>
          </Backdrop>
        </BackdropContextProvider>
      </Providers>
    </ClientCookiesProvider>
    </body>
    </html>
  )
}
