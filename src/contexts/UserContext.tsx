import { createContext, ReactNode, useState } from 'react'
import { UserAccount } from '@/types'

export type UserContextType = {
  currentUser: UserAccount | null
  setCurrentUser: (user: UserAccount | null) => void
}

export const UserContext = createContext<UserContextType | null>(null)

export type UserContextProviderProps = {
  children: ReactNode
}

export function UserContextProvider(props: UserContextProviderProps) {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null)

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
