import { HeroCharacter } from '@/models'
import HeroListItem from '@components/adventure/HeroListItem'

export interface HeroSelectorProps {
  heroes: HeroCharacter[]
  onHeroSelected?: (hero: HeroCharacter) => void
}


export default function HeroSelector(props: HeroSelectorProps) {

  const handleHeroSelected = (hero: HeroCharacter) => {
    props.onHeroSelected && props.onHeroSelected(hero)
  }

  return (
    <div className={'bg-gray-700'}>
      <div className={'grid grid-cols-1 gap-1'}>
        {props.heroes.map((hero) => {
          return <HeroListItem key={hero.id}
                               hero={hero}
                               onClick={() => handleHeroSelected(hero)}/>
        })}
      </div>
    </div>
  )
}