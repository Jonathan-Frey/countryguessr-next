'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { type Guess } from '@/app/_components/GuessGame'

export default function HintItem(props: {
  data: { id: number; unlock: number; content: string }
  guesses: Guess[]
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [active, setActive] = useState(false)
  useEffect(() => {
    props.guesses.length >= props.data.unlock && setUnlocked(true)
  }, [props.guesses.length, props.data.unlock])
  return (
    <li className="relative flex h-full items-center p-1">
      <button
        type="button"
        className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-tertiary hover:bg-secondary"
        onMouseEnter={() => {
          setIsHovered(true)
        }}
        onMouseLeave={() => {
          setIsHovered(false)
        }}
        onClick={() => {
          unlocked && setActive(true)
        }}
      >
        {!unlocked && (
          <Image
            src="/lock.svg"
            alt="locked lock"
            height={16}
            width={16}
          ></Image>
        )}
      </button>
      {!unlocked && isHovered && (
        <span className="absolute right-8 top-0 w-max rounded-lg border-2 border-tertiary bg-primary p-2 text-sm">
          Available in {props.data.unlock - props.guesses.length} guesses
        </span>
      )}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setActive(false)
            }
          }}
        >
          <div className="sm: flex w-10/12 flex-col rounded-lg bg-tertiary text-base shadow-2xl sm:w-3/5 sm:text-xl">
            <button
              className="h-8 w-8 self-end hover:text-primary"
              onClick={() => {
                setActive(false)
              }}
            >
              ✖
            </button>
            <p className="px-4 pb-4">{props.data.content}</p>
          </div>
        </div>
      )}
    </li>
  )
}
