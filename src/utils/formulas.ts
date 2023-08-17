import { Activity } from '@/models'

export function calcSuccessChance(activity: Activity): number {
  const { biome, difficulty, party } = activity
  const { startingLevel } = biome
  const { levelModifier } = difficulty

  const heroScore = party.reduce((sum, hero) =>
    sum + Math.max(1, hero.level - 0.5), 0)

  const monsterScore = (startingLevel + 1 + levelModifier)
  const totalScore = heroScore + monsterScore

  return Math.floor(heroScore * 100 / totalScore)
}

export function calcExperienceReward(activity: Activity): number {
  const { biome, difficulty, party } = activity
  const { startingLevel } = biome
  const { experienceModifier } = difficulty

  const highestLevel = party.reduce((max, hero) => Math.max(max, hero.level), 1)
  const levelDifference = Math.max(0, (highestLevel - startingLevel))

  let penalty = Math.floor((levelDifference - 1) * 0.5)

  const baseExperience = Math.max(1, 10 - levelDifference - penalty)
  const groupBonus = Math.max(0, party.length - 2)

  return Math.ceil((baseExperience + groupBonus) * experienceModifier)
}

export function calcGoldReward(activity: Activity): number {
  const { biome, difficulty } = activity
  const { baseGold } = biome
  const { goldModifier } = difficulty

  return Math.ceil(baseGold * goldModifier)
}