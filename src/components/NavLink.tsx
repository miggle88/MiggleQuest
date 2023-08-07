import { ReactNode } from 'react'
import Link from 'next/link'

export type NavLinkProps = {
  href: string
  children: ReactNode
}

export default function NavLink(props: NavLinkProps) {
  return (<div className={'text-white text-xl hover:underline p-2'}>
    <Link href={props.href}>
      {props.children}
    </Link>
  </div>)
}
