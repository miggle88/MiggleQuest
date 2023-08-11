'use client'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getAccountForCurrentUser, getHeroesForAccount } from '@/api-client'
import { useAuthToken } from '@/hooks/useAuthToken'
import { UserContext } from '@/contexts/UserContext'

export default function Play() {
  const { push } = useRouter()
  const { token, setToken } = useAuthToken()
  const { currentUser, setCurrentUser } = useContext(UserContext)!

  const fetchMyAccount = useQuery({
    queryKey: ['fetch-account'],
    queryFn: async () => {
      const result = await getAccountForCurrentUser()
      if (result.ok) {
        console.log('fetched user account', result.data)
        setCurrentUser(result.data)
        return result.data
      } else {
        console.log('unable to fetch user account', result.error)
        setToken(null)
        setCurrentUser(null)
        push('/')
        return null
      }
    },
    enabled: !!token,
  })

  const fetchHeroes = useQuery({
    queryKey: ['fetch-heroes'],
    queryFn: async () => {
      const result = await getHeroesForAccount()
      if (result.ok) {
        console.log(`fetched ${result.data.length} heroes for account`, result.data)
        return result.data
      } else {
        console.log('unable to fetch heroes', result.error)
        return null
      }
    },
    enabled: !!token,
  })
  
  return (<div></div>)
}