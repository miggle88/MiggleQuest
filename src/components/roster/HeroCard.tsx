import { HeroCharacter, HeroStatus } from '@/models'
import { toTitleCase } from '@/utils/strings'
import HeroBorder from '@components/common/HeroBorder'

export interface HeroCardProps {
  hero: HeroCharacter
}

export default function HeroCard(props: HeroCardProps) {
  const { hero } = props

  return (
    <HeroBorder hero={hero}>
      <div className={'flex flex-col place-content-center p-4'}>
        <div className={'flex flex-row'}>
          <div className={'grow text-xl font-bold'}>{hero.characterName}</div>
          <div className={'grow text-lg'}>{toTitleCase(hero.class)}</div>
          <div><span className={'font-bold'}>Level: </span>{hero.level}</div>
        </div>
        <div className={'py-2'}/>
        <div className={'grow text-center'}><span className={'font-bold'}>Hit Points: </span>{hero.hitPoints}</div>
        <div className={'text-center'}><span className={'font-bold'}>{hero.status}</span></div>
        <div className={'py-2'}></div>
        <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-center'}>
          <div><span className={'text-bold'}>Str: </span>{hero.strength}</div>
          <div><span className={'text-bold'}>Con: </span>{hero.constitution}</div>
          <div><span className={'text-bold'}>Dex: </span>{hero.dexterity}</div>
          <div><span className={'text-bold'}>Int: </span>{hero.intelligence}</div>
        </div>
      </div>
    </HeroBorder>
  )
}
