'use client'

import { CookiesProvider } from 'next-client-cookies'

// @ts-ignore
export const ClientCookiesProvider: typeof CookiesProvider = (props) => (
  <CookiesProvider {...props}/>
)
