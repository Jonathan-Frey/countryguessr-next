import React from 'react'
import Image from 'next/image'
import { type Guess } from '@/lib/types'

export default function GuessListItem(props: { guess: Guess }) {
  return (
    <li className="flex border-b border-tertiary py-1">
      <h3 className="w-1/2">{props.guess.country}</h3>
      <p className="w-1/2">{props.guess.distance}</p>
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
