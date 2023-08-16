'use client'

import { useRouter } from 'next/navigation'
import { useGameState } from '@/store'
import DestinationLayout from '@components/layout/DestinationLayout'
import BiomeSelector from '@components/adventure/BiomeSelector'
import DifficultySelector from '@components/adventure/DifficultySelector'
import PartySelector from '@components/adventure/PartySelector'
import Conditional from '@components/layout/Conditional'
import { Activity, ActivityType, HeroCharacter, HeroStatus } from '@/models'
import { v4 as uuid } from 'uuid'
import { addSeconds } from 'date-fns'
import { useEffect } from 'react'

export default function Adventure() {
  const { push } = useRouter()
  const {
    biomes, difficultySettings,
    getAvailableHeroes, selectedParty, setSelectedParty,
    selectedBiome, setSelectedBiome,
    selectedDifficultySetting, setSelectedDifficultySetting,
    addActivity,
  } = useGameState()

  useEffect(() => {
    setSelectedBiome(null)
    setSelectedDifficultySetting(null)
    setSelectedParty([null, null, null, null])
  }, [])

  const hasEnoughHeroes = selectedParty.filter((hero) => hero != null).length >= 2
  const meetsLevelRequirements = selectedParty.every((hero) => !hero || hero.level >= (selectedBiome?.startingLevel ?? 1))

  const isReady = selectedBiome != null
    && selectedDifficultySetting != null
    && hasEnoughHeroes
    && meetsLevelRequirements

  const proceedWithAdventure = () => {
    if (!isReady) {
      return
    }

    const now = new Date()
    const activity: Activity = {
      id: uuid(),
      type: ActivityType.Adventure,
      biome: selectedBiome,
      difficulty: selectedDifficultySetting,
      party: selectedParty.filter((hero) => hero != null) as HeroCharacter[],
      startedAt: now,
      completedAt: addSeconds(now, selectedDifficultySetting!.completionSeconds),
    }

    // Add activity and show activity log
    addActivity(activity)

    for (const hero of activity.party) {
      hero.status = HeroStatus.Busy
    }

    push('/activity')
  }


  const availableHeroes = getAvailableHeroes(selectedBiome?.startingLevel)
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
                     onPartyChanged={(party) => setSelectedParty(party)}/>
      <div className={'text-center py-2'}>
        <Conditional condition={isReady}>
          <div className={'text-xl font-bold'}>You are all already to go on your adventure. Best of luck!</div>
        </Conditional>
        <Conditional condition={!selectedBiome}>
          <div className={'text-lg lg:text-xl text-red-400'}>You must select a biome.</div>
        </Conditional>
        <Conditional condition={!selectedDifficultySetting}>
          <div className={'text-lg lg:text-xl text-red-400'}>You must select a difficulty.</div>
        </Conditional>
        <Conditional condition={!hasEnoughHeroes}>
          <div className={'text-lg lg:text-xl text-red-400'}>You must select at least two heroes.</div>
        </Conditional>
        <Conditional condition={!meetsLevelRequirements}>
          <div className={'text-lg lg:text-xl text-red-400'}>One or more heroes do not meet the minimum level
            requirement.
          </div>
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