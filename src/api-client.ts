'use client'
import { ApiError, ApiResponse, HttpMethod, LoginRequest, LoginResult, SignupRequest, UserAccount } from '@/types'

const BASE_PATH = '/api'

export async function signupForAccount(data: SignupRequest): Promise<ApiResponse<UserAccount>> {
  return makeApiCall('signup', data, 'POST')
}

export async function loginToAccount(data: LoginRequest): Promise<ApiResponse<LoginResult>> {
  return makeApiCall('login', data, 'POST')
}

export async function makeApiCall<TRequest, TResponse>(url: string, data: TRequest, method: HttpMethod = 'GET'): Promise<ApiResponse<TResponse>> {
  const res = await fetch(`${BASE_PATH}/${url}`, {
    method,
    body: JSON.stringify(data),
  })

  return {
    status: res.status,
    ok: res.ok,
    data: await dataFromResponse(res),
    error: await apiErrorFromResponse(res),
  }
}

async function dataFromResponse<TData>(res: Response): Promise<TData | null> {
  // If not OK status, no data so return null
  if (!res.ok) {
    return null
  }

  const body = await res.json()
  return body as TData
}

async function apiErrorFromResponse(res: Response): Promise<ApiError | null> {
  // If OK status, no error so return null
  if (res.ok) {
    return null
  }

  const body = await res.json()
  return {
    message: body.errorMessage ?? 'An error has occurred',
  }
}