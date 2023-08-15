import { Biome, DifficultySetting, HeroCharacter, HeroClass } from '@/models'

export function getAvailableBiomes(): Biome[] {
  return [{
    id: '1',
    name: 'snow',
    description: 'very cold',
    startingLevel: 1,
  },
    {
      id: '2',
      name: 'Hideout',
      description: 'humanoid fun',
      startingLevel: 3,
    },
    {
      id: '3',
      name: 'Swamp',
      description: 'swamp ass',
      startingLevel: 5,
    },
    {
      id: '4',
      name: 'portal',
      description: 'portal realm - dangerous',
      startingLevel: 10,
    },
  ]
}

export function getAvailableDifficulties(): DifficultySetting[] {
  return [
    {
      id: 1,
      name: 'Easy',
      description: 'a walk in the park',
      levelModifier: 0.75,
      goldModifier: 0.75,
      lootModifier: 0.75,
      experienceModifier: 0.75,
      completionSeconds: 10 * 60,
    },
    {
      id: 2,
      name: 'Normal',
      description: 'Average challenge',
      levelModifier: 1,
      goldModifier: 1,
      lootModifier: 1,
      experienceModifier: 1,
      completionSeconds: 20 * 60,
    },
    {
      id: 3,
      name: 'Challenging',
      description: 'not for the feint of heart',
      levelModifier: 1.25,
      goldModifier: 1.25,
      lootModifier: 1.25,
      experienceModifier: 1.25,
      completionSeconds: 30 * 60,
    },
    {
      id: 4,
      name: 'Mania',
      description: 'You will likely die, but what if...',
      levelModifier: 2,
      goldModifier: 2,
      lootModifier: 2,
      experienceModifier: 2,
      completionSeconds: 60 * 60,
    },
  ]
}

export function getStartingHeroes(): HeroCharacter[] {
  const base: HeroCharacter = {
    id: '1',
    accountId: '1',
    characterName: 'Steve',
    icon: 'none',
    description: 'base dude',
    level: 1,
    class: HeroClass.Cleric,
    experience: 0,
    hitPoints: 15,
    strength: 3,
    dexterity: 3,
    intelligence: 3,
    constitution: 3,
    isAlive: true,
    hiredAt: new Date(),
  }
  return [
    {
      ...base, characterName: 'Bob',
      class: HeroClass.Fighter,
      strength: 4,
      hitPoints: 20,
    },
    {
      ...base, characterName: 'Claude',
      class: HeroClass.Rogue,
      dexterity: 4,
    },
    {
      ...base, characterName: 'Miggle',
      class: HeroClass.Wizard,
      intelligence: 4,
      hitPoints: 12,
    },
    {
      ...base, characterName: 'Larry',
      class: HeroClass.Cleric,
      intelligence: 4,
      hitPoints: 16,
    },
    {
      ...base, characterName: 'Jerry',
      class: HeroClass.Fighter,
      strength: 4,
      hitPoints: 20,
      level: 5,
    },
    {
      ...base, characterName: 'Argus',
      class: HeroClass.Rogue,
      dexterity: 4,
      level: 5,
    },
    {
      ...base, characterName: 'Enum',
      class: HeroClass.Cleric,
      intelligence: 4,
      hitPoints: 16,
      level: 5,
    },
    {
      ...base, characterName: 'Ersoc',
      class: HeroClass.Wizard,
      intelligence: 4,
      hitPoints: 12,
      level: 5,
    },
  ]
}
