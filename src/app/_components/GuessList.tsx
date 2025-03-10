import GuessListItem from '@/app/_components/GuessListItem'
import { type Guess } from '@/lib/types'
import { useEffect, useState } from 'react'

export default function GuessList(props: { guesses: Guess[] }) {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <ul className="flex flex-col p-2 pt-1 text-base">
      {isClient
        ? props.guesses.map((guess) => (
            <GuessListItem key={guess.country} guess={guess} />
          ))
        : null}
    </ul>
  )
}
