import { HeroCharacter, HeroClass } from '@/types'

function createBaseHero(heroClass: HeroClass, props?: Partial<HeroCharacter>): HeroCharacter {
  return {
    id: 1,
    accountId: 1,
    characterName: 'Hero',
    level: 1,
    class: heroClass,
    experience: 0,
    isAlive: true,
    strength: 3,
    dexterity: 3,
    intelligence: 3,
    constitution: 3,
    hitPoints: 10,
    hiredAt: new Date(),
    ...props,
  }
}

function createFighterHero(props?: Partial<HeroCharacter>): HeroCharacter {
  return {
    ...createBaseHero(HeroClass.Fighter),
    strength: 4,
    constitution: 4,
    hitPoints: 20,
    ...props,
  }
}

function createRogueHero(props?: Partial<HeroCharacter>): HeroCharacter {
  return {
    ...createBaseHero(HeroClass.Rogue),
    dexterity: 5,
    intelligence: 4,
    hitPoints: 15,
    ...props,
  }
}

function createWizardHero(props?: Partial<HeroCharacter>): HeroCharacter {
  return {
    ...createBaseHero(HeroClass.Wizard),
    intelligence: 5,
    strength: 2,
    dexterity: 4,
    ...props,
  }
}

function createClericHero(props?: Partial<HeroCharacter>): HeroCharacter {
  return {
    ...createBaseHero(HeroClass.Cleric),
    intelligence: 4,
    strength: 4,
    dexterity: 2,
    hitPoints: 15,
    ...props,
  }
}

export const heroTemplates = {
  base: createBaseHero,
  fighter: createFighterHero,
  rogue: createRogueHero,
  wizard: createWizardHero,
  cleric: createWizardHero,
}
