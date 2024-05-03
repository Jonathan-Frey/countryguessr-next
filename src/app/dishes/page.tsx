import GuessGame from '@/app/_components/GuessGame'
import { getGame } from '@/app/_actions/guesses'

export type GameData = {
  hints: {
    id: number
    unlock: number
    content: string
    gameId: number | null
  }[]
} & {
  id: number
  date: string
  image: string
  category: string
  countryId: number
}

export type Hint = {
  id: number
  unlock: number
  content: string
  gameId: number | null
}

export default async function Page() {
  const gameData = await getGame('dish')
  return gameData ? (
    <>
      <GuessGame gameData={gameData} />
    </>
  ) : (
    <h1>No Game Data Found</h1>
  )
}
