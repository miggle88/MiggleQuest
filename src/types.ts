export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type AnyObject = Record<string, any>

export type ApiResponse<TData = AnyObject, TError = ApiError> =
  { status: number, ok: true, data: TData } | { status: number, ok: false, error: TError }

export type ApiError = {
  message: string
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
  createdAt: Date,
  updatedAt: Date
}

