import React from 'react'
import GuessListItem from '@/app/_components/GuessListItem'
import { type Guess } from '@/app/_components/GuessGame'

export default function GuessList(props: { guesses: Guess[] }) {
  return (
    <ul className="flex flex-col p-2 text-base">
      {props.guesses.map((guess) => (
        <GuessListItem key={guess.country} guess={guess} />
      ))}
    </ul>
  )
}
