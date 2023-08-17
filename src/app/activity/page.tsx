'use client'

import { useGameState } from '@/store'
import DestinationLayout from '@components/layout/DestinationLayout'
import ActivityCard from '@components/activity/ActivityCard'
import { Activity } from '@/models'
import Conditional from '@components/layout/Conditional'
import NavButton from '@components/common/NavButton'

export default function Activity() {
  const { activities, removeActivity } = useGameState()


  const sortedActivities = [...activities].sort(activitySorter)
  const handleClaim = (activity: Activity) => {
    if (activity.claimedAt) {
      return
    }

    activity.claimedAt = new Date()
    removeActivity(activity.id)
  }

  return (
    <DestinationLayout title={'Activity Log'} previousHref={'/town'} backButtonText={'Go Back'}>
      <Conditional condition={activities.length === 0}>
        <div className={'flex flex-col place-items-center p-20'}>
          <div className={'text-4xl'}>You have no activities to display</div>
          <div className={'py-8'}></div>
          <NavButton href={'/adventure'}>Start Adventure</NavButton>
        </div>

      </Conditional>
      <div className={'grid grid-cols-1 gap-4 p-4'}>
        {sortedActivities.map((activity) =>
          (<ActivityCard key={activity.id} activity={activity} onClaim={() => handleClaim(activity)
          }/>))

        }
      </div>
    </DestinationLayout>
  )
}

function activitySorter(a: Activity, b: Activity): number {
  return b.startedAt.valueOf() - a.startedAt.valueOf()
}