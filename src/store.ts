import { create } from 'zustand'
import { HeroCharacter, UserAccount, UserCurrency } from '@/models'

export interface GameState {
  user: UserAccount | null
  setUser: (user: UserAccount | null) => void
  userCurrency: UserCurrency | null
  setUserCurrency: (currencies: UserCurrency) => void
  heroes: HeroCharacter[]
  setHeroes: (heroes: HeroCharacter[]) => void
}

export const useGameState = create<GameState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  userCurrency: null,
  setUserCurrency: (currency) => set({ userCurrency: currency }),
  heroes: [],
  setHeroes: (heroes) => set({ heroes }),
}))
