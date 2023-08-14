import { HeroCharacter, HeroClass } from '@/models'

export interface HeroCardProps {
  hero: HeroCharacter
}

export default function HeroCard(props: HeroCardProps) {
  const hero = props.hero
  const borderColor = getHeroClassBorder(hero.class)

  return (
    <div className={`${borderColor} border-2 rounded p-2`}>
      <div className={'flex flex-col place-content-center p-2'}>
        <div className={'flex flex-row'}>
          <div className={'grow text-lg'}>{hero.characterName}</div>
          <div className={'grow text-lg'}>{hero.class[0].toUpperCase() + hero.class.slice(1).toLowerCase()}</div>
          <div><span className={'font-bold'}>Level: </span>{hero.level}</div>
        </div>
        <div className={'py-2'}/>
        <div className={'grow text-center'}><span className={'font-bold'}>Hit Points: </span>{hero.hitPoints}</div>
        <div className={'py-2'}/>
        <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-center'}>
          <div><span className={'text-bold'}>Str: </span>{hero.strength}</div>
          <div><span className={'text-bold'}>Con: </span>{hero.constitution}</div>
          <div><span className={'text-bold'}>Dex: </span>{hero.dexterity}</div>
          <div><span className={'text-bold'}>Int: </span>{hero.intelligence}</div>
        </div>
      </div>
    </div>
  )
}

const getHeroClassBorder = (heroClass: HeroClass) => {
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
      return 'border-neutral-300'
  }
}