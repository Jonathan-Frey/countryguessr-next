'use client'

import React, { useEffect, useRef, useState } from 'react'
import { checkAnswer } from '@/app/_actions/guesses'
import { type Guess } from '@/lib/types'

export default function CountryInput(props: {
  guesses: Guess[]
  setGuesses: (guesses: Guess[]) => void
  date: string
  category: string
  countryNames: string[]
}) {
  const [inputValue, setInputValue] = useState('')
  const [matches, setMatches] = useState<string[]>([])
  const countryInputRef = useRef<HTMLInputElement>(null)

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

      notGuessedMatches.sort((a, b) => {
        const indexA = a.toLowerCase().indexOf(inputValue.toLowerCase())
        const indexB = b.toLowerCase().indexOf(inputValue.toLowerCase())

        // If both matches start at the same index, prioritize shorter matches
        if (indexA === indexB) {
          return a.length - b.length
        }

        // Prioritize matches that start earlier in the string
        return indexA - indexB
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
    if (countryInputRef.current) {
      countryInputRef.current.focus()
    }
  }

  async function handleKeyDown(e: React.KeyboardEvent, match?: string) {
    if (match) {
      if (e.key === 'Enter') {
        await submitAnswer(match)
      }
    } else {
      if (e.key === 'Enter' && matches[0]) {
        await submitAnswer(matches[0])
      }
    }
  }

  async function handleMatchOnClick(countryName: string) {
    await submitAnswer(countryName)
  }

  return (
    <div className="relative">
      <input
        ref={countryInputRef}
        type="text"
        name="country-search"
        id="country-search"
        placeholder="Enter a Country Name"
        className={`w-full rounded-md border-2 border-tertiary bg-gray-50 px-2 py-1 text-lg ${inputValue.length > 0 && 'rounded-b-none'}`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      {matches.length > 0 ? (
        <ul className="absolute z-10 flex w-full flex-col divide-y-2 divide-tertiary overflow-hidden rounded-b-lg border-b-2 border-l-2 border-r-2 border-tertiary bg-white text-lg">
          {matches.map((match, index) => {
            if (index < 5) {
              return (
                <li
                  key={match}
                  className="px-2 py-1 hover:bg-secondary focus:bg-secondary"
                  onClick={() => handleMatchOnClick(match)}
                  onKeyDown={(e) => handleKeyDown(e, match)}
                  tabIndex={0}
                >
                  {match}
                </li>
              )
            }
          })}
        </ul>
      ) : inputValue.length > 0 ? (
        <div className="absolute z-10 flex w-full flex-col divide-y-2 divide-tertiary overflow-hidden rounded-lg rounded-t-none border-2 border-t-0 border-tertiary bg-white px-2 py-1 text-lg text-red-500">
          No Matches...
        </div>
      ) : null}
    </div>
  )
}
