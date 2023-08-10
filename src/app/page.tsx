'use client'
import SignupModal from '@/components/SignupModal'
import { useContext, useState } from 'react'
import { NavBarContext } from '@/contexts/NavBarContext'

export default function Home() {
  const context = useContext(NavBarContext)
  const [showSignup, setShowSignup] = useState(false)

  context.signupRequested = () => setShowSignup(true)

  return (
    <main>
      { /* Keep this as the first element to prevent layout issues! */}
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
