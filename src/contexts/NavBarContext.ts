import { createContext } from 'react'

export type NavBarContextProps = {
  signupRequested?: () => void
}

export const NavBarContext = createContext<NavBarContextProps>({})
