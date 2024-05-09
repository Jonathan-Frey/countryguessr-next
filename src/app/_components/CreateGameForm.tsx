'use client'

import { createGame } from '@/app/_actions/admin'
import { gameSchema, type GameFormData } from '@/lib/types'
import { type Dispatch, type SetStateAction, useState } from 'react'
import toast from 'react-hot-toast'

async function clientAction(
  formData: FormData,
  setLoading: Dispatch<SetStateAction<boolean>>,
) {
  setLoading(true)
  const gameData: Partial<GameFormData> = Object.fromEntries(formData)
  gameData.hints = []

  for (let i = 0; ; i++) {
    const contentKey = `hints[${i}].content`
    const unlockKey = `hints[${i}].unlock`

    if (
      !gameData.hasOwnProperty(contentKey) ||
      !gameData.hasOwnProperty(unlockKey)
    ) {
      break
    }

    const hint = {
      content: gameData[contentKey] as string,
      unlock: Number(gameData[unlockKey]),
    }

    gameData.hints.push(hint)
  }
  const result = gameSchema.safeParse(gameData)
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      toast.error(issue.message)
    })
    setLoading(false)
    return
  }
  const response = await createGame(formData)
  if (response.success && response.message) {
    toast.success(response.message)
  } else if (response.error) {
    toast.error(response.error)
  } else {
    toast.error('Something went really wrong')
  }
  setLoading(false)
}

export default function CreateGameForm(props: {
  countries: { id: number; name: string }[]
}) {
  const [hintFields, setHintFields] = useState(1)
  const [loading, setLoading] = useState(false)

  return (
    <>
      <h2>Create a Game</h2>
      <form
        action={(e) => clientAction(e, setLoading)}
        className="flex w-full flex-col"
      >
        <input type="date" name="date" id="date" className="m-2" />
        <input
          type="file"
          name="imageFile"
          id="imageFile"
          accept="image/png, image/jpeg"
          className="m-2"
        />
        <div className="mx-2 flex gap-4">
          <h3>Hints</h3>
          <button
            type="button"
            onClick={() => {
              setHintFields(hintFields + 1)
            }}
          >
            +
          </button>
          <button
            type="button"
            onClick={() => {
              hintFields >= 0 && setHintFields(hintFields - 1)
            }}
          >
            -
          </button>
        </div>
        {Array.from({ length: hintFields }).map((_, i) => (
          <div
            key={`hints[${i}]`}
            className="flex flex-col rounded-md border-2 border-tertiary p-2"
          >
            <h4 className="font-bold">Hint {i + 1}</h4>
            <label htmlFor={`hints[${i}].content`}>Content</label>
            <input
              type="text"
              name={`hints[${i}].content`}
              id={`hints[${i}].content`}
            />
            <label htmlFor={`hints[${i}].unlock`}>Guesses to Unlock</label>
            <input
              type="number"
              name={`hints[${i}].unlock`}
              id={`hints[${i}].unlock`}
              className="w-min"
              defaultValue={0}
            />
          </div>
        ))}

        <select name="category" className="m-2">
          <option value="dish">Dish</option>
          <option value="dance">Dance</option>
        </select>

        <label htmlFor="product" className="mx-2">
          Product
        </label>
        <input type="text" id="product" name="product" className="mx-2 mb-2" />

        <select name="countryName" className="m-2">
          {props.countries.map((country) => (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-min rounded-md bg-red-400 p-2 hover:bg-red-500 disabled:bg-red-200"
          disabled={loading}
        >
          Submit
        </button>
      </form>
    </>
  )
}
