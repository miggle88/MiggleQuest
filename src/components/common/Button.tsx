import { ReactNode } from 'react'

export interface ButtonProps {
  children?: ReactNode
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
}

const NORMAL_STYLE = 'text-xl text-indigo-300 border-indigo-400 border-2 rounded-2xl px-2 py-1'
const HOVER_STYLE = 'hover:bg-indigo-950'
const ACTIVE_STYLE = 'active:bg-indigo-900'
const DISABLED_STYLE = 'disabled:bg-gray-700'

export default function Button(props: ButtonProps) {
  return <button
    className={`${NORMAL_STYLE} ${HOVER_STYLE} ${ACTIVE_STYLE} ${DISABLED_STYLE}`}
    type={props.type ?? 'button'}
    disabled={props.disabled ?? false} onClick={() => props.onClick && props.onClick()}>
    {props.children}
  </button>
}


