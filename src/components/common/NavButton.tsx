'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

export interface NavButtonProps {
  href: string
  disabled?: boolean
  children?: ReactNode
}

export default function NavButton(props: NavButtonProps) {
  const { push } = useRouter()

  return (<button
    className={'text-2xl text-center border-2 rounded-xl hover:underline hover:bg-neutral-800 active:bg-neutral-700 p-4'}
    disabled={props.disabled ?? false}
    onClick={() => push(props.href)}>
    {props.children}
  </button>)
}