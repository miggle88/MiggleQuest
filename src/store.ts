import { create } from 'zustand'
import { Biome, DifficultySetting, HeroCharacter, UserAccount, UserCurrency } from '@/models'
import { getAvailableBiomes, getAvailableDifficulties, getStartingHeroes } from '@/mock-data'

export interface GameState {
  user: UserAccount | null
  setUser: (user: UserAccount | null) => void
  userCurrency: UserCurrency | null
  setUserCurrency: (currencies: UserCurrency) => void
  heroes: HeroCharacter[]
  setHeroes: (heroes: HeroCharacter[]) => void
  biomes: Biome[]
  setBiomes: (biomes: Biome[]) => void
  selectedBiome: Biome | null
  setSelectedBiome: (biome: Biome | null) => void
  difficultySettings: DifficultySetting[]
  setDifficultySettings: (difficulties: DifficultySetting[]) => void
  selectedDifficultySetting: DifficultySetting | null
  setSelectedDifficultySetting: (difficulty: DifficultySetting | null) => void
  selectedParty: (HeroCharacter | null)[]
  setSelectedParty: (party: (HeroCharacter | null)[]) => void
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
  selectedBiome: null,
  setSelectedBiome: (biome) => set({ selectedBiome: biome }),
  difficultySettings: getAvailableDifficulties(),
  setDifficultySettings: difficulties => set({ difficultySettings: difficulties }),
  selectedDifficultySetting: null,
  setSelectedDifficultySetting: difficulty => set({ selectedDifficultySetting: difficulty }),
  selectedParty: [null, null, null, null],
  setSelectedParty: (party) => set({ selectedParty: party }),
}))
