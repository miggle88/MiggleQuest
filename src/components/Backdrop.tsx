'use client'

import { ReactNode, useContext } from 'react'
import { BackdropContext } from '@/contexts/BackdropContext'

export type BackdropProps = {
  children?: ReactNode
}

export default function Backdrop(props: BackdropProps) {
  const { backdrop } = useContext(BackdropContext)!

  return (
    <div className={`w-full h-screen fixed ${backdrop} bg-no-repeat bg-cover bg-fixed`}>
      {props.children}
    </div>
  )
}