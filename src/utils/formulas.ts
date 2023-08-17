import { HeroCharacter } from '@/models'

export function calcAdventureSuccessChance(
  startingLevel: number,
  levelModifier: number,
  party: HeroCharacter[],
): number {
  const heroScore = party.reduce((sum, hero) =>
    sum + Math.max(1, hero.level - 0.5), 0)

  const monsterScore = (startingLevel + 1 + levelModifier)
  const totalScore = heroScore + monsterScore

  return Math.floor(heroScore * 100 / totalScore)
}

export function calcAdventureExperience(startingLevel: number,
                                        party: HeroCharacter[]): number {
  const highestLevel = party.reduce((max, hero) => Math.max(max, hero.level), 1)
  const levelDifference = Math.max(0, (highestLevel - startingLevel))

  let penalty = Math.floor((levelDifference - 1) * 0.5)

  const baseExperience = Math.max(1, 10 - levelDifference - penalty)
  const groupBonus = Math.max(0, party.length - 2)

  return baseExperience + groupBonus
}
