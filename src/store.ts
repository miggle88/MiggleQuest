import { create } from 'zustand'
import { Activity, Biome, DifficultySetting, HeroCharacter, UserAccount, UserCurrency } from '@/models'
import { getAvailableBiomes, getAvailableDifficulties, getStartingHeroes } from '@/mock-data'

export interface GameState {
  user: UserAccount | null
  setUser: (user: UserAccount | null) => void
  userCurrency: UserCurrency | null
  setUserCurrency: (currencies: UserCurrency) => void
  heroes: HeroCharacter[]
  getAvailableHeroes: (minLevel?: number) => HeroCharacter[]
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
  activities: Activity[]
  setActivities: (activities: Activity[]) => void
  addActivity: (activity: Activity) => void
  removeActivity: (id: string) => void
}

export const useGameState = create<GameState>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  userCurrency: null,
  setUserCurrency: (currency) => set({ userCurrency: currency }),
  heroes: getStartingHeroes(),
  getAvailableHeroes: (minLevel = 1) =>
    get().heroes.filter(hero => !hero.isDead && hero.level >= minLevel && (!hero.nextAvailableAt || hero.nextAvailableAt <= new Date())),
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
  activities: [],
  setActivities: (activities) => set({ activities }),
  addActivity: (activity) => set(state => ({ activities: [...state.activities, activity] })),
  removeActivity: (id) => set(state => ({ activities: state.activities.filter((a) => a.id !== id) })),
}))
