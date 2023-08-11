'use client'

import { createContext, ReactNode, useState } from 'react'

export type BackdropContextType = {
  backdrop: string
  setBackdrop: (name: string) => void
}

export const BackdropContext = createContext<BackdropContextType | null>(null)

export type BackdropContextProviderProps = {
  children: ReactNode
}

export function BackdropContextProvider(props: BackdropContextProviderProps) {
  const [backdrop, setBackdrop] = useState<string>('bg-none')

  return (
    <BackdropContext.Provider value={{ backdrop, setBackdrop }}>
      {props.children}
    </BackdropContext.Provider>
  )
}