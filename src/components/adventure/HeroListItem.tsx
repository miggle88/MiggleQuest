import { HeroCharacter } from '@/models'
import { toTitleCase } from '@/utils/strings'
import HeroBorder from '@components/common/HeroBorder'

export interface HeroListItemProps {
  hero: HeroCharacter
  onClick?: () => void
}

export default function HeroListItem(props: HeroListItemProps) {
  const { hero } = props

  return (
    <HeroBorder hero={hero}>
      <div className={`w-[160px] md:w-[240px] lg:w-[360px] bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600`}>
        <button className={'w-full h-full'} onClick={() => props.onClick && props.onClick()}>
          <div className={'flex flex-row text-left p-2'}>
            <div className={'flex flex-col grow'}>
              <div className={'text-xl font-bold'}>{hero.characterName}</div>
              <div>
                <span>{hero.level} </span><span>{toTitleCase(hero.class)}</span>
              </div>
            </div>
            <div className={'text-right'}>HP: {hero.hitPoints}</div>
          </div>
        </button>
      </div>
    </HeroBorder>
  )
}
