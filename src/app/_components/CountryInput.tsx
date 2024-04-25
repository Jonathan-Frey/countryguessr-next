'use client'

import { api } from '@/trpc/react'
import { useEffect, useState } from 'react'
import { checkAnswer } from '@/app/actions/guesses'
export default function CountryInput() {
  const [inputValue, setInputValue] = useState('')
  const [countryNames, setCountryNames] = useState<string[]>([])
  const [matches, setMatches] = useState<string[]>([])

  const { data } = api.country.getAllNames.useQuery()

  useEffect(() => {
    if (data) {
      setCountryNames(data.map((country) => country.name))
    }
  }, [data])

  useEffect(() => {
    if (inputValue.length > 0) {
      setMatches(
        countryNames.filter((countryName) =>
          countryName.toLowerCase().includes(inputValue.toLowerCase()),
        ),
      )
    } else {
      setMatches([])
    }
  }, [inputValue, countryNames])

  async function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && matches[0]) {
      const result = await checkAnswer(matches[0])

      console.log(result)
    }
  }

  async function handleMatchOnClick(countryName: string) {
    const result = await checkAnswer(countryName)
    console.log(result)
  }
  return (
    <>
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
    </>
  )
}
