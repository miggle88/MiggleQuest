import { createContext } from 'react'

export type NavBarContextProps = {
  loginRequested?: () => void
}

export const NavBarContext = createContext<NavBarContextProps>({})
