import { Biome, HeroCharacter, HeroClass } from '@/models'

export function getAvailableBiomes(): Biome[] {
  return [{
    id: '1',
    name: 'snow',
    description: 'very cold',
    startingLevel: 1,
  },
    {
      id: '2',
      name: 'portal',
      description: 'portal realm - dangerous',
      startingLevel: 1,
    },
    {
      id: '3',
      name: 'Hideout',
      description: 'humanoid fun',
      startingLevel: 1,
    },
    {
      id: '4',
      name: 'Swamp',
      description: 'swamp ass',
      startingLevel: 1,
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
  ]
}