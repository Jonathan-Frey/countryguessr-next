import { useState } from 'react'
import {
  getLocalGameData,
  getLocalIncrementFlag,
  setLocalGameData,
  setLocalIncrementFlag,
} from '@/lib/helpers'
import { type Guess } from './types'

export function useGuesses(
  gameId: number,
): [Guess[], (guesses: Guess[]) => void] {
  const localGameData = getLocalGameData(gameId)
  const localGuesses = localGameData?.guesses
  const [guesses, setLiveGuesses] = useState<Guess[]>(
    localGuesses ? localGuesses : [],
  )
  function setGuesses(guesses: Guess[]) {
    setLiveGuesses(guesses)
    setLocalGameData(gameId, guesses)
  }
  return [guesses, setGuesses]
}

export function useIncrementFlag(
  gameId: number,
): [boolean, (value: boolean) => void] {
  const localIncrementFlag = getLocalIncrementFlag(gameId)
  const [incrementFlag, setLiveIncrementFlag] = useState<boolean>(
    localIncrementFlag ? localIncrementFlag : false,
  )

  function setIncrementFlag(value: boolean) {
    setLiveIncrementFlag(value)
    setLocalIncrementFlag(gameId, value)
  }
  return [incrementFlag, setIncrementFlag]
}
