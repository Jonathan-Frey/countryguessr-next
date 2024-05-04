'use client'

import { deleteGame } from '@/app/_actions/admin'
import { type Dispatch, type SetStateAction, useState } from 'react'
import toast from 'react-hot-toast'
async function clientAction(
  gameId: number,
  setLoading: Dispatch<SetStateAction<boolean>>,
) {
  setLoading(true)
  const response = await deleteGame(gameId)
  setLoading(false)
  if (response.success && response.message) {
    toast.success(response.message)
  } else if (response.error) {
    toast.error(response.error)
  } else toast.error('Something went really wrong')
}

export default function DeleteGameButton(props: { gameId: number }) {
  const [loading, setLoading] = useState(false)

  return (
    <button
      type="button"
      onClick={async () => await clientAction(props.gameId, setLoading)}
      className=" rounded-md bg-red-400 p-2 hover:bg-red-500 disabled:bg-red-200"
      disabled={loading}
    >
      Delete
    </button>
  )
}
