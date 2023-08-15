'use client'

import { useEffect } from 'react'
import { useGameState } from '@/store'
import DestinationLayout from '@components/layout/DestinationLayout'
import { Activity, ActivityType } from '@/models'
import addSeconds from 'date-fns/addSeconds'
import ActivityCard from '@components/activity/ActivityCard'

export default function Activity() {
  const { activities, setActivities, biomes, difficultySettings, heroes } = useGameState()

  useEffect(() => {
    const now = new Date()
    const biome = biomes[0]
    const difficulty = difficultySettings[1]
    const dummyActivity: Activity = {
      id: '1',
      type: ActivityType.Adventure,
      biome,
      difficulty,
      party: heroes.slice(0, 4),
      startedAt: now,
      completedAt: addSeconds(now, difficulty.completionSeconds),
    }
    setActivities([dummyActivity])
  }, [])

  const sortedActivities = [...activities].sort(activitySorter)

  return (
    <DestinationLayout title={'Activity Log'} previousHref={'/town'} backButtonText={'Go Back'}>
      <div className={'grid grid-cols-1 gap-4 p-4'}>
        {sortedActivities.map((activity) =>
          (<ActivityCard key={activity.id} activity={activity}/>))
        }
      </div>
    </DestinationLayout>
  )
}

function activitySorter(a: Activity, b: Activity): number {
  return b.startedAt.valueOf() - a.startedAt.valueOf()
}