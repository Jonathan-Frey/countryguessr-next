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
    <main className="flex w-full max-w-screen-md grow flex-col items-center self-center p-4 text-2xl md:flex-row md:items-start md:gap-4">
      {gameState.gameOver ? (
        <div className="flex flex-col">
          <h2 className="mb-4 w-fit self-center font-semibold">
            {gameState.won
              ? `Congratulations, you guessed ${props.gameData.correctCountry.name} correctly in ${guesses.length} guesses!`
              : `Sorry, better luck next time! The correct country was ${props.gameData.correctCountry.name}`}
          </h2>
          <div className="flex flex-col gap-4 lg:flex-row">
            <Image
              src={props.gameData.image}
              width={512}
              height={512}
              alt="a food dish"
              className="self-start rounded-xl object-contain md:w-1/2"
            ></Image>
            <div className="flex flex-col lg:w-1/2">
              <h1 className="text-lg font-semibold">
                {props.gameData.product}
              </h1>
              <p className="py-4 text-base">
                {props.gameData.ProductInformation}
              </p>
              <h4 className="text-base font-semibold">Hints</h4>
              <ul className="flex flex-col gap-4">
                {props.gameData.hints.map((hint) => (
                  <li key={hint.content}>
                    <p className="text-base">{hint.content}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex w-full flex-col sm:px-32 md:w-1/2 md:px-0">
            <div className="flex justify-end">
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
          <div className="mt-2 w-full sm:px-32 md:mt-8 md:w-1/2 md:px-0">
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
