import { ZodError } from 'zod'

const REPLACE_REGEX = /^String\s+/i

export function formatZodError(error: ZodError): string {
  if (error.issues.length < 1) {
    return 'A validation error has occurred'
  }

  const firstIssue = error.issues[0]
  const fieldName = firstIssue.path[0] as string
  const formattedFieldName = formatSplitWords(fieldName)

  return firstIssue.message.replace(REPLACE_REGEX, `${formattedFieldName} `)
}

function formatSplitWords(value: string): string {
  const words: string[] = []
  let currentWord = ''

  let prevWasUpperCase = false

  for (let i = 0; i < value.length; i++) {
    let currentLetter = i > 0 ? value[i] : value[i].toUpperCase()
    
    const isUpperCase = currentLetter.toUpperCase() == currentLetter

    if (isUpperCase && !prevWasUpperCase) {
      // Push the existing word, start of a new word
      if (currentWord.length > 0) {
        words.push(currentWord)
      }
      currentWord = currentLetter.toUpperCase()
    } else {
      // Not uppercase, keep adding letters to current word
      currentWord += currentLetter
    }

    prevWasUpperCase = isUpperCase
  }

  // Add the final remaining word to the list
  if (currentWord.length > 0) {
    words.push(currentWord)
  }

  return words.join(' ')
}