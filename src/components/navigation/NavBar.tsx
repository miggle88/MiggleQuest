import NavLink from '@/components/navigation/NavLink'
import UserPanel from '@/components/UserPanel'
import GoldPanel from '@/components/GoldPanel'

export type NavBarProps = {}

export default function NavBar(props: NavBarProps) {
  return (<div className={'w-full bg-indigo-700 flex flex-row space-x-4 place-items-center px-4 py-2'}>
    <div className={'text-3xl text-indigo-300'}>
      MiggleQuest
    </div>
    <NavLink href={'leaderboard'}>Leaderboard</NavLink>
    <div className={'w-full'}/>
    <GoldPanel/>
    <UserPanel/>
  </div>)
}


