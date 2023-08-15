import { HeroCharacter, HeroClass } from '@/models'
import { ReactNode } from 'react'

export interface HeroBorderProps {
  hero: HeroCharacter
  defaultColor?: string
  children?: ReactNode
}

export default function HeroBorder(props: HeroBorderProps) {
  const defaultColor = props.defaultColor ?? 'border-neutral-300'
  const borderColor = getHeroClassBorder(props.hero.class, defaultColor)

  return (
    <div className={`border-2 ${borderColor} rounded`}>
      {props.children}
    </div>
  )
}

const getHeroClassBorder = (heroClass: HeroClass, defaultColor: string) => {
  switch (heroClass as string) {
    case HeroClass.Fighter:
      return 'border-red-500'
    case HeroClass.Rogue:
      return 'border-sky-500'
    case HeroClass.Cleric:
      return 'border-green-600'
    case HeroClass.Wizard:
      return 'border-amber-500'
    default:
      return defaultColor
  }
}