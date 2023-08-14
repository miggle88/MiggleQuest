'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useGameState } from '@/store'
import Conditional from '@components/layout/Conditional'
import NavButton from '@components/common/NavButton'

export interface DestinationLayoutProps {
  title: string
  previousHref?: string
  backButtonText?: string
  children?: ReactNode
}

export default function DestinationLayout(props: DestinationLayoutProps) {
  const { push } = useRouter()
  const { userCurrency } = useGameState()

  const navigateBack = () => {
    push(props.previousHref!)
  }

  return (<div className={'w-full h-full flex flex-col'}>
    <div className={'w-full flex flex-row min-h-[92px] place-items-center border-neutral-700 border-b-2 p-4'}>
      <div className={'min-w-[160px]'}>
        <Conditional condition={!!props.previousHref}>
          <NavButton href={props.previousHref!}>
            <span className={'text-xl text-center'}>{props.backButtonText ?? 'Go Back'}</span>
          </NavButton>
        </Conditional>
      </div>
      <div className={'grow text-3xl text-center'}>
        {props.title}
      </div>
      <div className={'min-w-[160px] text-2xl text-right'}>
        <span className={'font-bold text-yellow-300'}>{userCurrency?.gold.toLocaleString() ?? 0}</span>
        <span className={'text-yellow-600'}> gold</span>
      </div>
    </div>
    <div>
      {props.children}
    </div>
  </div>)
}
