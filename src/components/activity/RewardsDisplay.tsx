'use client'

import { HeroCharacter } from '@/models'
import HeroBorder from '@components/common/HeroBorder'
import ProgressBar from '@components/common/ProgressBar'
import Conditional from '@components/layout/Conditional'

export interface RewardsDisplayProps {
  experience: number
  gold: number
  party: HeroCharacter[]
  levelUpIds: string[]
  onClose?: () => void
}

export default function RewardsDisplay(props: RewardsDisplayProps) {
  const { experience, gold, party, levelUpIds } = props
  return (
    <div className={'border-2 border-neutral-500 bg-neutral-900 '}>
      <div className={'flex flex-col place-items-center p-2 '}>
        <div className={'text-center text-2xl md:text-3xl'}>Rewards Summary</div>
        <div className={'h-[2px] w-full bg-neutral-400 my-2'}></div>
        <div className={'text-center text-lg md:text-xl p-2'}>The party has gained <span
          className={'text-green-400 font-bold'}>{experience} experience</span> and <span
          className={'text-yellow-300 font-bold'}>{gold} gold</span>.
        </div>

        <div className={'py-2'}/>
        <div className={'w-full grid grid-cols-1 sm:grid-cols-2 gap-2'}>
          {party.map((hero) => {
            return (<div key={hero.id}>
              <HeroBorder hero={hero}>
                <div className={'flex flex-col text-center px-4 py-2'}>
                  <div className={'text-xl font-bold'}>{hero.characterName}</div>
                  <div className={'py-1'}/>
                  <ProgressBar percent={Math.min(hero.experience, 100)}
                               borderColor={'border-neutral-800'}
                               bgColor={'bg-neutral-950'}
                               fillColor={'bg-green-400'}/>
                  <Conditional condition={levelUpIds.includes(hero.id)}>
                    <div className={'py-1'}/>
                    <div className={'text-lg'}>LEVEL UP to <span className={'font-bold'}>{hero.level}!</span></div>
                  </Conditional>
                </div>
              </HeroBorder>
            </div>)
          })}
        </div>
        <div className={'py-2'}/>
        <button className={'border-2 border-neutral-500 hover:bg-neutral-700 active:bg-neutral-600 px-6 py-2'}
                onClick={() => props.onClose && props.onClose()}>Ok!
        </button>
      </div>
    </div>
  )
}
