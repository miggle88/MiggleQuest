'use client'

import { useGameState } from '@/store'
import DestinationLayout from '@components/layout/DestinationLayout'
import BiomeSelector from '@components/adventure/BiomeSelector'
import DifficultySelector from '@components/adventure/DifficultySelector'
import PartySelector from '@components/adventure/PartySelector'
import { HeroCharacter } from '@/models'
import { useEffect } from 'react'

export default function Adventure() {

  const {
    biomes, difficultySettings,
    heroes, selectedParty, setSelectedParty,
    selectedBiome, setSelectedBiome,
    selectedDifficultySetting, setSelectedDifficultySetting,
  } = useGameState()

  useEffect(() => {
    setSelectedParty([heroes[0], heroes[1], heroes[2], heroes[3]])
  }, [])

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

      <div className={'py-2'}/>
      <div className={'text-2xl font-bold text-center'}>Party Select</div>
      <div className={'py-2'}/>

      <PartySelector availableHeroes={getAvailableHeroes(heroes, selectedBiome?.startingLevel)}
                     selectedParty={selectedParty}
                     onPartyChanged={(party) => {
                       console.log('Party selector reports a new party', party)
                       setSelectedParty(party)
                     }}/>

    </DestinationLayout>
  )
}

function getAvailableHeroes(heroes: HeroCharacter[], minLevel = 1): HeroCharacter[] {
  const now = new Date()
  return heroes.filter(hero => hero.isAlive && hero.level >= minLevel && (!hero.nextAvailableAt || hero.nextAvailableAt <= now))
}