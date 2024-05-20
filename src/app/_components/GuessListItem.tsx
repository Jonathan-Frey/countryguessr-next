import React from 'react'
import Image from 'next/image'
import { type Guess } from '@/lib/types'

export default function GuessListItem(props: { guess: Guess }) {
  return (
    <li className="flex border-b border-tertiary p-1">
      <h3 className="w-2/3">{props.guess.country}</h3>
      <p className="w-1/3">
        {props.guess.isBordering ? 'Bordering!' : props.guess.distance}
      </p>
      <Image
        src="/north-arrow.svg"
        alt="arrow pointing north"
        height={20}
        width={20}
        style={{ transform: `rotate(${props.guess.bearing}deg)` }}
      ></Image>
    </li>
  )
}
