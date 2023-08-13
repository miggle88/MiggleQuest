'use client'

import DestinationLayout from '@components/layout/DestinationLayout'
import { useGameState } from '@/store'
import { HeroCharacter, HeroClass } from '@/models'
import { useEffect } from 'react'
import HeroCard from '@components/roster/HeroCard'

export default function Roster() {
  const { heroes, setHeroes } = useGameState()

  useEffect(() => {
    setHeroes(getStartingHeroes())
  }, [])


  return (
    <DestinationLayout title={'Roster'} previousHref={'/'}>
      <div className={'p-4 flex flex-col'}>
        <div className={'text-2xl text-center'}>Ya dudes ({heroes.length})</div>
        <div
          className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-8'}>{heroes.map((hero) => {
          return <HeroCard key={hero.id} hero={hero}/>
        })}</div>
      </div>
    </DestinationLayout>
  )
}

function getStartingHeroes(): HeroCharacter[] {
  const base: HeroCharacter = {
    id: '1',
    accountId: '1',
    characterName: 'Steve',
    icon: 'none',
    description: 'base dude',
    level: 1,
    class: HeroClass.Cleric,
    experience: 0,
    hitPoints: 15,
    strength: 3,
    dexterity: 3,
    intelligence: 3,
    constitution: 3,
    isAlive: true,
    hiredAt: new Date(),
  }
  return [
    {
      ...base, characterName: 'Bob',
      class: HeroClass.Fighter,
      strength: 4,
      hitPoints: 20,
    },
    {
      ...base, characterName: 'Claude',
      class: HeroClass.Rogue,
      dexterity: 4,
    },
    {
      ...base, characterName: 'Miggle',
      class: HeroClass.Wizard,
      intelligence: 4,
      hitPoints: 12,
    },
    {
      ...base, characterName: 'Larry',
      class: HeroClass.Cleric,
      intelligence: 4,
      hitPoints: 16,
    },
  ]
}