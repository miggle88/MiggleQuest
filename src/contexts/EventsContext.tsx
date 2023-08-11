import EventEmitter from 'events'
import { createContext, ReactNode, useRef } from 'react'

export type EventContextType = {
  emitter: EventEmitter
}

export const EventsContext = createContext<EventContextType | null>(null)

export type EventContextProviderProps = {
  children: ReactNode
}

export function EventContextProvider(props: EventContextProviderProps) {
  const emitter = useRef(new EventEmitter())
  
  return (
    <EventsContext.Provider value={{ emitter: emitter.current }}>
      {props.children}
    </EventsContext.Provider>
  )
}