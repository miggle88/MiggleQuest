import { HeroClass } from '@/types'
import { pickOne } from '@/helpers/random'
import { firstNames, lastNames } from '@/data/hero-names'

export function generateHeroName(heroClass?: HeroClass): string {
  const firstName = pickOne(firstNames)
  const lastName = pickOne(lastNames)
  return `${firstName} ${lastName}`
}