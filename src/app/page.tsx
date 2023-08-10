'use client'
import SignupModal from '@/components/modals/SignupModal'
import { useContext, useState } from 'react'
import { NavBarContext } from '@/contexts/NavBarContext'
import LoginModal from '@/components/modals/LoginModal'

export default function Home() {
  const context = useContext(NavBarContext)
  const [showSignup, setShowSignup] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  context.loginRequested = () => {
    setShowSignup(false)
    setShowLogin(true)
  }

  return (
    <main>
      { /* Keep this as the first element to prevent layout issues! */}
      <LoginModal show={showLogin}
                  onDismiss={() => setShowLogin(false)}
                  onSignupRequested={() => {
                    setShowLogin(false)
                    setShowSignup(true)
                  }}
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
                   onLoginRequested={() => {
                     setShowLogin(true)
                     setShowSignup(false)
                   }}
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
