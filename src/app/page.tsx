'use client'
import SignupModal from '@/components/SignupModal'
import { useContext, useState } from 'react'
import { NavBarContext } from '@/contexts/NavBarContext'

export default function Home() {
  const context = useContext(NavBarContext)
  const [showSignUp, setShowSignUp] = useState(false)

  context.signupRequested = () => setShowSignUp(true)

  return (
    <main>
      { /* Keep this as the first element to prevent layout issues! */}
      <SignupModal show={showSignUp}
                   onDismiss={() => setShowSignUp(false)}
                   onSubmit={(details) => {
                     console.log('User signed up with:', details)
                     setShowSignUp(false)
                   }}/>
      <div>
      </div>
    </main>
  )
}
