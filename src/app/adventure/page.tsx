'use client'

import DestinationLayout from '@components/layout/DestinationLayout'
import BiomeSelector from '@components/adventure/BiomeSelector'
import { useGameState } from '@/store'
import DifficultySelector from '@components/adventure/DifficultySelector'

export default function Adventure() {

  const {
    biomes, difficultySettings,
    selectedBiome, setSelectedBiome,
    selectedDifficultySetting, setSelectedDifficultySetting,
  } = useGameState()

  return (
    <DestinationLayout title={'Adventure'} previousHref={'/town'}>
      <div className={'flex flex-col p-2'}>
        <div className={'py-2'}/>
        <div className={'text-2xl font-bold text-center'}>Select Biome</div>
        <div className={'py-2'}/>
        <BiomeSelector biomes={biomes}
                       selectedBiome={selectedBiome}
                       onSelected={(biome) => setSelectedBiome(biome)}/>
      </div>
      <div className={'py-2'}/>
      <div className={'text-2xl font-bold text-center'}>Select Difficulty</div>
      <div className={'py-2'}/>
      <DifficultySelector difficulties={difficultySettings}
                          selectedDifficulty={selectedDifficultySetting}
                          onSelected={(difficulty) => setSelectedDifficultySetting(difficulty)}/>

    </DestinationLayout>

  )
}