'use client'
import DialogModal from '@/components/DialogModal'
import { useContext, useState } from 'react'
import { NavBarContext } from '@/contexts/NavBarContext'

export default function Home() {
  const context = useContext(NavBarContext)
  const [showSignUp, setShowSignUp] = useState(false)

  context.signupRequested = () => {
    setShowSignUp(!showSignUp)
    console.log('Signup was requested, from the nav bar!')
  }

  return (
    <main>
      <DialogModal show={showSignUp}>
        <div>Showing the modal!</div>
      </DialogModal>

      <div>
      </div>


    </main>
  )
}
