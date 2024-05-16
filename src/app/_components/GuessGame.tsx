'use client'

import CountryInput from '@/app/_components/CountryInput'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import GuessList from '@/app/_components/GuessList'
import HintList from '@/app/_components/HintList'
import { type GameData } from '@/lib/types'
import { useGuesses, useIncrementFlag } from '@/lib/hooks'
import { incrementTimesPlayed } from '@/app/_actions/guesses'
import EndOfGame from './EndOfGame'

export default function GuessGame(props: {
  gameData: GameData
  countryNames: string[]
}) {
  const [guesses, setGuesses] = useGuesses(props.gameData.id)
  const [incrementFlag, setIncrementFlag] = useIncrementFlag(props.gameData.id)
  const [gameState, setGameState] = useState({ gameOver: false, won: false })

  const [guessesLeft, setGuessesLeft] = useState(6)

  useEffect(() => {
    setGuessesLeft(6 - guesses.length)
  }, [guesses.length])

  useEffect(() => {
    let hasCorrectGuess = false
    guesses.forEach((guess) => {
      guess.correct && (hasCorrectGuess = true)
    })
    hasCorrectGuess
      ? setGameState({ gameOver: true, won: true })
      : guesses.length > 5 &&
        setGameState((prevState) => ({ ...prevState, gameOver: true }))
  }, [guesses, gameState.gameOver, props.gameData.id])

  useEffect(() => {
    async function incrementHandler() {
      if (incrementFlag === false && gameState.gameOver) {
        await incrementTimesPlayed(props.gameData.id)
        setIncrementFlag(true)
      }
    }

    void incrementHandler()
  }, [gameState.gameOver, incrementFlag, setIncrementFlag, props.gameData.id])

  return (
    <main className="flex w-full max-w-screen-md grow flex-col items-center self-center px-4 text-2xl">
      <h2 className="text-sm">Played {props.gameData.timesPlayed} times!</h2>
      {gameState.gameOver ? (
        <EndOfGame
          gameState={gameState}
          gameData={props.gameData}
          guesses={guesses}
        />
      ) : (
        <div className="flex w-full flex-col md:flex-row md:items-start md:gap-4">
          <div className="flex w-full flex-col sm:px-16 md:w-1/2 md:px-0">
            <div className="flex items-end justify-between">
              <h4 className="text-lg">Guesses left: {guessesLeft}</h4>
              <HintList guesses={guesses} hints={props.gameData.hints} />
            </div>
            <Image
              src={props.gameData.image}
              alt="A food dish"
              height={512}
              width={512}
              className="sm w-full rounded-xl"
            ></Image>
          </div>
          <div className="mt-2 w-full sm:px-16 md:mt-8 md:w-1/2 md:px-0">
            <CountryInput
              guesses={guesses}
              setGuesses={setGuesses}
              date={props.gameData.date}
              category={props.gameData.category}
              countryNames={props.countryNames}
            />
            <GuessList guesses={guesses} />
          </div>
        </div>
      )}
    </main>
  )
}
