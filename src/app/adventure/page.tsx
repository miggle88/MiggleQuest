'use client'

import DestinationLayout from '@components/layout/DestinationLayout'
import BiomeSelector from '@components/adventure/BiomeSelector'
import { useGameState } from '@/store'

export default function Adventure() {

  const { biomes, selectedBiome, setSelectedBiome } = useGameState()

  return (
    <DestinationLayout title={'Adventure'} previousHref={'/town'}>
      <div className={'flex flex-col p-2'}>
        <div className={'text-2xl font-bold text-center'}>Select Biome</div>
        <div className={'py-2'}/>
        <BiomeSelector biomes={biomes} selectedBiome={selectedBiome} onSelected={(biome) => {
          setSelectedBiome(biome)

        }}/>
      </div>


    </DestinationLayout>

  )
}