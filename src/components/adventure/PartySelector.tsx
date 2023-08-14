import { HeroCharacter } from '@/models'
import PartySlot from '@components/adventure/PartySlot'

export interface PartySelectorProps {
  availableHeroes: HeroCharacter[]
  selectedParty: (HeroCharacter | null)[]
  onPartyChanged?: (party: (HeroCharacter | null)[]) => void
}

export default function PartySelector(props: PartySelectorProps) {

  const handleHeroChanged = (hero: HeroCharacter | null, index: number) => {
    console.log(`Hero in party slot ${index} was changed to`, hero)

    // Replace the hero in the slot that was changed
    const newParty = [...props.selectedParty]
    newParty[index] = hero

    props.onPartyChanged && props.onPartyChanged(newParty)
  }

  return (
    <div className={'flex flex-col p-2'}>
      <div className={'text-center text-md lg:text-lg'}>Select between two through four party members that meet the
        minimum level
        requirement for the biome you wish
        to embark on.
      </div>
      <div className={'py-2'}></div>
      <div className={'border-2 rounded border-neutral-500 p-2'}>
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'}>
          <PartySlot selectedHero={props.selectedParty[0]}
                     onHeroChanged={(hero) => handleHeroChanged(hero, 0)}/>
          <PartySlot selectedHero={props.selectedParty[1]}
                     onHeroChanged={(hero) => handleHeroChanged(hero, 1)}/>
          <PartySlot selectedHero={props.selectedParty[2]}
                     onHeroChanged={(hero) => handleHeroChanged(hero, 2)}/>
          <PartySlot selectedHero={props.selectedParty[3]}
                     onHeroChanged={(hero) => handleHeroChanged(hero, 3)}/>
        </div>
      </div>
    </div>


  )
}