'use client'

import { useEffect, useState } from 'react'
import { checkAnswer } from '@/app/_actions/guesses'
import { type Guess } from '@/app/_components/GuessGame'

export default function CountryInput(props: {
  guesses: Guess[]
  setGuesses: (guesses: Guess[]) => void
  date: string
  category: string
  countryNames: string[]
}) {
  const [inputValue, setInputValue] = useState('')
  const [matches, setMatches] = useState<string[]>([])

  useEffect(() => {
    if (inputValue.length > 0) {
      const allMatches = props.countryNames.filter((countryName) =>
        countryName.toLowerCase().includes(inputValue.toLowerCase()),
      )

      const notGuessedMatches = allMatches.filter((match) => {
        let isNotGuessed = true
        props.guesses.forEach((guess) => {
          if (match.toLowerCase() === guess.country.toLowerCase()) {
            isNotGuessed = false
          }
        })
        return isNotGuessed
      })
      setMatches(notGuessedMatches)
    } else {
      setMatches([])
    }
  }, [inputValue, props.countryNames, props.guesses])

  async function submitAnswer(countryName: string) {
    setInputValue('')
    const response = await checkAnswer(countryName, props.category, props.date)
    response && props.setGuesses([...props.guesses, response])
  }

  async function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && matches[0]) {
      await submitAnswer(matches[0])
    }
  }

  async function handleMatchOnClick(countryName: string) {
    await submitAnswer(countryName)
  }

  return (
    <div className="relative">
      <input
        type="text"
        name="country-search"
        id="country-search"
        placeholder="Enter a Country Name"
        className="w-full rounded-md border-2 border-tertiary px-2 py-1 text-lg"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      {matches.length > 0 ? (
        <ul className="absolute flex w-full flex-col divide-y-2 divide-tertiary overflow-hidden rounded-b-lg border-b-2 border-l-2 border-r-2 border-tertiary bg-white">
          {matches.map((match, index) => {
            if (index < 10) {
              return (
                <li
                  key={match}
                  className="p-2 hover:bg-secondary"
                  onClick={() => handleMatchOnClick(match)}
                >
                  {match}
                </li>
              )
            }
          })}
        </ul>
      ) : inputValue.length > 0 ? (
        <div className="absolute flex w-full flex-col divide-y-2 divide-tertiary overflow-hidden rounded-lg border-2 border-tertiary bg-white p-2">
          No Matches...
        </div>
      ) : null}
    </div>
  )
}
