import { create } from 'zustand'
import { Biome, HeroCharacter, UserAccount, UserCurrency } from '@/models'
import { getAvailableBiomes, getStartingHeroes } from '@/mock-data'

export interface GameState {
  user: UserAccount | null
  setUser: (user: UserAccount | null) => void
  userCurrency: UserCurrency | null
  setUserCurrency: (currencies: UserCurrency) => void
  heroes: HeroCharacter[]
  setHeroes: (heroes: HeroCharacter[]) => void
  biomes: Biome[]
  setBiomes: (biomes: Biome[]) => void
}

export const useGameState = create<GameState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  userCurrency: null,
  setUserCurrency: (currency) => set({ userCurrency: currency }),
  heroes: getStartingHeroes(),
  setHeroes: (heroes) => set({ heroes }),
  biomes: getAvailableBiomes(),
  setBiomes: (biomes: Biome[]) => set({ biomes }),
}))
