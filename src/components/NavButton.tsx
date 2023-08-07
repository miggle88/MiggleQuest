import { ReactNode } from 'react'

export type NavButtonProps = {
  onClick?: () => void,
  children: ReactNode
}

export default function NavButton(props: NavButtonProps) {
  return (
    <button className={'min-w-fit border-white border-2 rounded-2xl hover:bg-indigo-500 active:bg-indigo-400 px-4 py-2'}
            onClick={() => props.onClick && props.onClick()}>
      {props.children}
    </button>)
}
