'use client'

import { useGameState } from '@/store'
import DestinationLayout from '@components/layout/DestinationLayout'
import BiomeSelector from '@components/adventure/BiomeSelector'
import DifficultySelector from '@components/adventure/DifficultySelector'
import PartySelector from '@components/adventure/PartySelector'
import { HeroCharacter } from '@/models'
import { useEffect } from 'react'
import Conditional from '@components/layout/Conditional'

export default function Adventure() {
  const {
    biomes, difficultySettings,
    heroes, selectedParty, setSelectedParty,
    selectedBiome, setSelectedBiome,
    selectedDifficultySetting, setSelectedDifficultySetting,
  } = useGameState()

  const hasEnoughHeroes = selectedParty.filter((hero) => hero != null).length >= 2
  const isReady = selectedBiome != null && selectedDifficultySetting != null && hasEnoughHeroes

  useEffect(() => {
    setSelectedParty([heroes[0], heroes[1], heroes[2], heroes[3]])
  }, [])

  const proceedWithAdventure = () => {
    console.log('Do not die!')
  }

  const availableHeroes = getAvailableHeroes(heroes, selectedBiome?.startingLevel)
  const highestHeroLevel = Math.max(...availableHeroes.map(hero => hero.level))

  return (
    <DestinationLayout title={'Adventure'} previousHref={'/town'}>
      <div className={'flex flex-col p-2'}>
        <div className={'py-2'}/>
        <div className={'text-2xl font-bold text-center'}>Select Biome</div>
        <div className={'py-2'}/>
        <BiomeSelector biomes={biomes}
                       selectedBiome={selectedBiome}
                       characterLevel={highestHeroLevel}
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

      <PartySelector availableHeroes={availableHeroes}
                     selectedParty={selectedParty}
                     onPartyChanged={(party) => {
                       console.log('Party selector reports a new party', party)
                       setSelectedParty(party)
                     }}/>
      <div className={'text-center py-2'}>
        <Conditional condition={isReady}>
          <div className={'text-xl font-bold'}>You are all already to go on your adventure. Best of luck!</div>
        </Conditional>
        <Conditional condition={!selectedBiome}>
          <div className={'text-xl text-red-400'}>You must select a biome to adventure.</div>
        </Conditional>
        <Conditional condition={!selectedDifficultySetting}>
          <div className={'text-xl text-red-400'}>You must select a difficulty to adventure.</div>
        </Conditional>
        <Conditional condition={!hasEnoughHeroes}>
          <div className={'text-xl text-red-400'}>You must select at least two heroes to adventure.</div>
        </Conditional>
        <div className={'py-2'}></div>
        <button
          className={'bg-neutral-900 border-2 rounded-2xl border-green-400 text-green-400 hover:bg-green-950 active:bg-green-900 ' +
            'disabled:bg-red-950 disabled:border-red-400 disabled:text-red-400 text-xl px-4 py-2'}
          disabled={!isReady}
          onClick={() => proceedWithAdventure()}>
          <span>{isReady ? 'Proceed on Adventure' : 'Unable to Proceed'}</span>
        </button>
      </div>

    </DestinationLayout>
  )
}

function getAvailableHeroes(heroes: HeroCharacter[], minLevel = 1): HeroCharacter[] {
  const now = new Date()
  return heroes.filter(hero => hero.isAlive && hero.level >= minLevel && (!hero.nextAvailableAt || hero.nextAvailableAt <= now))
}