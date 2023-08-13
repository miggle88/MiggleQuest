import { ReactNode } from 'react'
import Conditional from '@/components/common/Conditional'
import BackButton from '@/components/BackButton'

export type DestinationLayoutProps = {
  title: string
  hideBackButton?: boolean
  onBack?: () => void
  children?: ReactNode
}

export default function DestinationLayout(props: DestinationLayoutProps) {
  return (
    <div className={'flex flex-col'}>
      <div className={'flex flex-row w-full bg-indigo-950 bg-opacity-50 place-items-center'}>
        <div className={'basis-1/5 px-4 py-2'}>
          <Conditional condition={!props.hideBackButton}>
            <BackButton onClick={() => props.onBack && props.onBack()}>Back</BackButton>
          </Conditional>
        </div>
        <div className={'basis-3/5 px-4 py-2 text-3xl text-center font-bold'}>{props.title}</div>
        <div className={'basis-1/5 px-4 py-2 text-2xl text-right'}>100000 Gold</div>
      </div>
      <div className={'grow'}>{props.children}</div>
    </div>
  )
}