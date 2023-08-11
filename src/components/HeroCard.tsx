import { HeroCharacter } from '@/types'
import { toTitleCase } from '@/helpers/strings'

export type  HeroCardProps = {
  hero: HeroCharacter,
}


export default function HeroCard(props: HeroCardProps) {
  const { hero } = props
  return (
    <div className={'flex flex-col p-4 text-center border-2 border-indigo-400 rounded-2xl bg-indigo-950'}>
      Hero: {hero.characterName}
      <div>Class: {toTitleCase(hero.class)}</div>
      <div>Level: {hero.level}</div>
      <div>Experience: {hero.experience}</div>
      <div>Hit Points: {hero.hitPoints}</div>
      <div>Strength: {hero.strength}</div>
      <div>Dexterity: {hero.dexterity}</div>
      <div>Constitution: {hero.constitution}</div>
      <div>Intelligence: {hero.intelligence}</div>
      <div>Available: {hero.isAvailable ? 'Yes' : 'No'}</div>
    </div>
  )
}