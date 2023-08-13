import { HeroCharacter } from '@/models'


export interface HeroCardProps {
  hero: HeroCharacter
}

export default function HeroCard(props: HeroCardProps) {
  const hero = props.hero
  return (
    <div className={'border-2 border-neutral-500 rounded p-2'}>
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