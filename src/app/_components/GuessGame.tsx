'use client'

import Image from 'next/image'
import CountryInput from '@/app/_components/CountryInput'
import { useEffect, useState, type ReactNode } from 'react'
import GuessList from '@/app/_components/GuessList'
export interface Guess {
  country: string
  distance: string
  bearing: number
  correct: boolean
  flag: string
}

function setLocalGuesses(guesses: Guess[]) {
  localStorage.setItem('guesses', JSON.stringify(guesses))
}

function isValidGuess(obj: unknown): obj is Guess {
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

function getLocalGuesses(): Guess[] | null {
  if (typeof window === 'undefined') {
    // We're in a Node.js environment, so return null
    return null
  }

  const localGuessesAsJSON = localStorage.getItem('guesses')
  if (localGuessesAsJSON && localGuessesAsJSON.length > 0) {
    try {
      const potentialGuesses = JSON.parse(localGuessesAsJSON) as unknown
      if (
        Array.isArray(potentialGuesses) &&
        potentialGuesses.every(isValidGuess)
      ) {
        return potentialGuesses
      }
    } catch (error) {
      console.error("Failed to parse 'guesses' from localStorage:", error)
    }
  }
  return null
}

function useGuesses(): [Guess[], (guesses: Guess[]) => void] {
  const localGuesses = getLocalGuesses()
  const [guesses, setLiveGuesses] = useState<Guess[]>(
    localGuesses ? localGuesses : [],
  )
  function setGuesses(guesses: Guess[]) {
    setLiveGuesses(guesses)
    setLocalGuesses(guesses)
  }
  return [guesses, setGuesses]
}

export default function GuessGame(props: { children?: ReactNode }) {
  const [guesses, setGuesses] = useGuesses()
  const [gameState, setGameState] = useState({ gameOver: false, won: false })

  useEffect(() => {
    let hasCorrectGuess = false
    guesses.forEach((guess) => {
      guess.correct && (hasCorrectGuess = true)
    })
    hasCorrectGuess
      ? setGameState({ gameOver: true, won: true })
      : guesses.length > 5 &&
        setGameState((prevState) => ({ ...prevState, gameOver: true }))
  }, [guesses])

  return (
    <main className="flex w-full max-w-screen-2xl grow flex-col items-center self-center p-4 text-2xl lg:flex-row lg:items-start lg:gap-4 lg:px-36">
      {gameState.gameOver ? (
        <div>
          <h1 className="text-xl">Game over</h1>
          <p>
            {gameState.won
              ? 'Congratulations, you guessed the correct country!'
              : 'Sorry, you did not guess the correct country in six tries. Better luck tomorrow!'}
          </p>
        </div>
      ) : (
        <>
          <div className="flex w-full flex-col lg:w-1/2">
            <div className="flex justify-end">
              <ul className="flex">
                <li className="flex h-full items-center p-1">
                  <button
                    type="button"
                    className="h-6 w-6 rounded-full border-2 border-tertiary hover:bg-secondary"
                  ></button>
                </li>
                <li className="flex h-full items-center p-1">
                  <button
                    type="button"
                    className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-tertiary hover:bg-secondary"
                  >
                    <Image
                      src="/lock.svg"
                      alt="locked lock"
                      height={16}
                      width={16}
                    ></Image>
                  </button>
                </li>
                <li className="flex h-full items-center p-1">
                  <button
                    type="button"
                    className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-tertiary hover:bg-secondary"
                  >
                    <Image
                      src="/lock.svg"
                      alt="locked lock"
                      height={16}
                      width={16}
                    ></Image>
                  </button>
                </li>
              </ul>
            </div>
            {props.children}
          </div>
          <div className="mt-2 w-full lg:mt-8 lg:w-1/2">
            <CountryInput guesses={guesses} setGuesses={setGuesses} />
            <GuessList guesses={guesses} />
          </div>
        </>
      )}
    </main>
  )
}
