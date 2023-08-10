import { sign, verify } from 'jsonwebtoken'
import { UserToken } from '@/types'

export function signAsync(user: UserToken, privateKey: string): Promise<string> {
  return new Promise((resolve, reject) => {
    sign(user, privateKey, (err, token) => {
      if (err) {
        return reject(err)
      }
      resolve(token as string)
    })
  })
}

export function verifyAsync(token: string, privateKey: string): Promise<UserToken> {
  return new Promise((resolve, reject) => {
    verify(token, privateKey, (err, payload) => {
      if (err) {
        return reject(err)
      }
      resolve(payload as UserToken)
    })
  })
}