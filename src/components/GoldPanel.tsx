'use client'

import { useContext } from 'react'
import { UserContext } from '@/contexts/UserContext'

export type GoldPanelProps = {}


export default function GoldPanel(props: GoldPanelProps) {
  const { currentUser } = useContext(UserContext)!

  if (!currentUser) {
    return null
  }
  
  return (
    <div
      className={'flex flex-col min-h-[60px] min-w-[120px] text-center border-2 border-indigo-300 place-content-center '}>
      <div className={'font-bold'}>Gold</div>
      <div>{currentUser?.gold}</div>


    </div>
  )
}