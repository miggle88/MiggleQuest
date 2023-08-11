'use client'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getAccountForCurrentUser, getHeroesForAccount } from '@/api-client'
import { useAuthToken } from '@/hooks/useAuthToken'
import { UserContext } from '@/contexts/UserContext'
import { HeroCharacter } from '@/types'
import HeroCard from '@/components/HeroCard'

export default function Play() {
  const { push } = useRouter()
  const { token, setToken } = useAuthToken()
  const { currentUser, setCurrentUser } = useContext(UserContext)!
  const [heroes, setHeroes] = useState<HeroCharacter[]>([])

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
        setHeroes(result.data)
        return result.data
      } else {
        console.log('unable to fetch heroes', result.error)
        setHeroes([])
        return null
      }
    },
    enabled: !!token,
  })

  return (<div className={'grid grid-cols-3 gap-4 p-8'}>
    {heroes.map((hero) => (
      <HeroCard key={hero.id} hero={hero}/>
    ))}
  </div>)
}