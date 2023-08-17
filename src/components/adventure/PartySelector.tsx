import { HeroCharacter } from '@/models'
import PartySlot from '@components/adventure/PartySlot'
import { useState } from 'react'
import DialogModal from '@components/common/DialogModal'
import HeroSelector from '@components/adventure/HeroSelector'

export interface PartySelectorProps {
  availableHeroes: HeroCharacter[]
  selectedParty: (HeroCharacter | null)[]
  onPartyChanged?: (party: (HeroCharacter | null)[]) => void
}

export default function PartySelector(props: PartySelectorProps) {

  const [heroIndex, setHeroIndex] = useState(0)
  const [showHeroModal, setShowHeroModal] = useState(false)

  const handleHeroRequested = (index: number) => {
    setHeroIndex(index)
    setShowHeroModal(true)
  }

  const handleHeroSelected = (hero: HeroCharacter) => {
    setShowHeroModal(false)

    if (heroIndex >= 0 && heroIndex < props.selectedParty.length) {
      const newParty = [...props.selectedParty]
      newParty[heroIndex] = hero

      props.onPartyChanged && props.onPartyChanged(newParty)
    }
  }

  const handleHeroRemoved = (index: number) => {

    // Remove the hero in the slot that was changed
    const newParty = [...props.selectedParty]
    newParty[index] = null

    props.onPartyChanged && props.onPartyChanged(newParty)
  }

  // Filter out heroes already in the party, and sort the heroes by level/health
  const heroesToPickFrom = props.availableHeroes
    .filter(hero => !props.selectedParty.includes(hero))
    .sort(heroListSorter)

  return (
    <div className={'flex flex-col p-2'}>
      <DialogModal show={showHeroModal} onDismiss={() => setShowHeroModal(false)}>
        <HeroSelector heroes={heroesToPickFrom}
                      onHeroSelected={(hero) => handleHeroSelected(hero)}
                      onCancel={() => setShowHeroModal(false)}/>
      </DialogModal>
      <div className={'text-center text-md lg:text-lg'}>Select between two through four party members that meet the
        minimum level
        requirement for the biome you wish
        to embark on.
      </div>
      <div className={'py-2'}></div>
      <div className={'border-2 rounded border-neutral-500 p-2'}>
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'}>
          <PartySlot selectedHero={props.selectedParty[0]}
                     onHeroRequested={() => handleHeroRequested(0)}
                     onHeroRemoved={() => handleHeroRemoved(0)}/>
          <PartySlot selectedHero={props.selectedParty[1]}
                     onHeroRequested={() => handleHeroRequested(1)}
                     onHeroRemoved={() => handleHeroRemoved(1)}/>
          <PartySlot selectedHero={props.selectedParty[2]}
                     onHeroRequested={() => handleHeroRequested(2)}
                     onHeroRemoved={() => handleHeroRemoved(2)}/>
          <PartySlot selectedHero={props.selectedParty[3]}
                     onHeroRequested={() => handleHeroRequested(3)}
                     onHeroRemoved={() => handleHeroRemoved(3)}/>
        </div>
      </div>
    </div>
  )
}

function heroListSorter(a: HeroCharacter, b: HeroCharacter): number {
  const rankA = a.level * 100 + a.hitPoints
  const rankB = b.level * 100 + b.hitPoints
  return rankB - rankA
}