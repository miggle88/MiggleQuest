'use client'

import { useGameState } from '@/store'
import DestinationLayout from '@components/layout/DestinationLayout'
import ActivityCard from '@components/activity/ActivityCard'
import Conditional from '@components/layout/Conditional'
import NavButton from '@components/common/NavButton'
import { Activity, HeroCharacter } from '@/models'
import { calcExperienceReward, calcGoldReward } from '@/utils/formulas'
import { useState } from 'react'
import DialogModal from '@components/common/DialogModal'
import RewardsDisplay from '@components/activity/RewardsDisplay'

export default function Activity() {
  const [showRewardsModal, setShowRewardsModal] = useState(false)
  const [expReward, setExpReward] = useState(0)
  const [goldReward, setGoldReward] = useState(0)
  const [party, setParty] = useState<HeroCharacter[]>([])
  const [levelUpIds, setLevelUpIds] = useState<string[]>([])

  const { activities, removeActivity, incrementUserGold } = useGameState()


  const sortedActivities = [...activities].sort(activitySorter)
  const handleClaim = (activity: Activity) => {
    if (activity.claimedAt) {
      return
    }

    const exp = calcExperienceReward(activity)
    const gold = calcGoldReward(activity)

    const ids: string[] = []
    for (const hero of activity.party) {
      hero.experience += exp

      while (hero.experience >= 100) {
        hero.level += 1
        hero.experience = Math.max(0, hero.experience - 100)

        ids.push(hero.id)
      }
    }

    incrementUserGold(gold)

    setExpReward(exp)
    setGoldReward(gold)
    setParty(activity.party)
    setLevelUpIds(ids)
    setShowRewardsModal(true)

    activity.claimedAt = new Date()
    removeActivity(activity.id)
  }

  return (
    <DestinationLayout title={'Activity Log'} previousHref={'/town'} backButtonText={'Go Back'}>
      <DialogModal show={showRewardsModal} onDismiss={() => setShowRewardsModal(false)}>
        <RewardsDisplay experience={expReward} gold={goldReward} party={party} levelUpIds={levelUpIds}
                        onClose={() => setShowRewardsModal(false)}/>
      </DialogModal>
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