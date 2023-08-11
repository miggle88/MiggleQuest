'use client'

import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginModal from '@/components/modals/LoginModal'
import SignupModal from '@/components/modals/SignupModal'
import { EventsContext } from '@/contexts/EventsContext'
import { EventName } from '@/constants'
import { useAuthToken } from '@/hooks/useAuthToken'

export default function Home() {
  const { push } = useRouter()
  const { token, setToken } = useAuthToken()
  const { emitter } = useContext(EventsContext)!
  const [showSignup, setShowSignup] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
      push('/play')
    }
  }, [isLoggedIn, push])

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

  return (
    <main>
      { /* Keep this as the first element to prevent layout issues! */}
      <LoginModal show={showLogin}
                  onDismiss={() => setShowLogin(false)}
                  onSuccess={async (result) => {
                    console.log('User has logged in successfully')
                    setShowLogin(false)
                    setToken(result.token)
                    setIsLoggedIn(true)
                  }}
                  onError={error => {
                    console.log('User was unable to login', error)
                    setIsLoggedIn(false)
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
