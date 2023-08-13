import { ReactNode } from 'react'

export type BackButtonProps = {
  children?: ReactNode
  onClick?: () => void
}

const NORMAL_STYLE = 'text-xl text-indigo-200 border-indigo-300 border-2 rounded-xl px-2 py-1 min-w-[200px]'
const HOVER_STYLE = 'hover:bg-indigo-900'
const ACTIVE_STYLE = 'active:bg-indigo-700'
const DISABLED_STYLE = 'disabled:bg-gray-500'


export default function BackButton(props: BackButtonProps) {
  return (
    <button
      className={`${NORMAL_STYLE} ${HOVER_STYLE} ${ACTIVE_STYLE} ${DISABLED_STYLE}`}
      onClick={() => props.onClick && props.onClick()}>
      {props.children}
    </button>

  )
}