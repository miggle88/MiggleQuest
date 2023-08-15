'use client'
import { ReactNode, useCallback, useEffect } from 'react'

export interface DialogModalProps {
  show: boolean
  onDismiss?: () => void
  children?: ReactNode
}

export default function DialogModal(props: DialogModalProps) {
  // Close on ESC key callback for Keyboard event
  const escFunction = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      props.onDismiss && props.onDismiss()
    }
  }, [])

  // Register the keyboard event and unregister when component is removed
  useEffect(() => {
    document.addEventListener('keydown', escFunction, true)
    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  }, [escFunction])

  if (!props.show) {
    return null
  }

  return (
    <div className={'z-10'} onClick={() => props.onDismiss && props.onDismiss()}>
      <div className={'fixed inset-0 bg-black bg-opacity-70 transition-opacity'}/>
      <div className={'fixed inset-0 z-10 overflow-y-auto'}>
        <div className={'flex min-h-full items-center justify-center p-4'}>
          <div className={'relative transform overflow-hidden bg-white'}>
            <div className={'w-full h-full'}
                 onClick={(e) => e.stopPropagation()}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}