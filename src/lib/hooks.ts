import { useState } from 'react'
import { getLocalGameData, setLocalGuesses } from '@/lib/helpers'
import { type Guess } from './types'

export function useGuesses(
  date: string,
  category: string,
): [Guess[], (guesses: Guess[]) => void] {
  const localGameData = getLocalGameData(date, category)
  const localGuesses = localGameData?.guesses
  const [guesses, setLiveGuesses] = useState<Guess[]>(
    localGuesses ? localGuesses : [],
  )
  function setGuesses(guesses: Guess[]) {
    setLiveGuesses(guesses)
    setLocalGuesses(guesses, date, category)
  }
  return [guesses, setGuesses]
}
