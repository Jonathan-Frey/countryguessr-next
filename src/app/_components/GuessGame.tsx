'use client'

import CountryInput from '@/app/_components/CountryInput'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import GuessList from '@/app/_components/GuessList'
import HintList from '@/app/_components/HintList'
import { type GameData } from '@/app/dishes/page'
export type Guess = {
  country: string
  distance: string
  bearing: number
  correct: boolean
  flag: string
}

type LocalGameData = {
  date: string
  category: string
  guesses: Guess[]
}

function setLocalGuesses(guesses: Guess[], date: string, category: string) {
  let allLocalGameData = getAllLocalGameData()
  let foundMatch = false
  !allLocalGameData && (allLocalGameData = [])
  const updatedGameData = allLocalGameData.map((data) => {
    if (data.date === date && data.category === category) {
      data.guesses = guesses
      foundMatch = true
    }
    return data
  })
  !foundMatch && updatedGameData.push({ date, category, guesses })
  localStorage.setItem('countryguessr-guesses', JSON.stringify(updatedGameData))
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

function isValidLocalGameData(obj: unknown): obj is LocalGameData {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'date' in obj &&
    typeof obj.date === 'string' &&
    'category' in obj &&
    typeof obj.category === 'string' &&
    'guesses' in obj &&
    Array.isArray(obj.guesses) &&
    obj.guesses.every(isValidGuess)
  )
}

function getAllLocalGameData() {
  if (typeof window === 'undefined') {
    // We're in a Node.js environment, so return null
    return null
  }

  const localGuessDataAsJSON = localStorage.getItem('countryguessr-guesses')
  if (localGuessDataAsJSON && localGuessDataAsJSON.length > 0) {
    try {
      const allLocalGameData = JSON.parse(localGuessDataAsJSON) as unknown
      if (
        Array.isArray(allLocalGameData) &&
        allLocalGameData.every(isValidLocalGameData)
      ) {
        return allLocalGameData
      }
    } catch (error) {
      console.error(
        "Failed to parse 'countryguessr-guesses' from localStorage:",
        error,
      )
      return null
    }
  }
  return null
}

function getLocalGameData(
  date: string,
  category: string,
): LocalGameData | null {
  const allLocalGameData = getAllLocalGameData()
  const localGameData = allLocalGameData
    ? allLocalGameData.find(
        (LocalGameData) =>
          LocalGameData.category === category && LocalGameData.date === date,
      )
    : null
  return localGameData ? localGameData : null
}

function useGuesses(
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

export default function GuessGame(props: {
  gameData: GameData
  countryNames: string[]
}) {
  const [guesses, setGuesses] = useGuesses(
    props.gameData.date,
    props.gameData.category,
  )
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
              <HintList guesses={guesses} hints={props.gameData.hints} />
            </div>
            <Image
              src={props.gameData.image}
              alt="A food dish"
              height={512}
              width={512}
              className="w-full rounded-xl"
            ></Image>
          </div>
          <div className="mt-2 w-full lg:mt-8 lg:w-1/2">
            <CountryInput
              guesses={guesses}
              setGuesses={setGuesses}
              date={props.gameData.date}
              category={props.gameData.category}
              countryNames={props.countryNames}
            />
            <GuessList guesses={guesses} />
          </div>
        </>
      )}
    </main>
  )
}
