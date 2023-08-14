'use client'

import DestinationLayout from '@components/layout/DestinationLayout'
import { useGameState } from '@/store'
import HeroCard from '@components/roster/HeroCard'

export default function Roster() {
  const { heroes } = useGameState()

  return (
    <DestinationLayout title={'Roster'} previousHref={'/town'}>
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
