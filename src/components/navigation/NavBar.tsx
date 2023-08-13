import UserPanel from '@/components/UserPanel'

export type NavBarProps = {}

export default function NavBar(props: NavBarProps) {
  return (<div className={'w-full flex flex-row space-x-4 bg-indigo-900 bg-opacity-80 place-items-center px-4 py-2'}>
    <div className={'text-3xl text-white'}>
      MiggleQuest
    </div>
    <div className={'grow'}/>
    <UserPanel/>
  </div>)
}


