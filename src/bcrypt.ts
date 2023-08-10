import { compare, hash } from 'bcryptjs'

const SALT_ROUNDS = 12

export function hashPasswordAsync(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    hash(password, SALT_ROUNDS, (err, hash) => {
      if (err) {
        return reject(err)
      }
      resolve(hash)
    })
  })
}

export function comparePasswordAsync(password: string, expectedHash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    compare(password, expectedHash, (err, result) => {
      if (err) {
        return reject(err)
      }
      resolve(result)
    })
  })
}
