import {ReactNode} from 'react'

export type ConditionalProps = {
  condition: boolean | (() => boolean)
  children: ReactNode
}

function Conditional (props: ConditionalProps) {
  const shouldShow = typeof props.condition === 'function'
    ? props.condition()
    : props.condition

  return shouldShow ? <>{props.children}</> : null
}

export default Conditional