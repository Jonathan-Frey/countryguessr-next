'use client'

import CountryInput from '@/app/_components/CountryInput'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import GuessList from '@/app/_components/GuessList'
import HintList from '@/app/_components/HintList'
import { type GameData } from '@/lib/types'
import { useGuesses } from '@/lib/hooks'

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
          <h2></h2>
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
