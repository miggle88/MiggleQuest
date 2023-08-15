import { Biome } from '@/models/biome'
import { DifficultySetting } from '@/models/difficulty-setting'
import { HeroCharacter } from '@/models/hero-character'

export enum ActivityType {
  Adventure = 'ADVENTURE',
}

export type Activity = {
  id: string
  type: ActivityType
  biome: Biome
  difficulty: DifficultySetting
  party: HeroCharacter[]
  startedAt: Date
  completedAt: Date
}
