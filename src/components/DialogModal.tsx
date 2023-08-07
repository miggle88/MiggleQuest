import { ReactNode } from 'react'
import Conditional from '@/components/Conditional'

export type DialogModalProps = {
  show: boolean | (() => boolean)
  children: ReactNode
}


export default function DialogModal(props: DialogModalProps) {
  return (
    <Conditional condition={props.show}>
      <div>{props.children}</div>
    </Conditional>
  )
}
