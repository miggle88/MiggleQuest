'use client'

import { useContext } from 'react'
import Conditional from '@/components/common/Conditional'
import NavLink from '@/components/navigation/NavLink'
import NavButton from '@/components/navigation/NavButton'
import { UserContext } from '@/contexts/UserContext'
import { EventsContext } from '@/contexts/EventsContext'
import { EventName } from '@/constants'

export type NavBarProps = {}

export default function NavBar(props: NavBarProps) {
  const { emitter } = useContext(EventsContext)!
  const { currentUser, setCurrentUser } = useContext(UserContext)!

  return (<div className={'w-full bg-indigo-700 flex flex-row space-x-16 place-items-center px-4 py-2'}>
    <div className={'text-3xl text-indigo-300'}>
      MiggleQuest
    </div>
    <NavLink href={'leaderboard'}>Leaderboard</NavLink>
    <div className={'w-full'}/>
    <Conditional condition={!currentUser}>
      <NavButton onClick={() => emitter.emit(EventName.LoginRequested)}>
        Signup or Login
      </NavButton>
    </Conditional>
  </div>)
}


