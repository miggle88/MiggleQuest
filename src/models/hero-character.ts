export enum HeroClass {
  Fighter = 'FIGHTER',
  Rogue = 'ROGUE',
  Wizard = 'WIZARD',
  Cleric = 'CLERIC'
}

export type HeroCharacter = {
  id: string
  accountId: string
  characterName: string
  icon: string
  description: string
  level: number
  class: HeroClass
  experience: number
  hitPoints: number
  strength: number
  dexterity: number
  intelligence: number
  constitution: number
  isDead: boolean
  hiredAt: Date
  diedAt?: Date
  nextAvailableAt?: Date


}