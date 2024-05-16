import { type Guess, type LocalGameData } from '@/lib/types'

export const getErrorMessage = (error: unknown): string => {
  let message: string
  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message)
  } else if (typeof error === 'string') {
    message = error
  } else {
    message = 'Something went wrong'
  }

  return message
}

export const isErrorWithCode = (
  err: unknown,
): err is Error & { code: unknown } => {
  return err instanceof Error && 'code' in err
}

export function isValidGuess(obj: unknown): obj is Guess {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'country' in obj &&
    typeof (obj as Guess).country === 'string' &&
    'distance' in obj &&
    typeof (obj as Guess).distance === 'string' &&
    'bearing' in obj &&
    typeof (obj as Guess).bearing === 'number' &&
    'correct' in obj &&
    typeof (obj as Guess).correct === 'boolean' &&
    'flag' in obj &&
    typeof (obj as Guess).flag === 'string'
  )
}

export function isValidLocalGameData(obj: unknown): obj is LocalGameData {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'gameId' in obj &&
    typeof obj.gameId === 'number' &&
    'guesses' in obj &&
    Array.isArray(obj.guesses) &&
    obj.guesses.every(isValidGuess)
  )
}
