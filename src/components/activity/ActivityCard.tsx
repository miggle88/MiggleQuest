'use client'

import { useEffect, useState } from 'react'
import { Activity } from '@/models'
import { toTitleCase } from '@/utils/strings'
import HeroBorder from '@components/common/HeroBorder'
import ProgressBar from '@components/common/ProgressBar'
import { differenceInSeconds } from 'date-fns'

export interface ActivityCardProps {
  activity: Activity
}

export default function ActivityCard(props: ActivityCardProps) {
  const [percent, setPercent] = useState(() => 0)
  const [remainingSeconds, setRemainingSeconds] = useState(0)

  const { activity } = props
  const { biome, difficulty, party } = activity

  const updateProgress = () => {
    const now = new Date()

    // Calculate the progress from the elapsed time
    const totalSeconds = differenceInSeconds(activity.completedAt, activity.startedAt)
    const secondsElapsed = differenceInSeconds(now, activity.startedAt, { roundingMethod: 'floor' })
    const percent = (secondsElapsed * 100 / totalSeconds)
    setPercent(percent)

    const remaining = Math.floor(totalSeconds - secondsElapsed)
    setRemainingSeconds(remaining)
  }

  useEffect(() => {
    updateProgress()

    // Do not start timers for activities that are completed already
    if (Date.now() >= activity.completedAt.valueOf()) {
      return
    }

    // Update this activity's progress every second
    const timer = setInterval(updateProgress, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className={'border-2 border-neutral-500 p-2'}>
      <div className={'flex flex-col'}>
        <ProgressBar percent={percent}
                     bgColor={'bg-green-950'}
                     borderColor={'border-green-400'}
                     fillColor={remainingSeconds > 0 ? 'bg-green-700' : 'bg-green-950'}>
          <div className={'text-center text-lg px-2 py-1'}>
            {remainingSeconds > 0 ? formatRemainingTime(remainingSeconds) : 'Completed'}
          </div>
        </ProgressBar>
        <div className={'py-2'}/>
        <div className={'grid grid-cols-1 sm:grid-cols-3 px-2'}>
          <div
            className={'grow text-center sm:text-left text-lg sm:text-xl font-bold'}>{toTitleCase(activity.type)}</div>
          <div className={'grow text-center text-lg sm:text-xl font-bold'}>{activity.biome.name}</div>
          <div
            className={'grow text-center sm:text-right text-lg sm:text-xl  font-bold'}>{activity.difficulty.name}</div>
        </div>
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2'}>
          {party.map((hero) => {
            return (<div key={hero.id}>
              <HeroBorder hero={hero}>
                <div className={'grid grid-cols-1 sm:grid-cols-2 gap-2 px-4 py-2'}>
                  <div className={'text-left text-xl font-bold'}>{hero.characterName}</div>
                  <div className={'text-xl'}><span>Level {hero.level} </span><span>{toTitleCase(hero.class)}</span>
                  </div>
                </div>
              </HeroBorder>
            </div>)
          })}
        </div>
      </div>
    </div>
  )
}

function formatRemainingTime(totalSeconds: number): string {
  if (totalSeconds < 60) {
    return `${totalSeconds}s`
  }

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = Math.ceil(totalSeconds - minutes * 60)

  return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`
}