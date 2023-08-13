import { create } from 'zustand'
import { UserAccount, UserCurrency } from '@/models'

export interface GameState {
  user: UserAccount | null
  setUser: (user: UserAccount | null) => void
  userCurrency: UserCurrency | null
  setUserCurrency: (currencies: UserCurrency) => void
}

export const useGameState = create<GameState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  userCurrency: null,
  setUserCurrency: (currency) => set({ userCurrency: currency }),
}))
