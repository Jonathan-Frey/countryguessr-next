'use client'

import Image from 'next/image'
import CountryInput from '@/app/_components/CountryInput'
import { useState, type ReactNode } from 'react'
import GuessList from '@/app/_components/GuessList'

export interface Guess {
  country: string
  distance: string
  bearing: number
  correct: boolean
  flag: string
}

export default function GuessGame(props: { children?: ReactNode }) {
  const [guesses, setGuesses] = useState<Guess[]>([])
  return (
    <main className="flex w-full max-w-screen-2xl grow flex-col items-center self-center p-4 text-2xl lg:flex-row lg:items-start lg:gap-4 lg:px-36">
      <div className="flex w-full flex-col lg:w-1/2">
        <ul className="flex self-end">
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
        {props.children}
      </div>
      <div className="mt-2 w-full lg:mt-8 lg:w-1/2">
        <CountryInput guesses={guesses} setGuesses={setGuesses} />
        <GuessList guesses={guesses} />
      </div>
    </main>
  )
}
