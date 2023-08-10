import { ApiError, LoginResult } from '@/types'
import Conditional from '@/components/common/Conditional'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { loginToAccount } from '@/api-client'
import Button from '@/components/common/Button'
import Divider from '@/components/common/Divider'

export type LoginModalProps = {
  show: boolean | (() => boolean)
  onSuccess?: (user: LoginResult) => void
  onError?: (error: ApiError) => void
  onDismiss?: () => void
  onSignupRequested?: () => void
}

export default function LoginModal(props: LoginModalProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const login = useMutation({
    mutationFn: loginToAccount,
    onSuccess: (res) => {
      if (res.ok) {
        // Clear the fields after successful signup
        setUsername('')
        setPassword('')
        setLoginError('')


        props.onSuccess && props.onSuccess(res.data)
      } else {
        setLoginError(res.error.message)
        props.onError && props.onError(res.error)
      }
    },
  })

  const validateAndSubmit = async () => {
    if (!username.trim()) return
    if (!password.trim()) return

    setLoginError('')

    await login.mutateAsync({
      username: username.trim(),
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
              <div className={'w-full text-3xl text-center pl-8 pr-4'}>Login</div>
              <button
                className={'w-[48px] h-[48px] text-4xl text-center text-indigo-300 font-bold rounded-2xl pr-4'}
                onClick={() => props.onDismiss && props.onDismiss()}>X
              </button>
            </div>
            <Divider/>
            <div className={'py-1'}/>
            <Button
              onClick={() => props.onSignupRequested && props.onSignupRequested()}
            >Signup
            </Button>
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
            <Conditional condition={loginError !== ''}>
              <div className={'text-center text-indigo-400 p-2'}>{loginError}
              </div>
            </Conditional>
            <Button
              onClick={() => validateAndSubmit()}
              disabled={login.isLoading}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Conditional>
  )
}
