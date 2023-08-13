import DestinationLayout from '@components/layout/DestinationLayout'
import Link from 'next/link'

export default function Town() {

  return (
    <DestinationLayout title={'Town'}>
      <div className={'text-3xl text-center p-16'}>You are in town, do some stuff here</div>
      <div className={'grid grid-cols-4 gap-4 p-16'}>
        <div className={'text-2xl text-center border-2 rounded-2xl hover:underline p-4'}>
          <Link href={'roster'}>Roster</Link>
        </div>
      </div>

    </DestinationLayout>
  )
}