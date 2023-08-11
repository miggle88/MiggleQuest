import exp from 'constants'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type AnyObject = Record<string, any>

export type ApiResponse<TData = AnyObject, TError = ApiError> =
  { status: number, ok: true, data: TData } | { status: number, ok: false, error: TError }

export type ApiError = {
  message: string
}

export type UserToken = {
  id: number
  username: string
}

export type SignupRequest = {
  username: string
  displayName: string
  emailAddress: string
  password: string
}

export type LoginRequest = {
  username: string
  password: string
}

export type LoginResult = {
  token: string
}

export type UserAccount = {
  id: number
  username: string
  displayName: string
  emailAddress: string
  gold: number
  createdAt: Date,
  updatedAt: Date
}

export enum HeroClass {
  Fighter = 'FIGHTER',
  Rogue = 'ROGUE',
  Wizard = 'WIZARD',
  Cleric = 'CLERIC'
}

export type HeroCharacter = {
  id: number
  accountId: number,
  icon?: string
  flavorText?: string
  characterName: string
  level: number
  class: HeroClass
  experience: number
  isAlive: boolean
  isAvailable: boolean
  nextAvailableAt?: Date
  strength: number
  dexterity: number
  intelligence: number
  constitution: number
  hitPoints: number
  hiredAt: Date
  diedAt?: Date
}

