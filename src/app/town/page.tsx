import DestinationLayout from '@components/layout/DestinationLayout'
import NavButton from '@components/common/NavButton'

export default function Town() {

  return (
    <DestinationLayout title={'Town'}>
      <div className={'text-3xl text-center p-16'}>You are in town, do some stuff here</div>
      <div className={'grid grid-cols-4 gap-4 p-16'}>
        <NavButton href={'/roster'}><span>Roster</span></NavButton>
        <NavButton href={'/adventure'}><span>Adventure</span></NavButton>
        <NavButton href={'/activity'}><span>Activity Log</span></NavButton>
      </div>

    </DestinationLayout>
  )
}