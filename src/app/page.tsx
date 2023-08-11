'use client'

import SignupModal from '@/components/modals/SignupModal'
import { useContext, useEffect, useState } from 'react'
import LoginModal from '@/components/modals/LoginModal'
import { EventsContext } from '@/contexts/EventsContext'
import { EventName } from '@/constants'
import { useQuery } from '@tanstack/react-query'
import { getAccountForCurrentUser } from '@/api-client'
import { UserContext } from '@/contexts/UserContext'
import { useAuthToken } from '@/hooks/useAuthToken'

export default function Home() {
  const { token, deleteToken } = useAuthToken()
  const { emitter } = useContext(EventsContext)!
  const { currentUser, setCurrentUser } = useContext(UserContext)!
  const [showSignup, setShowSignup] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    emitter.on(EventName.LoginRequested, () => {
      setShowSignup(false)
      setShowLogin(true)
    })

    emitter.on(EventName.SignupRequested, () => {
      setShowLogin(false)
      setShowSignup(true)
    })
  }, [])

  const fetchMyAccount = useQuery({
    queryKey: ['my-account'],
    queryFn: async () => {
      const result = await getAccountForCurrentUser()
      if (result.ok) {
        console.log('fetched user account', result.data)
        setCurrentUser(result.data)
        return result.data
      } else {
        console.log('unable to fetch user account, clearing token', result.error)
        setCurrentUser(null)
        deleteToken()
        return null
      }
    },
    enabled: !!token,
  })

  return (
    <main>
      { /* Keep this as the first element to prevent layout issues! */}
      <LoginModal show={showLogin}
                  onDismiss={() => setShowLogin(false)}
                  onSuccess={(account) => {
                    console.log('User has logged in successfully', account)
                    setShowLogin(false)
                  }}
                  onError={error => {
                    console.log('User was unable to login', error)
                  }}
      />

      <SignupModal show={showSignup}
                   onDismiss={() => setShowSignup(false)}
                   onSuccess={(account) => {
                     console.log('User signed up successfully', account)
                     setShowSignup(false)
                   }}
                   onError={(error) => {
                     console.log('User was unable to signup', error)
                   }}/>
      <div>
      </div>
    </main>
  )
}
