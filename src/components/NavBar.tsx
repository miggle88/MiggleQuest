'use client'

import NavLink from '@/components/NavLink'
import NavButton from '@/components/NavButton'

export type NavBarProps = {}

export default function NavBar(props: NavBarProps) {
  return (<div className={'w-full bg-indigo-700 flex flex-row space-x-16 place-items-center px-4 py-2'}>
    <div className={'text-3xl text-indigo-300'}>
      MiggleQuest
    </div>
    <NavLink href={'leaderboard'}>Leaderboard</NavLink>
    <div className={'w-full'}/>
    <NavButton onClick={() => signUpClicked()}>
      Signup / Login
    </NavButton>
  </div>)
}

function signUpClicked() {
  console.log('Signup button was clicked!')
}


