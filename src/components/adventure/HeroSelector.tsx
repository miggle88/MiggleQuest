import { HeroCharacter } from '@/models'
import HeroListItem from '@components/adventure/HeroListItem'
import Conditional from '@components/layout/Conditional'

export interface HeroSelectorProps {
  heroes: HeroCharacter[]
  onHeroSelected?: (hero: HeroCharacter) => void
  onCancel?: () => void
}


export default function HeroSelector(props: HeroSelectorProps) {

  const handleHeroSelected = (hero: HeroCharacter) => {
    props.onHeroSelected && props.onHeroSelected(hero)
  }

  const borderColor = props.heroes.length > 0 ? 'border-neutral-500' : 'border-red-400'

  return (
    <div className={`min-w-[200px] min-h-[100px] bg-neutral-800 border-2 ${borderColor} p-6`}>
      <div className={'flex flex-col place-items-center'}>
        <div className={'text-xl font-bold text-center'}>Available Heroes</div>
        <div className={'h-[2px] w-full bg-neutral-400 my-2'}/>
        <div className={'py-2'}/>
        <Conditional condition={props.heroes.length === 0}>
          <div className={'text-center p-2'}>You have no available heroes</div>

        </Conditional>

        <Conditional condition={props.heroes.length > 0}>
          <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1'}>
            {props.heroes.map((hero) => {
              return <HeroListItem key={hero.id}
                                   hero={hero}
                                   onClick={() => handleHeroSelected(hero)}/>
            })}
          </div>

        </Conditional>
        <div className={'py-2'}/>
        <button className={'border-2 border-red-400 hover:bg-neutral-700 active:bg-red-500 px-6 py-2'}
                onClick={() => props.onCancel && props.onCancel()}>Cancel
        </button>
      </div>
    </div>
  )
}