'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { UserContextProvider } from '@/contexts/UserContext'
import { EventContextProvider } from '@/contexts/EventsContext'

export type ProvidersProps = {
  children?: ReactNode
}

export default function Providers(props: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <EventContextProvider>
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      </UserContextProvider>
    </EventContextProvider>
  )
}
