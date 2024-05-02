import GuessGame from '@/app/_components/GuessGame'
import { getGame } from '../actions/guesses'

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
  imageId: number
  category: string
  countryId: number
}

export type Hint = {
  id: number
  unlock: number
  content: string
  gameId: number | null
}

const gameData = await getGame('dish')

export default function Page() {
  return gameData ? (
    <GuessGame gameData={gameData} />
  ) : (
    <h1>No Game DAta Found</h1>
  )
}
