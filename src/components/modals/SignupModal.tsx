'use client'

import Conditional from '@/components/common/Conditional'
import { useState } from 'react'
import { ApiError, UserAccount } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { signupForAccount } from '@/api-client'
import Button from '@/components/common/Button'
import Divider from '@/components/common/Divider'

export type DialogModalProps = {
  show: boolean | (() => boolean)
  onSuccess?: (user: UserAccount) => void
  onError?: (error: ApiError) => void
  onDismiss?: () => void
  onLoginRequested?: () => void
}

export default function SignupModal(props: DialogModalProps) {
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [signUpError, setSignupError] = useState('')

  const signup = useMutation({
    mutationFn: signupForAccount,
    onSuccess: (res) => {
      if (res.ok) {
        // Clear the fields after successful signup
        setUsername('')
        setDisplayName('')
        setEmailAddress('')
        setPassword('')
        setSignupError('')


        props.onSuccess && props.onSuccess(res.data)
      } else {
        setSignupError(res.error.message)
        props.onError && props.onError(res.error)
      }
    },
  })

  const validateAndSubmit = async () => {
    if (!username.trim()) return
    if (!displayName.trim()) return
    if (!emailAddress.trim()) return
    if (!password.trim()) return

    setSignupError('')

    await signup.mutateAsync({
      username: username.trim(),
      displayName: displayName.trim(),
      emailAddress: emailAddress.trim(),
      password: password.trim(),
    })
  }

  return (
    <Conditional condition={props.show}>
      <div
        className={'w-screen h-screen fixed left-0 z-[1] bg-black bg-opacity-50'}>
        <div className={'w-full h-full flex place-content-center place-items-center'}>
          <div className={'flex flex-col border-indigo-400 border-2 rounded-2xl p-2'}>
            <div className={'flex flex-row space-x-8 place-items-center'}>
              <div className={'w-full text-3xl text-center pl-8 pr-4'}>Signup</div>
              <Button
                onClick={() => props.onDismiss && props.onDismiss()}>X
              </Button>
            </div>
            <Divider/>
            <div className={'py-1'}/>
            <button
              className={'text-xl text-indigo-300 border-indigo-400 border-2 rounded-2xl hover:bg-indigo-950 active:bg-indigo-900 disabled:bg-gray-700 px-2 py-1'}
              onClick={() => props.onLoginRequested && props.onLoginRequested()}
            >
              Login
            </button>
            <div className={'py-2'}/>
            <div className={'flex flex-row place-items-center'}>
              <div className={'w-[180px] text-xl text-right px-4 py-2'}>
                Username:
              </div>
              <div className={'px-2'}>
                <input className={'w-full bg-neutral-900 text-indigo-200 border-indigo-400 border-2 px-2 py-1'}
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
              </div>
            </div>
            <div className={'flex flex-row place-items-center'}>
              <div className={'w-[180px] text-xl text-right px-4 py-2'}>
                Display Name:
              </div>
              <div className={'px-2'}>
                <input className={'w-full bg-neutral-900 text-indigo-200 border-indigo-400 border-2 px-2 py-1'}
                       value={displayName}
                       onChange={(e) => setDisplayName(e.target.value)}/>
              </div>
            </div>
            <div className={'flex flex-row place-items-center'}>
              <div className={'w-[180px] text-xl text-right px-4 py-2'}>
                Email Address:
              </div>
              <div className={'px-2'}>
                <input className={'w-full bg-neutral-900 text-indigo-200 border-indigo-400 border-2 px-2 py-1'}
                       value={emailAddress}
                       onChange={(e) => setEmailAddress(e.target.value)}/>
              </div>
            </div>
            <div className={'flex flex-row place-items-center'}>
              <div className={'w-[180px] text-xl text-right px-4 py-2'}>
                Password:
              </div>
              <div className={'px-2'}>
                <input className={'w-full bg-neutral-900 text-indigo-200 border-indigo-400 border-2 px-2 py-1'}
                       type={'password'}
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </div>
            <div className={'py-2'}/>
            <Conditional condition={signUpError !== ''}>
              <div className={'text-center text-indigo-400 p-2'}>{signUpError}
              </div>
            </Conditional>
            <Button
              onClick={() => validateAndSubmit()}
              disabled={signup.isLoading}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Conditional>
  )
}