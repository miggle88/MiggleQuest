import { useEffect, useState } from 'react'
import { useCookies } from 'next-client-cookies'

export type UseAuthTokenType = {
  token: string | null
  setToken: (token: string | null) => void
  deleteToken: () => void
}

export function useAuthToken(): UseAuthTokenType {
  const cookies = useCookies()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const cookieToken = cookies.get('token') ?? null
    setToken(cookieToken)
  }, [])

  const deleteToken = () => {
    cookies.remove('token')
    setToken(null)
  }

  return {
    token,
    setToken,
    deleteToken,
  }
}