import { Activity } from '@/models'
import { toTitleCase } from '@/utils/strings'
import HeroBorder from '@components/common/HeroBorder'

export interface ActivityCardProps {
  activity: Activity
}


export default function ActivityCard(props: ActivityCardProps) {
  const { activity } = props
  const { biome, difficulty, party } = activity

  return (
    <div className={'border-2 border-neutral-500 p-2'}>
      <div className={'flex flex-col'}>
        <div className={'flex flex-row px-2'}>
          <div className={'grow text-left text-2xl font-bold'}>{toTitleCase(activity.type)}</div>
          <div className={'grow text-center text-2xl font-bold'}>{activity.biome.name}</div>
          <div className={'grow text-right text-2xl font-bold'}>{activity.difficulty.name}</div>
        </div>
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2'}>
          {party.map((hero) => {
            return (<div key={hero.id}>
              <HeroBorder hero={hero}>
                <div className={'flex flex-row space-x-2 place-items-center p-2'}>
                  <div className={'text-xl font-bold grow'}>{hero.characterName}</div>
                  <div className={''}>{hero.level}</div>
                  <div className={''}>{hero.class}</div>
                </div>
              </HeroBorder>
            </div>)
          })}
        </div>
      </div>
    </div>

  )
}