'use client'

import Conditional from '@/components/Conditional'
import { useState } from 'react'
import { SignupRequest } from '@/types'

export type DialogModalProps = {
  show: boolean | (() => boolean)
  onSubmit?: (req: SignupRequest) => void,
  onDismiss?: () => void
}

export default function SignupModal(props: DialogModalProps) {
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')


  const validateAndSubmit = () => {
    if (!username.trim()) return
    if (!displayName.trim()) return
    if (!emailAddress.trim()) return
    if (!password.trim()) return


    props.onSubmit && props.onSubmit({
      username,
      displayName,
      emailAddress,
      password,
    })
    // clears out the fields on submit
    setUsername('')
    setDisplayName('')
    setEmailAddress('')
    setPassword('')
  }

  return (
    <Conditional condition={props.show}>
      <div
        className={'w-screen h-screen fixed left-0 z-[1] bg-black bg-opacity-50'}>
        <div className={'w-full h-full flex place-content-center place-items-center'}>
          <div className={'flex flex-col border-indigo-400 border-2 rounded-2xl p-2'}>
            <div className={'flex flex-row space-x-8 place-items-center'}>
              <div className={'w-full text-3xl text-center pl-8 pr-4'}>Signup</div>
              <button
                className={'w-[48px] h-[48px] text-4xl text-center text-indigo-300 font-bold rounded-2xl pr-4'}
                onClick={() => props.onDismiss && props.onDismiss()}>X
              </button>
            </div>
            <div className={'border-b-2 border-indigo-400 py-2'}/>
            <div className={'py-2'}/>
            <div className={'flex flex-row place-items-center'}>
              <div className={'w-[180px] text-xl text-right px-4 py-2'}>
                Username:
              </div>
              <div className={'px-2'}>
                <input className={'w-full bg-neutral-900 text-indigo-200 border-indigo-400 border-2 px-2 py-1'}
                       value={username} onChange={(e) => setUsername(e.target.value)}/>
              </div>
            </div>
            <div className={'flex flex-row place-items-center'}>
              <div className={'w-[180px] text-xl text-right px-4 py-2'}>
                Display Name:
              </div>
              <div className={'px-2'}>
                <input className={'w-full bg-neutral-900 text-indigo-200 border-indigo-400 border-2 px-2 py-1'}
                       value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
              </div>
            </div>
            <div className={'flex flex-row place-items-center'}>
              <div className={'w-[180px] text-xl text-right px-4 py-2'}>
                Email Address:
              </div>
              <div className={'px-2'}>
                <input className={'w-full bg-neutral-900 text-indigo-200 border-indigo-400 border-2 px-2 py-1'}
                       value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}/>
              </div>
            </div>
            <div className={'flex flex-row place-items-center'}>
              <div className={'w-[180px] text-xl text-right px-4 py-2'}>
                Password:
              </div>
              <div className={'px-2'}>
                <input className={'w-full bg-neutral-900 text-indigo-200 border-indigo-400 border-2 px-2 py-1'}
                       value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </div>
            <div className={'py-2'}/>
            <button
              className={'text-xl text-indigo-300 border-indigo-400 border-2 rounded-2xl hover:bg-indigo-950 active:bg-indigo-900 px-2 py-1'}
              onClick={() => validateAndSubmit()}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </Conditional>
  )
}
