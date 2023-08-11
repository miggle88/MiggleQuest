import { ApiResponse, HttpMethod, LoginRequest, LoginResult, SignupRequest, UserAccount } from '@/types'

const BASE_PATH = '/api'

export async function signupForAccount(data: SignupRequest): Promise<ApiResponse<UserAccount>> {
  return makeApiCall('signup', data, 'POST')
}

export async function loginToAccount(data: LoginRequest): Promise<ApiResponse<LoginResult>> {
  return makeApiCall('login', data, 'POST')
}

export async function logoutFromAccount(): Promise<ApiResponse> {
  return makeApiCall('logout', null, 'POST')
}

export async function getAccountForCurrentUser(): Promise<ApiResponse<UserAccount>> {
  return makeApiCall('accounts/me', null, 'GET')
}

export async function makeApiCall<TRequest, TResponse>(url: string, data?: TRequest, method: HttpMethod = 'GET'): Promise<ApiResponse<TResponse>> {
  const res = await fetch(`${BASE_PATH}/${url}`, {
    method,
    body: data ? JSON.stringify(data) : undefined,
  })

  const body = await res.json()

  if (res.ok) {
    return {
      status: res.status,
      ok: true,
      data: body.data as TResponse,
    }
  }

  return {
    status: res.status,
    ok: false,
    error: {
      message: body.message ?? 'An unknown error has occurred',
    },
  }
}
