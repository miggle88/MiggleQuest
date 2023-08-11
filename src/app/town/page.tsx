'use client'

import DestinationLayout from '@/components/layout/DestinationLayout'
import { useContext, useEffect } from 'react'
import { BackdropContext } from '@/contexts/BackdropContext'
import DestinationButton from '@/components/DestinationButton'

export default function Town() {
  const { setBackdrop } = useContext(BackdropContext)!

  useEffect(() => {
    setBackdrop('bg-town')
  }, [])

  return (
    <DestinationLayout title={'Miggleton'} hideBackButton={false}>s
      <div className={'grid grid-cols-4 gap-4 p-4'}>
        <DestinationButton href={'/play'} title={'Hubae Bob Seve'} description={'Hubaes'} icon={'does things'}/>
        <DestinationButton title={'Hubae Bob Seve'} description={'Hubaes'} icon={'does things'}/>
        <DestinationButton title={'Hubae Bob Seve'} description={'Hubaes'} icon={'does things'}/>
        <DestinationButton title={'Hubae Bob Seve'} description={'Hubaes'} icon={'does things'}/>
        <DestinationButton title={'Hubae Bob Seve'} description={'Hubaes'} icon={'does things'}/>
        <DestinationButton title={'Hubae Bob Seve'} description={'Hubaes'} icon={'does things'}/>
      </div>


    </DestinationLayout>
  )
}