'use client'

import { ReactNode } from 'react'
import { useGameState } from '@/store'
import Conditional from '@components/layout/Conditional'
import Link from 'next/link'

export interface DestinationLayoutProps {
  title: string
  previousHref?: string
  children?: ReactNode
}

export default function DestinationLayout(props: DestinationLayoutProps) {
  const { userCurrency } = useGameState()

  return (<div className={'w-full h-full flex flex-col'}>
    <div className={'w-full flex flex-row min-h-[92px] place-items-center border-neutral-700 border-b-2 p-4'}>
      <div className={'min-w-[160px]'}>
        <Conditional condition={!!props.previousHref}>
          <div
            className={'text-xl text-center border-white border-2 rounded-xl hover:bg-neutral-900 active:bg-neutral-800 px-4 py-2'}>
            <Link href={props.previousHref!}>Go back</Link>
          </div>
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
