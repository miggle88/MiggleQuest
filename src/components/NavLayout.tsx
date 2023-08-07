'use client'

import { ReactNode } from 'react'
import { NavBarContext } from '@/contexts/NavBarContext'
import NavBar from '@/components/NavBar'

export type NavLayoutProps = {
  children?: ReactNode
}

export default function NavLayout(props: NavLayoutProps) {
  return (<div className={'flex flex-col'}>
    <NavBarContext.Provider value={{}}>
      <NavBar/>
      {props.children}
    </NavBarContext.Provider>
  </div>)
}