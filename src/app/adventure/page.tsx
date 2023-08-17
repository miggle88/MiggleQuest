'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuid } from 'uuid'
import { addSeconds } from 'date-fns'
import { useGameState } from '@/store'
import DestinationLayout from '@components/layout/DestinationLayout'
import BiomeSelector from '@components/adventure/BiomeSelector'
import DifficultySelector from '@components/adventure/DifficultySelector'
import PartySelector from '@components/adventure/PartySelector'
import ConsiderText from '@components/adventure/ConsiderText'
import Conditional from '@components/layout/Conditional'
import { Activity, ActivityType, HeroCharacter } from '@/models'
import { calcExperienceReward, calcGoldReward, calcSuccessChance } from '@/utils/formulas'

export default function Adventure() {
  const { push } = useRouter()
  const [successChance, setSuccessChance] = useState(0)
  const [expReward, setExpReward] = useState(0)
  const [goldReward, setGoldReward] = useState(0)

  const {
    biomes, difficultySettings,
    getAvailableHeroes, selectedParty, setSelectedParty,
    selectedBiome, setSelectedBiome,
    selectedDifficultySetting, setSelectedDifficultySetting,
    addActivity,
  } = useGameState()

  const resetState = () => {
    setSelectedBiome(null)
    setSelectedDifficultySetting(null)
    setSelectedParty([null, null, null, null])
  }

  const getActivity = (): Activity => {
    const now = new Date()
    return {
      id: uuid(),
      type: ActivityType.Adventure,
      biome: selectedBiome!,
      difficulty: selectedDifficultySetting!,
      party: selectedParty.filter((hero) => hero != null) as HeroCharacter[],
      startedAt: now,
      completedAt: addSeconds(now, selectedDifficultySetting!.completionSeconds),
    }
  }

  const proceedWithAdventure = () => {
    if (!isReady) {
      return
    }

    const activity = getActivity()

    // Set hero recovery time in the future
    for (const hero of activity.party) {
      hero.nextAvailableAt = addSeconds(activity.completedAt, 5)
    }

    // Add activity and show activity log
    addActivity(activity)
    push('/activity')
  }

  useEffect(() => resetState(), [])

  useEffect(() => {
    // If not ready, do not re-calculate success chance
    const heroesInParty = selectedParty.filter(hero => hero != null) as HeroCharacter[]
    if (!selectedBiome || !selectedDifficultySetting || heroesInParty.length < 2) {
      return
    }

    // If any hero is below the minimum level, assume 0% success
    const { startingLevel, baseGold } = selectedBiome

    if (heroesInParty.some(hero => hero.level < startingLevel)) {
      setSuccessChance(0)
      setExpReward(0)
      setGoldReward(0)
      return
    }

    const activity = getActivity()

    // Calculate the success chance, exp and gold rewards for the activity
    setSuccessChance(calcSuccessChance(activity))
    setExpReward(calcExperienceReward(activity))
    setGoldReward(calcGoldReward(activity))
  }, [selectedBiome, selectedDifficultySetting, selectedParty])

  const selectedHeroCount = selectedParty.filter((hero) => hero != null).length
  const meetsLevelRequirements = selectedParty.every((hero) => !hero || hero.level >= (selectedBiome?.startingLevel ?? 1))

  const availableHeroes = getAvailableHeroes(selectedBiome?.startingLevel)
  const highestHeroLevel = Math.max(...availableHeroes.map(hero => hero.level))

  const isReady = selectedBiome != null
    && selectedDifficultySetting != null
    && selectedHeroCount >= 2
    && meetsLevelRequirements

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

      <div className={'flex flex-col p-2'}>
        <div className={'py-2'}/>
        <div className={'text-2xl font-bold text-center'}>Select Difficulty</div>
        <div className={'py-2'}/>
        <DifficultySelector difficulties={difficultySettings}
                            selectedDifficulty={selectedDifficultySetting}
                            onSelected={(difficulty) => setSelectedDifficultySetting(difficulty)}/>

        <div className={'py-2'}/>
        <div className={'text-2xl font-bold text-center'}>Party Select</div>
        <div className={'py-2'}/>
      </div>

      <div className={'flex flex-col p-2 place-items-center'}>
        <PartySelector availableHeroes={availableHeroes}
                       selectedParty={selectedParty}
                       onPartyChanged={(party) => setSelectedParty(party)}/>

        <Conditional condition={isReady}>
          <div className={'py-2 self-center'}>
            <div className={'flex flex-row self-center place-items-center space-x-2'}>
              <ConsiderText successChance={successChance}/>
              <div
                className={'text-md sm:text-lg md:text-xl text-center border-2 border-green-500 rounded p-2'}>
                <span className={'font-bold text-green-400'}>+{expReward} Party EXP</span>
              </div>
              <div
                className={'text-md sm:text-lg md:text-xl text-center border-2 border-yellow-400 rounded p-2'}>
                <span className={'font-bold text-yellow-300'}>+{goldReward} Gold</span>
              </div>
            </div>
          </div>
        </Conditional>
      </div>

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
        <Conditional condition={selectedHeroCount < 2}>
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